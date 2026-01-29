/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mfvlupdibigooihoiuew.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Proxy /byte-runner to the standalone game deployment
  async rewrites() {
    return [
      {
        source: '/byte-runner',
        destination: 'https://byte-runner-seven.vercel.app',
      },
      {
        source: '/byte-runner/:path*',
        destination: 'https://byte-runner-seven.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig

