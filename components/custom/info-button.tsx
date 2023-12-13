'use client';

import { HelpCircle } from 'lucide-react';
import IconButton from '../ui/icon-button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface InfoButtonProps {
  title?: string;
  description?: string;
  tooltip?: string;
  className?: string;
  size?: number;
}

export const InfoButton = ({
  title,
  description,
  tooltip = 'View Info',
  className = '',
  size = 20,
}: InfoButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          asChild
          className={cn(className, '')}
          variant='link'
          tooltip={tooltip}
        >
          <HelpCircle size={size} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className='leading-snug bg-muted text-card-foreground'>
        <h4 className='font-bold text-lg'>{title}</h4>
        <p className='leading-tight text-base'>{description}</p>
      </PopoverContent>
    </Popover>
  );
};
