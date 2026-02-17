/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tempfile.aiquickdraw.com",
      },
    ],
  },
};

export default nextConfig;
