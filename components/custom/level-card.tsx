import { useRouter } from 'next/navigation';
import { cacheLevel } from '../../lib/cache';
import { getDifficulty } from '../../lib/utilities';
import ILevel from '../../lib/types/level.interface';
import { DisplayUtils } from '@/lib/utils/displayUtils';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { isMobile } from 'react-device-detect';

interface LevelCardProps {
  level?: ILevel;
}

export function LevelCard({ level }: LevelCardProps) {
  const router = useRouter();
  const goToLevel = () => {
    if (level) {
      cacheLevel(level);
      return router.push(`/level`);
    } else {
      return router.push('/ai');
    }
  };

  return (
    <Card
      onClick={goToLevel}
      className={cn(
        isMobile ? 'w-full h-auto' : 'w-[200px] lg:h-[270px]',
        level ? '' : 'unicorn-color',
        'transition-all ease-in-out cursor-pointer shadow-md flex flex-col hover:scale-[1.02]'
      )}
    >
      <CardHeader>
        <div className='text-md leading-tight font-extrabold rounded-lg p-2 shadow-md bg-primary text-primary-foreground'>
          {level ? DisplayUtils.getLevelName(level.name) : 'AI Mode'}
        </div>
      </CardHeader>
      <CardContent className='relative'>
        {level ? (
          <section className='flex flex-wrap gap-2'>
            {level?.isNew === true && (
              <Badge
                variant='outline'
                className='bg-secondary text-secondary-foreground'
              >
                New Level
              </Badge>
            )}
            {level?.difficulty && (
              <Badge
                variant='outline'
                className='bg-secondary text-secondary-foreground'
              >
                Difficulty: {getDifficulty(level.difficulty, false)}
              </Badge>
            )}
            {level?.words && (
              <Badge
                variant='outline'
                className='bg-secondary text-secondary-foreground'
              >
                {level.words.length} words
              </Badge>
            )}
          </section>
        ) : (
          <section className='mt-2 leading-tight text-left'>
            Can&apos;t find the topic you are looking for? Try ask the AI to
            generate for you!
          </section>
        )}
      </CardContent>
      <div className='flex-grow h-auto w-full'></div>
      {level?.author && (
        <CardFooter>
          <div className='w-full italic text-right'>
            by <span className='font-extrabold'>{level.author}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
