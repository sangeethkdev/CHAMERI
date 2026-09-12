'use client';

import { useCallback, useEffect, useId, useSyncExternalStore } from 'react';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * useExclusiveAudio — "only one thing makes noise at a time"
 * ─────────────────────────────────────────────────────────────────────────────
 * Every testimonial card owns its own <video> or YouTube embed, so without a
 * shared owner each one tracks its mute state privately and unmuting a second
 * card leaves the first one still playing — two voices at once.
 *
 * The owner is module-level rather than React context so it spans *every*
 * carousel on the page (the testimonial page stacks several), and so a card
 * deep inside one carousel does not need a provider above it.
 *
 * Only one id can hold audio at a time: claiming it releases whoever had it,
 * and every other subscriber re-renders muted.
 */

// id of the single card currently allowed to play sound, or null for silence.
let activeId = null;

const listeners = new Set();

function emit() {
  // Copied before iterating: a listener that unsubscribes during the loop
  // would otherwise mutate the set mid-iteration.
  for (const listener of [...listeners]) listener();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => activeId;

// The server renders with nothing playing; audio only ever starts from a
// click in the browser.
const getServerSnapshot = () => null;

/** Give audio to `id`, silencing whoever held it. */
export function claimAudio(id) {
  if (activeId === id) return;
  activeId = id;
  emit();
}

/** Release audio if `id` currently holds it; a no-op otherwise. */
export function releaseAudio(id) {
  if (activeId !== id) return;
  activeId = null;
  emit();
}

/**
 * Returns `[soundOn, toggle, release]` for one media element.
 *
 * `soundOn` is true only while this instance holds the page-wide audio slot,
 * so a card that loses it re-renders muted with no extra wiring.
 */
export default function useExclusiveAudio() {
  // useId gives each mounted card a stable identity, so remounts and repeated
  // items in a looped carousel never collide.
  const id = useId();
  /* useSyncExternalStore rather than useState+useEffect: it subscribes to the
     module-level owner without a setState-in-effect, and stays correct if the
     owner changes between render and commit. */
  const currentId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // An unmounting card must not keep the slot, or nothing else could take it.
  useEffect(() => () => releaseAudio(id), [id]);

  const soundOn = currentId === id;

  const toggle = useCallback(() => {
    if (activeId === id) releaseAudio(id);
    else claimAudio(id);
  }, [id]);

  const release = useCallback(() => releaseAudio(id), [id]);

  return [soundOn, toggle, release];
}
