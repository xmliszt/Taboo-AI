'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CONSTANTS } from '../lib/constants';

export default function Head() {
  const [title, setTitle] = useState<string>('Taboo.AI: Play Taboo with AI');
  const pathname = usePathname();

  const onTargetChanged = (event: CustomEvent<{ target: string }>) => {
    if (pathname === '/level') {
      setTitle(`Taboo.AI: Target -> ${event.detail.target}`);
    }
  };

  const onScoreComputed = (event: CustomEvent<{ score: number }>) => {
    if (pathname === '/result') {
      setTitle(`Taboo.AI: Score: ${event.detail.score}!`);
    }
  };

  const isPathTitleCustom = (pathname: string): boolean => {
    switch (pathname) {
      case '/level':
      case '/result':
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    const isCustom = isPathTitleCustom(pathname ?? '');
    const title = getTitle(isCustom);
    setTitle(title);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener(
      CONSTANTS.eventKeys.targetChanged,
      onTargetChanged as EventListener
    );
    window.addEventListener(
      CONSTANTS.eventKeys.scoreComputed,
      onScoreComputed as EventListener
    );

    return () => {
      window.removeEventListener(
        CONSTANTS.eventKeys.targetChanged,
        onTargetChanged as EventListener
      );
      window.removeEventListener(
        CONSTANTS.eventKeys.scoreComputed,
        onScoreComputed as EventListener
      );
    };
  }, []);

  const getTitle = (isCustomPath: boolean): string => {
    switch (pathname) {
      case '/':
        return 'Taboo.AI: Play Taboo with AI';
      case '/ai':
        return 'Taboo.AI: AI Mode';
      case '/whatsnew':
        return "Taboo.AI: What's New";
      case '/levels':
        return 'Taboo.AI: Choose Topics';
      case '/rule':
        return 'Taboo.AI: Game Rules';
      case '/buymecoffee':
        return 'Taboo.AI: Buy Me Coffee';
      case '/level':
        return isCustomPath ? title : 'Taboo.AI: Play Taboo with AI';
      case '/result':
        return isCustomPath ? title : 'Taboo.AI: Share your scores!';
      case '/signup':
        return 'Taboo.AI: Submit Your Nickname';
      case '/daily-challenge':
        return 'Taboo.AI: Daily Challenge';
      case '/recovery':
        return 'Taboo.AI: Recover Your Scores';
      default:
        return 'Taboo.AI: Play Taboo with AI';
    }
  };
  return (
    <>
      <title>{title}</title>
      <link
        rel='canonical'
        href='https://taboo-ai.vercel.app/'
        key='canonical'
      />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta charSet='UTF-8' />
      <meta
        name='description'
        content='Unleash your wordplay skills and master English with Taboo.AI! Challenge yourself daily, compete on the leaderboard, and have fun learning. Join now!'
      />
      <meta property='og:title' content={title} />
      <meta
        property='og:description'
        content='Unleash your wordplay skills and master English with Taboo.AI! Challenge yourself daily, compete on the leaderboard, and have fun learning. Join now!'
      />
      <meta property='og:image' content='https://i.ibb.co/44Gz4P1/Poster.png' />
      <meta property='og:image:alt' content={title} />
      <meta property='og:url' content='https://taboo-ai.vercel.app/' />
      <meta property='og:site_name' content='Taboo.AI' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta
        name='keywords'
        content='AI,Wordplay game,Taboo challenge,English learning,Vocabulary builder,Language skills,Educational game,Word guessing,Trivia game,Brain teaser,Linguistic skills'
      />
      <meta name='author' content='Li Yuxuan' />
      <meta
        name='application-name'
        content='Taboo.AI: Play Taboo Game for Free with AI'
      />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta
        name='twitter:description'
        content='Unleash your wordplay skills and master English with Taboo.AI! Challenge yourself daily, compete on the leaderboard, and have fun learning. Join now!'
      />
      <meta
        name='twitter:image'
        content='https://i.ibb.co/44Gz4P1/Poster.png'
      />
      <meta name='twitter:image:alt' content={title} />
      <meta name='twitter:creator' content='@xmliszt' />
      <meta name='twitter:site' content='@xmliszt' />
      <meta
        name='ahrefs-site-verification'
        content='f832d06e3893f0e38cd251704fa298ec65dfd86ce5b54eebb349c755229b0dd9'
      />
      <meta
        name='google-site-verification'
        content='ropLCQ8cEksVS7dB6jbFu4wrAfkdeTPe05Tj2m4zZGk'
      />
      <link rel='icon' href='/favicon.ico' />
    </>
  );
}
