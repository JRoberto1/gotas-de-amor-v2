import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Necessário para o Sanity Studio embedded funcionar corretamente
  transpilePackages: ['next-sanity'],
}

export default nextConfig
