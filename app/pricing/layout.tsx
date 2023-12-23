import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    url: 'https://taboo-ai.vercel.app/pricing',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative flex h-full w-full justify-center'>
      {children}
      <div className='absolute bottom-0 w-full p-2 text-center text-xs text-primary'>
        Powered by{' '}
        <Link href='https://www.stripe.com/' target='_blank' className='underline'>
          Stripe
        </Link>
        . Read Stripe&apos;s{' '}
        <Link href='https://stripe.com/en-US/privacy' target='_blank' className='underline'>
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link href='https://stripe.com/en-gb-sg/legal/ssa' target='_blank' className='underline'>
          Terms of Service
        </Link>{' '}
        for more information.
      </div>
    </main>
  );
}