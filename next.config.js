/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com'
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io'
      },
    ],
  },
  experimental: {
    images: {
      allowFutureImages: true
    }
  }
}

module.exports = nextConfig
