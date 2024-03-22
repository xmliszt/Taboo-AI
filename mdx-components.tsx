import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';

import { HoverPerspectiveContainer } from './components/custom/common/hover-perspective-container';
import { CustomEventKey, EventManager } from './lib/event-manager';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    ...components,
    img: (props) => (
      <HoverPerspectiveContainer className='flex items-center justify-center'>
        <Image
          className='m-0 p-0'
          src={props.src ?? ''}
          alt={props.alt ?? ''}
          width={100}
          height={100}
          layout={'responsive'}
        />
      </HoverPerspectiveContainer>
    ),
    a: (props) => (
      <span className='ml-1 font-bold'>
        <Link
          href={props.href ?? ''}
          style={{
            textUnderlineOffset: '0.4em',
            textDecorationStyle: 'wavy',
            transition: 'text-decoration-style 0.5s ease-out',
          }}
          onClick={() => {
            EventManager.fireEvent(CustomEventKey.CLOSE_FEATURE_POPUP);
          }}
        >
          {props.children}
        </Link>
      </span>
    ),
    em: (props) => <span className='italic text-muted-foreground'>{props.children}</span>,
  };
}
