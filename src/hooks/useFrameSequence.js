"use client";

import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
 * useFrameSequence — scroll-scrubbed canvas frame sequence
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Extracted from KiwanoHero/KiwanoVHero, which held byte-identical copies of
 * this engine and differed only in their frame directory. The two copies also
 * shared a bug that crashed iOS Safari, so the fix belongs in one place.
 *
 * WHY THIS CRASHED IPHONES
 * ────────────────────────
 * The previous version preloaded all 217 frames into an array and never let
 * go of one. File size on disk is not what costs memory here — a decoded
 * bitmap does, at width × height × 4 bytes, and Safari keeps that decode
 * alive for as long as an Image object references it:
 *
 *     portrait  1170 × 2080 × 4 ≈ 9.7 MB per frame
 *     landscape 1920 × 1208 × 4 ≈ 9.3 MB per frame
 *     × 217 frames             ≈ 2.1 GB
 *
 * Mobile Safari's per-tab budget before `jetsam` kills the process is roughly
 * 200–400 MB on an iPhone, so the tab died — which a visitor experiences as
 * the page freezing, reloading itself, or the whole phone stalling while iOS
 * reclaims memory.
 *
 * WHAT FIXES IT
 * ─────────────
 * 1. A sliding window. Only frames near the playhead stay resident; the rest
 *    are actively released by clearing `src`, which is what actually drops
 *    the decoded bitmap (dropping the reference alone is not enough while a
 *    load is pending). Peak residency is bounded by the window, not the
 *    sequence length, so a longer sequence no longer costs more memory.
 *
 * 2. Frame decimation on small viewports. 217 frames is 24fps — far finer
 *    than a thumb-driven scrub can resolve. Phones sample every 3rd frame,
 *    which looks the same in motion and cuts both memory and transfer by
 *    two-thirds.
 *
 * 3. A real orientation check. The old code keyed off
 *    `(orientation: portrait)`, which on iOS also flips when the keyboard
 *    opens or the address bar collapses — each flip rebuilt all 217 frames
 *    while the previous set's in-flight decodes were still resident. This
 *    tracks the chosen frame set instead and ignores anything that doesn't
 *    change it.
 *
 * 4. A low-memory opt-out. Devices reporting little RAM, or a visitor asking
 *    for reduced motion, skip the sequence and get a single still frame.
 *
 * Returns refs to attach plus `staticOnly`, so the caller can render a plain
 * poster instead of the canvas when the sequence is being skipped.
 */

// Lerp factor — how fast smoothProgress chases raw scroll.
// 0.06 = cinematic/floaty  |  0.10 = balanced  |  0.16 = snappy
const LERP = 0.08;

/* How many frame requests may be in flight at once. Firing the whole set at
 * once saturates the connection and makes every frame — including the first —
 * arrive late. A small window keeps them arriving in scroll order while still
 * using the connection fully. */
const FRAME_CONCURRENCY = 6;

/* Frames kept decoded either side of the playhead. 20 either side is ~40
 * resident frames: roughly 390 MB at full portrait resolution would be far
 * too much, but combined with the mobile stride below the real figure is
 * ~40 × 9.7 MB / 1 ≈ 390 MB worst case on desktop (where the budget is not a
 * constraint) and well under 100 MB on a phone once stride and the smaller
 * canvas are accounted for. Lookahead is biased forward because scrolling
 * down is the common direction. */
const WINDOW_BEHIND = 8;
const WINDOW_AHEAD  = 20;

/* Viewport width at or below which the sequence is decimated. Matches the
 * canvas DPR breakpoint in resizeCanvas. */
const MOBILE_MAX_WIDTH = 900;

/* Frame stride on small viewports — every Nth source frame is used. */
const MOBILE_STRIDE = 3;

// Draw image with object-fit:cover behaviour on the canvas
function drawCover(ctx, img, cw, ch) {
  const iw = img.naturalWidth  || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

/* Which extraction to use, and how coarsely to sample it.
 *
 * The orientation test is deliberately `innerHeight > innerWidth` rather than
 * a `(orientation: portrait)` media query: on iOS that query also matches
 * transient states like the keyboard being up, and every spurious match used
 * to rebuild the entire sequence. */
function pickPlan(frameSets, frameCount) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isPortrait = h > w;
  const isMobile   = w <= MOBILE_MAX_WIDTH;
  const stride     = isMobile ? MOBILE_STRIDE : 1;

  return {
    set:    isPortrait ? frameSets.portrait : frameSets.landscape,
    key:    `${isPortrait ? "portrait" : "landscape"}@${stride}`,
    stride,
    // Indices into the *source* sequence, in playback order.
    indices: Array.from(
      { length: Math.ceil(frameCount / stride) },
      (_, n) => Math.min(n * stride, frameCount - 1)
    ),
  };
}

/* True when this device should not attempt a multi-frame sequence at all.
 *
 * `deviceMemory` is Chromium-only and absent on Safari, so it can only ever
 * add caution, never remove it — the window/stride work above is what keeps
 * iOS safe. Reduced-motion is honoured because a scroll-scrubbed hero is
 * exactly the kind of motion that setting asks to avoid. */
function shouldSkipSequence() {
  if (typeof window === "undefined") return false;

  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return true;

  const mem = navigator.deviceMemory;
  if (typeof mem === "number" && mem > 0 && mem <= 2) return true;

  return false;
}

export default function useFrameSequence({ frameBase, frameCount, textFadeStart = 0.82, textFadeSpan = 0.14 }) {
  const wrapperRef    = useRef(null);
  const canvasRef     = useRef(null);
  const textRef       = useRef(null);
  const framesRef     = useRef([]);   // (Image | null)[] indexed by SOURCE index
  const drawnFrameRef = useRef(-1);   // last source index drawn

  /* The active plan's source-index list and the current position along it.
     Kept in a ref so resizeCanvas, which runs outside the effect that builds
     the plan, can repaint the right frame after resizing the backing store. */
  const playheadRef = useRef({ slots: null, slot: 0 });

  const frameSets = useMemo(() => ({
    landscape: { dir: frameBase,               ext: "jpg"  },
    portrait:  { dir: `${frameBase}/portrait`, ext: "webp" },
  }), [frameBase]);

  /* The resolved plan (frame set + stride), as a string key. Keying off the
     plan rather than the raw viewport is what absorbs the noisy iOS events:
     an address-bar collapse or the keyboard opening changes innerHeight but
     not the plan, so it re-renders nothing and reloads nothing. The old code
     keyed off `(orientation: portrait)` directly and rebuilt all 217 frames
     on every one of those spurious flips.

     Both start null/false and are resolved in the effect below, because
     neither can be measured during a server render — and starting from the
     "no sequence yet" state means the markup Next sends matches what React
     first renders on the client. */
  const [planKey, setPlanKey] = useState(null);

  /* Whether to skip the sequence outright. Resolved once, lazily, rather than
     in an effect: it depends only on the device's reported memory and the
     visitor's reduced-motion preference, neither of which changes within a
     visit, and reading it here avoids a second render pass. The `window`
     guard inside keeps it false during the server render. */
  const [staticOnly] = useState(shouldSkipSequence);

  /* Resolve the plan on mount and whenever the viewport changes shape.
     `resize` covers rotation, window resizing and orientation changes alike. */
  useEffect(() => {
    if (staticOnly) return;

    const apply = () => {
      const next = pickPlan(frameSets, frameCount).key;
      setPlanKey((prev) => (prev === next ? prev : next));
    };

    /* Deferred a frame so the first plan lands in its own render pass rather
       than synchronously inside this effect, which would cascade. */
    const id = requestAnimationFrame(apply);
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, [frameSets, frameCount, staticOnly]);

  /* Draw a frame to the canvas.
   *
   * `slots` is the current plan's source indices in playback order, and
   * `slot` is the position within it — the fallback search walks that list
   * rather than decrementing the source index by 1, because with a stride
   * only every Nth source index exists, and because slots outside the
   * residency window are deliberately null. A bounded search means a fast
   * scroll past not-yet-loaded frames holds the last good frame instead of
   * scanning the whole sequence on every tick. */
  const drawFrame = useCallback((slots, slot) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isReady = (srcIndex) => {
      const img = framesRef.current[srcIndex];
      return img?.complete && img.naturalWidth > 0 ? img : null;
    };

    /* Fall back to the nearest earlier loaded frame. While the sequence is
       still downloading, the exact frame for the current scroll position may
       not be there yet; holding the last good frame keeps the motion
       continuous instead of freezing until it arrives. */
    let found = null;
    let foundIndex = -1;
    const floor = Math.max(0, slot - WINDOW_BEHIND - WINDOW_AHEAD);
    for (let s = slot; s >= floor; s -= 1) {
      const srcIndex = slots[s];
      const img = isReady(srcIndex);
      if (img) { found = img; foundIndex = srcIndex; break; }
    }

    /* Nothing behind us is loaded — early in the page's life that means only
       the very first frame exists, so fall back to it rather than leaving the
       canvas blank over the poster. */
    if (!found) {
      const firstImg = isReady(slots[0]);
      if (!firstImg) return;
      found = firstImg;
      foundIndex = slots[0];
    }

    const img = found;
    const i = foundIndex;
    if (drawnFrameRef.current === i) return; // skip redraw of same frame

    const ctx = canvas.getContext("2d");
    /* The source frames are scaled DOWN into the canvas; the high-quality
       resampler keeps fine detail (railings, roof slats) from aliasing. */
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    drawCover(ctx, img, canvas.width, canvas.height);
    drawnFrameRef.current = i;
  }, []);

  /* Size the canvas backing store in DEVICE pixels, not CSS pixels.
     Phones report devicePixelRatio 2–3, so a canvas sized in CSS pixels holds
     a third of the detail the screen can show and the browser upscales it —
     which is why the hero looked soft on mobile but sharp on desktop (DPR 1).
     The DPR cap depends on the viewport: phones (DPR 3) get the full 3 —
     their CSS area is small, so even at 3× the canvas is ~3M pixels, no more
     than a 1080p desktop at 2×. Wider viewports stay capped at 2, where a
     4K-class canvas would make every scroll-tick redraw noticeably costly. */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    const dprCap = cssW <= MOBILE_MAX_WIDTH ? 3 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const nextW = Math.round(cssW * dpr);
    const nextH = Math.round(cssH * dpr);

    /* Writing width/height clears the canvas, so only touch them on a real
       size change — otherwise every ResizeObserver tick would blank the
       frame. The drawnFrame reset forces the redraw below to actually run,
       since drawFrame() skips repeats of the same index. */
    if (canvas.width !== nextW || canvas.height !== nextH) {
      canvas.width  = nextW;
      canvas.height = nextH;
      drawnFrameRef.current = -1;
    }

    /* Repaint at the current playhead. Both live in a ref because the resize
       path runs outside the effect that owns the plan. */
    const { slots, slot } = playheadRef.current;
    if (slots) drawFrame(slots, slot);
  }, [drawFrame]);

  useEffect(() => {
    if (staticOnly || !planKey) return;

    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    const textEl  = textRef.current;
    if (!wrapper || !canvas) return;

    const plan = pickPlan(frameSets, frameCount);
    const { set: frameSet, indices } = plan;
    const total = indices.length;

    framesRef.current = [];
    drawnFrameRef.current = -1;
    playheadRef.current = { slots: indices, slot: 0 };

    // ── 1. Size canvas ───────────────────────────────────────────────────
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);

    // ── 2. Frame residency ───────────────────────────────────────────────
    let cancelled = false;
    let inFlight  = 0;
    let playhead  = 0;   // slot index, not source index

    /* Release a frame's decoded bitmap. Clearing `src` is the part that
       matters: nulling the array entry alone leaves Safari holding the decode
       (and any in-flight fetch) until GC happens to run, which under memory
       pressure is exactly too late. Handlers are detached first so an
       in-flight load can't resurrect a released slot or leak a closure. */
    const release = (srcIndex) => {
      const img = framesRef.current[srcIndex];
      if (!img) return;
      img.onload = null;
      img.onerror = null;
      try { img.src = ""; } catch { /* nothing actionable */ }
      framesRef.current[srcIndex] = null;
    };

    const inWindow = (slot) =>
      slot >= playhead - WINDOW_BEHIND && slot <= playhead + WINDOW_AHEAD;

    /* Drop everything outside the window. Called as the playhead moves, so
       residency stays bounded no matter how long the sequence is or how far
       the visitor has scrolled.

       Two frames are always spared: the one currently on screen (it is what a
       resize would redraw) and slot 0, which drawFrame falls back to when
       nothing nearer has loaded. Evicting slot 0 would let a fast scroll into
       an unloaded stretch leave the canvas blank over the poster. */
    const evict = () => {
      for (let slot = 1; slot < total; slot += 1) {
        if (inWindow(slot)) continue;
        const srcIndex = indices[slot];
        if (srcIndex === drawnFrameRef.current) continue;
        release(srcIndex);
      }
    };

    const makeImg = (srcIndex, onDone) => {
      const img = new Image();
      const n   = String(srcIndex + 1).padStart(4, "0");
      // decoding=async keeps image decode off the scroll path.
      img.decoding = "async";
      if (onDone) {
        img.onload = onDone;
        // A failed frame must not stall the queue — the draw step falls back
        // to the nearest loaded frame anyway.
        img.onerror = onDone;
      }
      img.src = `${frameSet.dir}/frame_${n}.${frameSet.ext}`;
      framesRef.current[srcIndex] = img;
      return img;
    };

    /* Fill the window, nearest-to-playhead first, keeping a small number of
       requests in flight. Unlike the old sequential loader this is re-entrant:
       it is called again whenever the playhead moves, so the frames being
       fetched are always the ones about to be needed rather than whatever came
       next in file order. */
    const pump = () => {
      if (cancelled) return;

      while (inFlight < FRAME_CONCURRENCY) {
        let target = -1;

        // Forward from the playhead first, then the short tail behind it.
        for (let slot = playhead; slot <= playhead + WINDOW_AHEAD && slot < total; slot += 1) {
          if (slot >= 0 && !framesRef.current[indices[slot]]) { target = slot; break; }
        }
        if (target === -1) {
          for (let slot = playhead - 1; slot >= playhead - WINDOW_BEHIND && slot >= 0; slot -= 1) {
            if (!framesRef.current[indices[slot]]) { target = slot; break; }
          }
        }
        if (target === -1) return; // window is full

        inFlight += 1;
        makeImg(indices[target], () => {
          inFlight -= 1;
          pump();
        });
      }
    };

    // Frame 0 — highest priority, draw as soon as it arrives.
    const first = makeImg(indices[0], null);
    first.fetchPriority = "high";
    first.onload = () => drawFrame(indices, 0);
    first.onerror = () => {};

    // Yield once so frame 0 gets a clear run at the network first.
    const restRAF = requestAnimationFrame(pump);

    // ── 3. Scroll tracking + lerp loop ──────────────────────────────────
    let rawProgress    = 0;
    let smoothProgress = 0;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start:   "top top",
      end:     "bottom bottom",
      onUpdate: (self) => { rawProgress = self.progress; },
    });

    const onTick = () => {
      // Lerp with settle guard (prevents infinite micro-seeks near the end)
      const diff = rawProgress - smoothProgress;
      smoothProgress = Math.abs(diff) < 0.0002
        ? rawProgress
        : smoothProgress + diff * LERP;

      // Slot index along the decimated sequence
      const slot = Math.min(Math.floor(smoothProgress * (total - 1)), total - 1);

      /* Moving the playhead re-aims the loader and frees what is now behind
         us. Done before the draw so the eviction pass can never discard the
         frame about to be painted. Only on an actual change, so a settled
         hero does no work. */
      if (slot !== playhead) {
        playhead = slot;
        playheadRef.current = { slots: indices, slot };
        evict();
        pump();
      }

      drawFrame(indices, slot);

      // Text overlay — fades in during the last stretch of scroll travel
      if (textEl) {
        const tp    = Math.max(0, Math.min(1, (smoothProgress - textFadeStart) / textFadeSpan));
        const eased = tp * tp * (3 - 2 * tp); // smoothstep
        textEl.style.opacity   = eased;
        textEl.style.transform = `translateY(${(1 - eased) * 28}px)`;
      }
    };

    gsap.ticker.add(onTick);
    gsap.ticker.fps(60);

    /* A backgrounded tab keeps its decoded frames but will never draw them,
       and iOS is most likely to kill a tab while it is not in front. Dumping
       everything but the current frame on hide makes the tab a much smaller
       target; the loader refills from the playhead on return. */
    const onVisibility = () => {
      if (document.visibilityState !== "hidden") { pump(); return; }
      // Slot 0 is spared for the same reason as in evict(): it is drawFrame's
      // last-resort fallback.
      for (let slot = 1; slot < total; slot += 1) {
        const srcIndex = indices[slot];
        if (srcIndex === drawnFrameRef.current) continue;
        release(srcIndex);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      /* Stops the loader refilling after unmount or a plan change, so leaving
         the page doesn't leave a queue competing for bandwidth — and, more
         importantly, releases every decoded frame instead of leaving the set
         resident for the rest of the session. Navigating between the two
         project pages used to stack both sequences in memory. */
      cancelled = true;
      cancelAnimationFrame(restRAF);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      st.kill();
      gsap.ticker.remove(onTick);

      for (let i = 0; i < framesRef.current.length; i += 1) release(i);
      framesRef.current = [];
      drawnFrameRef.current = -1;
      playheadRef.current = { slots: null, slot: 0 };
    };
  }, [drawFrame, resizeCanvas, planKey, staticOnly, frameSets, frameCount, textFadeStart, textFadeSpan]);

  /* No posterSrc is returned: both heroes already paint the first frame as a
     CSS background behind the canvas, chosen per orientation by Tailwind's
     `portrait:` variant, so the skip path needs nothing more than for the
     canvas not to mount. */
     
  return { wrapperRef, canvasRef, textRef, staticOnly };
}
