import { ReactNode } from 'react';

interface BadgeProps {
  customClass?: string;
  location?: 'TOP-LEFT' | 'TOP-RIGHT' | 'BOTTOM-LEFT' | 'BOTTOM-RIGHT';
  children: ReactNode;
}

export default function HotBadge(props: BadgeProps) {
  let locationClass = '-top-2 lg:-top-4 -right-4';
  switch (props.location) {
    case 'TOP-LEFT':
      locationClass = '-top-2 lg:-top-4 -left-0';
      break;
    case 'TOP-RIGHT':
      locationClass = '-top-2 lg:-top-4 -right-4';
      break;
    case 'BOTTOM-LEFT':
      locationClass = '-bottom-2 lg:-bottom-4 -left-0';
      break;
    case 'BOTTOM-RIGHT':
      locationClass = '-bottom-2 lg:-bottom-4 -right-4';
      break;
  }
  return (
    <div className='relative'>
      <span
        className={`absolute shadow-lg ${locationClass} h-4 lg:h-8 text-xs lg:text-xl w-auto px-2 lg:px-4 z-10 text-orange-700 font-bold rounded-full font-mono flex justify-center items-center ${
          props.customClass ?? 'z-10 bg-orange-400'
        } whitespace-nowrap animate-bounce`}
      >
        HOT
      </span>
      {props.children}
    </div>
  );
}
