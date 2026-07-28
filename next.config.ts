import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Rewrite /uploads/* to /api/uploads/* for production file serving.
      // This allows existing data with old `/uploads/...` paths to still work
      // when the new API route handler is used.
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
