import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';

/**
 * On-demand revalidation endpoint.
 *
 * The admin backend calls this after every successful content save, so an
 * edit goes live on the next page view instead of waiting out the 60s ISR
 * window. Requires the `REVALIDATE_SECRET` env var to match on both sides.
 *
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "paths": ["/", "/about"] }
 */

// Only these routes may be refreshed — an attacker with the secret still
// cannot make us re-render arbitrary paths.
const ALLOWED_PATHS = new Set([
  '/',
  '/about',
  '/gallery',
  '/kiwano',
  '/kiwano-villament',
  '/services',
  '/testimonial',
  '/project-list',
]);

const secretsMatch = (provided, expected) => {
  if (typeof provided !== 'string') return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so compare lengths first.
  return a.length === b.length && timingSafeEqual(a, b);
};

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    console.error('[revalidate] REVALIDATE_SECRET is not set');
    return Response.json(
      { success: false, message: 'Revalidation is not configured' },
      { status: 500 }
    );
  }

  if (!secretsMatch(request.headers.get('x-revalidate-secret'), secret)) {
    return Response.json({ success: false, message: 'Invalid secret' }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    // Treated as an empty payload below.
  }

  const requested = Array.isArray(body.paths)
    ? body.paths
    : body.path
      ? [body.path]
      : [];

  const paths = [...new Set(requested.filter((p) => ALLOWED_PATHS.has(p)))];

  if (paths.length === 0) {
    return Response.json(
      {
        success: false,
        message: 'No revalidatable paths in request',
        allowed: [...ALLOWED_PATHS],
      },
      { status: 400 }
    );
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  console.log(`[revalidate] ${paths.join(', ')}`);
  return Response.json({ success: true, revalidated: paths, now: Date.now() });
}
