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
        source: '/api/csrf',
        destination: 'http://localhost:8080/api/csrf' // Proxy to Backend
      },
      {
        source: '/api/users',
        destination: 'http://localhost:8080/api/users'
      }
    ]
  }
}


module.exports = nextConfig
