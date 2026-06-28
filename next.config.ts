import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://placehold.co/**"),
      new URL("https://picsum.photos/**"),
      new URL("https://wilayah.id/**"),
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/wilayah/:path*",
        destination: "https://wilayah.id/api/:path*",
      },
    ];
  },
};

export default nextConfig;
