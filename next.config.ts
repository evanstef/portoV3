import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "tenor.com", // Tenor GIF
      "media1.giphy.com",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
