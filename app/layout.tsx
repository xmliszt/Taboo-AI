/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import { Lora } from 'next/font/google';

import { _meta } from '@/lib/metadata';
import { AnalyticsWrapper } from '@/components/analytics-wrapper';
import FeaturePopup from '@/components/custom/feature-popup';
import Maintenance from '@/components/custom/maintenance';
import PWAInstaller from '@/components/custom/pwa-installer';
import { AuthProvider } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import SideMenu from '@/components/custom/side-menu';
import { GlobalTooltipProvider } from '@/components/tooltip-provider';
import { LoginErrorBoundary } from '@/components/custom/login-error-boundary';

import './markdown.css';
import './globals.css';

const font = Lora({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
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
    <html lang='en' suppressHydrationWarning={true}>
      <Script id='pwa-script' src='/js/pwa.js' />
      <Script id='clarity-script' src='/js/clarity.js' />
      <head />
      <body className={`${font.className} scrollbar-hide`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <GlobalTooltipProvider delayDuration={300}>
            <AuthProvider>
              {maintenanceMode ? (
                <Maintenance />
              ) : (
                <>
                  <PWAInstaller>{children}</PWAInstaller>
                  <Suspense>
                    <SideMenu />
                  </Suspense>
                  <FeaturePopup />
                </>
              )}
              <AnalyticsWrapper />
              <LoginErrorBoundary />
            </AuthProvider>
          </GlobalTooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
