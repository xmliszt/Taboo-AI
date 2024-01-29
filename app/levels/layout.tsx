import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choose Topic',
  alternates: {
    canonical: '/levels',
  },
  openGraph: {
    url: 'https://taboo-ai.vercel.app/levels',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className='flex justify-center'>{children}</main>;
}
