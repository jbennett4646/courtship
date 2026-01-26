/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'assets.co.dev']
  },
  async rewrites() {
    return [
      {
        source: '/settings',
        destination: '/settings-new',
      },
      {
        source: '/marriage-ledger',
        destination: '/blessed-matches',
      },
    ]
  },
};

export default nextConfig;