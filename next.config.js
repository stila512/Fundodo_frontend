/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: true,
  },
  //sass: 'https://github.com/vercel/next.js/issues/11610'
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'node_modules')],
  },
  // output: 'export', // don't use with `next start` or api route
  // distDir: 'dist',
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },
};

module.exports = nextConfig;
