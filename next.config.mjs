/* Applied to every route. The audit found only
   `Content-Security-Policy: upgrade-insecure-requests` present, with HSTS,
   X-Content-Type-Options, Referrer-Policy, X-Frame-Options and
   Permissions-Policy all missing. */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stops advertising the framework/version in every response.
  poweredByHeader: false,

  images: {
    /* AVIF first, then WebP. The source art is multi-MB PNG/JPEG; AVIF
       typically lands 30-50% under WebP for the same quality, and a browser
       that supports neither still gets the original. */
    formats: ['image/avif', 'image/webp'],

    /* Optimised images are immutable (the URL carries the width and quality),
       but Next defaults to a 60-second TTL, so repeat visitors keep
       re-fetching the same derivatives. A year moves that to the browser
       cache. */
    minimumCacheTTL: 31536000,

    /* The default deviceSizes top out at 3840px — a 4K variant that nothing
       on this site displays, but which `fill` images request whenever a
       `sizes` hint is missing or generous. Capping at 1920 removes that
       worst case. imageSizes covers the small fixed-width art (avatars,
       logos, icons). */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        // YouTube testimonial thumbnails (see TestimonialCardMedia)
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Baseline hardening on every response.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        /* The scroll-driven hero sequences (/frames/**) are ~44MB and ~99MB of
           numbered stills. They are immutable build assets — a changed video
           produces a new extraction — so without an explicit header the
           browser revalidates hundreds of files on every visit and the hero
           stalls again on each return. */
        source: "/frames/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* Same reasoning for the hero/tour clips (~72MB of MP4): they are
           build assets that never change in place, but without an explicit
           header the browser revalidates them on every visit. */
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /* The remaining static art (~74MB across these three folders) had no
           cache policy at all, so every repeat visit revalidated it — which is
           what PageSpeed reports as "Use efficient cache lifetimes". These are
           checked-in build assets: a changed picture ships under a new name
           rather than being edited in place. */
        source: "/:dir(images|dummyimages|icons)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        /* The villa project page moved from /kiwano to /kiwano-villa. A
           permanent (308) redirect keeps old links, bookmarks and search
           results working and passes their ranking to the new URL. */
        source: "/kiwano",
        destination: "/kiwano-villa",
        permanent: true,
      },
      {
        // Briefly used interim name for the same page.
        source: "/kiwano-villas",
        destination: "/kiwano-villa",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
