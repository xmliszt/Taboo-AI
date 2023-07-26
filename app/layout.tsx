/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { Grenze } from 'next/font/google';
import { AnalyticsWrapper } from '../components/AnalayticsWrapper';
import FeaturePopup from '../components/FeaturePopup/FeaturePopup';
import { ThemeProvider } from './ThemeProvider';
import Header from '../components/Header';
import Maintenance from '../components/Maintenance';
import { Metadata } from 'next';
import { _meta } from '../lib/metadata';
import PWAInstaller from './PWAInstaller';

import './global.css';
import './main.css';
import Script from 'next/script';

const font = Grenze({
  weight: '400',
  subsets: ['latin'],
  fallback: [
    'ui-serif',
    'Georgia',
    'Cambria',
    'Times New Roman',
    'Times',
    'serif',
  ],
});

export const metadata: Metadata = _meta;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const maintenanceMode = JSON.parse(
    process.env.NEXT_PUBLIC_MAINTENANCE || 'false'
  );
  return (
    <html lang='en'>
      <Script id='pwa-script' src='/js/pwa.js' />
      <Script id='clarity-script' src='/js/clarity.js' />
      <head />
      <body className={`${font.className} bg-black text-white scrollbar-hide`}>
        <ThemeProvider>
          <Header maintenanceOn={maintenanceMode} />
          {maintenanceMode && <Maintenance />}
          <PWAInstaller>{!maintenanceMode && children}</PWAInstaller>
          {!maintenanceMode && <FeaturePopup />}
          <AnalyticsWrapper />
        </ThemeProvider>
        <div className='h-4 fixed bottom-0 w-full backdrop-blur-lg gradient-blur-mask-reverse z-50'></div>
      </body>
    </html>
  );
}
