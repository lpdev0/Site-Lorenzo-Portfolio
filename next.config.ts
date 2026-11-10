import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Exporta HTML estático em /out (funciona em Vercel, Hostinger ou qualquer host estático)
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // dois root layouts (PT em "/" e EN em "/en"), então o 404 é global
    globalNotFound: true,
  },
};

export default nextConfig;
