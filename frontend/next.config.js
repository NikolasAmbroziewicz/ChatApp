/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chats',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
