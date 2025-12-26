/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "afirinhggwrcllldrdum.supabase.co",
        pathname: "/storage/v1/**"
      }
    ]
  }
};

export default nextConfig;

