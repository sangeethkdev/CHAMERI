/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
