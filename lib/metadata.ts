import { Metadata } from 'next';

export const _meta: Metadata = {
  title: {
    default: 'Taboo AI: Ignite Learning Through Play 🚀🎮',
    template: 'Taboo AI | %s',
  },
  metadataBase: new URL('https://taboo-ai.vercel.app'),
  description:
    'Unleash wordplay skills, master English, and have fun learning with Taboo AI! Join now for a thrilling experience.',
  applicationName: 'Taboo AI: Ignite Learning Through Play 🚀🎮',
  keywords: [
    'AI',
    'Wordplay game',
    'Taboo challenge',
    'English learning',
    'Vocabulary builder',
    'Language skills',
    'Educational game',
    'Word guessing',
    'Trivia game',
    'Brain teaser',
    'Linguistic skills',
  ],
  authors: [{ name: 'Li Yuxuan', url: 'https://liyuxuan.dev/' }],
  creator: 'Li Yuxuan',
  category: 'technology',
  openGraph: {
    title: 'Taboo AI: Ignite Learning Through Play 🚀🎮',
    description:
      'Unleash wordplay skills, master English, and have fun learning with Taboo AI! Join now for a thrilling experience.',
    url: 'https://taboo-ai.vercel.app/',
    siteName: 'Taboo AI',
    images: [
      {
        url: 'https://github.com/xmliszt/resources/blob/main/taboo-ai/images/v300/poster3.0(features).png?raw=true',
        width: 800,
        height: 600,
        alt: 'Taboo AI: Ignite Learning Through Play 🚀🎮',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
  },
  manifest: '/manifest.json',
  twitter: {
    card: 'summary_large_image',
    title: 'Taboo AI: Ignite Learning Through Play 🚀🎮',
    description:
      'Unleash wordplay skills, master English, and have fun learning with Taboo AI! Join now for a thrilling experience.',
    siteId: '1704579643',
    creator: '@xmliszt',
    creatorId: '1704579643',
    images: [
      'https://github.com/xmliszt/resources/blob/main/taboo-ai/images/v300/poster3.0.png?raw=true',
      'https://github.com/xmliszt/resources/blob/main/taboo-ai/images/v300/poster3.0(features).png?raw=true',
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  appleWebApp: {
    title: 'Taboo AI: Ignite Learning Through Play 🚀🎮',
    statusBarStyle: 'black-translucent',
    startupImage: [
      'https://github.com/xmliszt/resources/blob/main/taboo-ai/images/v300/poster3.0.png?raw=true',
    ],
  },
  other: {
    'google-site-verification': 'ropLCQ8cEksVS7dB6jbFu4wrAfkdeTPe05Tj2m4zZGk',
    'ahrefs-site-verification': 'f832d06e3893f0e38cd251704fa298ec65dfd86ce5b54eebb349c755229b0dd9',
  },
};
