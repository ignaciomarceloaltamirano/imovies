/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: '2a3efbbdcc66ed82dfbc4902bb7c157c',
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'image.tmdb.org',
    ],
  },
};

module.exports = nextConfig;
