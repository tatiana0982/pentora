import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ugc.production.linktr.ee", "cdn-icons-png.flaticon.com", "blush-fashionable-swift-557.mypinata.cloud", "placehold.co", "picsum.photos", "images.unsplash.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
    /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
