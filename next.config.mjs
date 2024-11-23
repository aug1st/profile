/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: 'export',  // Enable static exports
  basePath: '/profile', // The name of your repository
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
