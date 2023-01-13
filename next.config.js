/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/users',
        destination: 'http://localhost:8080/api/users'
      },
      {
        source: "/api/images",
        destination: 'http://localhost:8080/api/images'
      }
    ]
  }
}


module.exports = nextConfig
