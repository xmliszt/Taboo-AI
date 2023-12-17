import { Github } from 'lucide-react';
import { SiNextdotjs, SiOpenai } from 'react-icons/si';

export default function Footer() {
  return (
    <footer
      data-testid='footer'
      className='fixed bottom-0 z-50 flex h-auto w-full flex-col items-center justify-center gap-0 rounded-t-lg bg-primary py-3 text-center text-xs text-primary-foreground shadow-2xl lg:text-sm'
    >
      <div className='px-2'>
        Powered by{' '}
        <a
          aria-label='Read more about Next.JS on its official website'
          href='https://beta.nextjs.org/docs/getting-started'
          target='__blank'
          className='underline '
        >
          Next.JS <SiNextdotjs size={12} className='inline' />
        </a>{' '}
        &{' '}
        <a
          aria-label='Read more about OpenAI APi on its official website'
          href='https://openai.com/api/'
          target='__blank'
          className='underline '
        >
          OpenAI API <SiOpenai size={12} className='inline' />
        </a>{' '}
        | Developed by{' '}
        <a
          aria-label="Go to Li Yuxuan's personal portfolio page"
          href='https://xmliszt.github.io/'
          target='__blank'
          className='underline '
        >
          Li Yuxuan <Github size={12} className='inline' />
        </a>
      </div>
      <div className='flex flex-row gap-2 px-2'>
        <a aria-label='Read more about the Privacy Policy' href='/privacy' className='underline '>
          Privacy Policy
        </a>
        <a
          aria-label='Read more about the Cookie Policy'
          href='/cookie-policy'
          className='underline  '
        >
          Cookie Policy
        </a>
        <a aria-label='Read Taboo AI features' href='/whatsnew' className='underline '>
          Features
        </a>
        <a aria-label='Read Taboo AI releases roadmap' href='/roadmap' className='underline '>
          Releases Roadmap
        </a>
      </div>
    </footer>
  );
}
