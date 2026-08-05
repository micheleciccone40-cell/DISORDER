import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Tutte le immagini sono locali in /public: niente domini remoti.
    formats: ["image/webp"],
  },
};

export default nextConfig;
