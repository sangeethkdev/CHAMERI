/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
};

export default nextConfig;
