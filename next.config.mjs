/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent webpack from bundling native optional deps of `ws`
      // used by @neondatabase/serverless — fixes "bufferUtil.mask is not a function"
      config.externals.push('bufferutil', 'utf-8-validate');
    }
    return config;
  },
};

export default nextConfig;
