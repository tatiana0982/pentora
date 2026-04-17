import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ugc.production.linktr.ee",
      "cdn-icons-png.flaticon.com",
      "blush-fashionable-swift-557.mypinata.cloud",
      "placehold.co",
      "picsum.photos",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com"
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;