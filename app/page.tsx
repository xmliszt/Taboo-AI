'use client';

import DevToggle from '@/components/custom/dev-toggle';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Coffee, PenSquare, Quote, View } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useState } from 'react';
import { BsDiscord } from 'react-icons/bs';
import ContactMe from '../components/custom/contact-me';
import SocialLinkButton from '../components/custom/social-link-button';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import Header from '@/components/header/Header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HomeMenuButton } from '@/components/custom/home-menu-button';

interface HomePageProps {}

const title = 'Taboo AI';
const versionNumber = `V${process.env.NEXT_PUBLIC_TABOO_AI_VERSION}`;

export default function HomePage(props: HomePageProps) {
  const [isSignInPromptOpen, setIsSignInPromptOpen] = useState(false);
  const { user, status, login } = useAuth();
  const router = useRouter();
  const navigateTo = (href: string) => {
    router.push(href);
  };

  const handleAddTopic = () => {
    if (status === 'authenticated') {
      navigateTo('/add-level');
    } else {
      setIsSignInPromptOpen(true);
    }
  };

  const signIn = async () => {
    setIsSignInPromptOpen(false);
    login && (await login());
  };

  return (
    <main className='h-full w-full overflow-auto scrollbar-hide'>
      <Header isTransparent />
      <Script id='pwa-script' src='/js/pwa.js' />
      <section className='flex flex-col justify-center items-center overflow-y-scroll scrollbar-hide w-screen gap-2 pt-24 lg:pt-24 pb-4'>
        <div className='w-full relative'>
          <h1
            data-testid='heading-title'
            className='text-center text-6xl lg:text-8xl drop-shadow-lg'
          >
            {title}
          </h1>
        </div>
        <span className='text-lg'>{versionNumber}</span>
        <section className='mt-4 mb-2 flex-col flex gap-4 mx-4 max-w-[400px]'>
          <HomeMenuButton
            icon={<Quote size={20} />}
            title='Choose A Topic'
            subtitle='Start playing Taboo AI by choosing one topic that you like.'
            aria-label='Click to choose a topic to start playing'
            href='/levels'
          />
          <HomeMenuButton
            icon={<PenSquare size={20} />}
            title='Contribute New Topics'
            subtitle='Be a contributor! Your creative topic will be played by all Taboo AI players around the world!'
            href='/add-level'
            aria-label='Click to contribute a new topic to Taboo AI'
          />
          {user?.email === 'xmliszt@gmail.com' &&
            status === 'authenticated' && (
              <HomeMenuButton
                icon={<View size={20} />}
                title='Review Topics & Words'
                subtitle='This mode is only open for admin access. You can review and verify topics and worlds submitted.'
                href='/x/review-words'
                aria-label='Click to review topics as dev'
              />
            )}
        </section>
        <DevToggle />
        <section className='mt-10 w-11/12'>
          <ContactMe />
        </section>
        <div className='px-4 my-2 w-full flex flex-col lg:flex-row gap-2 justify-center'>
          <SocialLinkButton
            content='Buy Me Coffee'
            icon={<Coffee />}
            href='/buymecoffee'
          />
          <SocialLinkButton
            content='Join Discord!'
            icon={<BsDiscord />}
            href='https://discord.gg/dgqs29CHC2'
            newTab={true}
          />
        </div>
        <p className='px-4 my-2 w-full text-primary text-xs leading-tight text-center'>
          We improve our products and advertising by using Microsoft Clarity to
          see how you use our website. By using our site, you agree that we and
          Microsoft can collect and use this data. Our{' '}
          <Link href='/privacy' className='underline'>
            privacy statement
          </Link>{' '}
          has more details.
        </p>
      </section>

      <AlertDialog
        open={isSignInPromptOpen}
        onOpenChange={(open) => {
          setIsSignInPromptOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You need to sign in to contribute a topic!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={signIn}>Sign In Here</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
