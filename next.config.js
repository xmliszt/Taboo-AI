/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const appSecurityHeaders = [
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: '/next-sw.js',
  disable: process.env.NODE_ENV !== 'production',
});

const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.theresanaiforthat.com',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'aibrb.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'api.producthunt.com',
      },
      {
        protocol: 'https',
        hostname: 'avosfnqiscrmxpqmhswp.supabase.co',
      },
    ],
    formats: ['image/webp'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: appSecurityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/privacy',
        destination: '/html/privacy.html',
      },
      {
        source: '/cookie-policy',
        destination: '/html/cookie-policy.html',
      },
      {
        source: '/sitemap.txt',
        destination: '/api/sitemap?type=txt',
      },
    ];
  },
  eslint: {
    dirs: ['app', 'pages', 'components', 'lib'],
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withPWA(nextConfig));
