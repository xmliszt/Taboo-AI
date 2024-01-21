import { useState } from 'react';
import { DialogProps } from '@radix-ui/react-dialog';
import _ from 'lodash';
import { toast } from 'sonner';

import { UserProfile } from '@/app/profile/server/fetch-user-profile';
import { sendEmail } from '@/lib/services/emailService';
import { addLevel, isLevelWithSameNameSubmittedBySameUser } from '@/lib/services/levelService';
import { addWord } from '@/lib/services/wordService';
import { cn } from '@/lib/utils';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Spinner } from './spinner';

interface TopicReviewSheet extends DialogProps {
  user: UserProfile;
  topicName: string;
  difficultyLevel: string;
  shouldUseAIForTabooWords: boolean;
  targetWords: string[];
  defaultNickname: string;
  isAIGenerated?: boolean;
  tabooWords?: string[][];
  onTopicSubmitted?: () => void;
}

export function TopicReviewSheet({
  open,
  user,
  topicName,
  difficultyLevel,
  defaultNickname,
  shouldUseAIForTabooWords,
  isAIGenerated = false,
  targetWords,
  tabooWords = [],
  onTopicSubmitted,
  onOpenChange,
}: TopicReviewSheet) {
  const [nickname, setNickname] = useState(defaultNickname);
  const [isCreatingLevel, setisCreatingLevel] = useState(false);

  const submitNewTopic = async () => {
    setisCreatingLevel(true);
    try {
      const exists = await isLevelWithSameNameSubmittedBySameUser(topicName, user.id);
      if (exists) {
        toast.info('You have already submitted this topic.');
        onTopicSubmitted && onTopicSubmitted();
        return;
      }
      await addLevel({
        name: topicName,
        difficulty: Number(difficultyLevel),
        words: targetWords.map((w) => _.toLower(_.trim(w))),
        createdBy: user.id,
      });
      if (!shouldUseAIForTabooWords)
        for (let i = 0; i < tabooWords.length; i++) {
          const wordList = tabooWords[i];
          const targetWord = targetWords[i];
          await addWord(targetWord, wordList, false, user.id);
        }

      await sendMyselfEmail();
      toast.success(
        'Your topic has been submitted for review. The outcome of the submission will be notified via email.'
      );
      onTopicSubmitted && onTopicSubmitted();
    } catch (error) {
      toast.error('Sorry, we are unable to submit the topic at the moment!');
      console.error(error);
    } finally {
      setisCreatingLevel(false);
      onOpenChange && onOpenChange(false);
    }
  };

  const sendMyselfEmail = async () => {
    const email = user.email;
    const name = nickname || 'anonymous';
    try {
      await sendEmail(
        name,
        email,
        `${email} has submitted a new topic!`,
        `Taboo AI New Topic Submission: ${email} has submitted a new topic!`,
        `<article>
        <h1>New Topic Submitted: <b>${topicName}</b></h1>
        <div>
            <p>Nickname: ${name}</p>
            <p>Email: ${email}</p>
            <p>Topic Name: <b>${topicName}</b></p>
        </div>
        <br/>
        ${targetWords.map(
          (w, i) => `
          <hr/>
          <h2>Target: ${w}</h2>
          <h3>Difficulty Level: ${difficultyLevel}</h3>
          ${
            shouldUseAIForTabooWords
              ? '<div>This user has opted in for AI to generate taboo words.</div>'
              : tabooWords[i].map((tw) => `<div>${tw}</div>`)
          }
        `
        )}
        </article>`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='bottom' className='h-full overflow-y-auto leading-snug'>
        <SheetHeader>
          <SheetTitle className='flex flex-col justify-center gap-1'>
            Review Your Topic: <b className='ml-2 text-2xl font-extrabold'>{topicName}</b>
          </SheetTitle>
        </SheetHeader>
        <div className='mt-4 flex flex-wrap justify-center gap-8'>
          {targetWords.map((w, i) => (
            <Card key={i} className='max-w-[300px]'>
              <CardHeader className='p-2 text-center text-2xl font-bold'>
                <CardTitle className='rounded-lg bg-secondary py-4 shadow-md'>
                  {_.startCase(_.trim(w))}
                </CardTitle>
              </CardHeader>
              <CardContent className='mt-2 text-center'>
                {isAIGenerated === true ? (
                  <p>
                    This topic is AI generated. Hence the taboo words will be generated by AI as
                    well.
                  </p>
                ) : shouldUseAIForTabooWords ? (
                  <p>
                    You chose to use AI to generate the taboo words. Your taboo words will be ready
                    once the submission passes the review.
                  </p>
                ) : (
                  tabooWords !== undefined && (
                    <>
                      <p className='text-red-400'>Taboo Words:</p>
                      <div className='mt-4 flex flex-wrap gap-4'>
                        {tabooWords[i]
                          .filter((w) => w.length > 0)
                          .map((tw, ti) => (
                            <Badge key={ti}>{tw}</Badge>
                          ))}
                      </div>
                    </>
                  )
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='my-4 flex flex-col gap-2'>
          <Label htmlFor='email-input'>Contributor email: </Label>
          <Input disabled id='email-input' defaultValue={user.email} />
        </div>
        <div className='my-4 flex flex-col gap-2'>
          <Label htmlFor='nickname-input'>Nickname: </Label>
          <Input
            id='nickname-input'
            value={nickname}
            maxLength={20}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            className={cn(_.trim(nickname).length <= 0 ? '!border-red-500' : '!border-border')}
          />
          <p className='text-xs text-muted-foreground'>
            Nickname will be displayed under the successfully contributed topic and visible to all
            players.
          </p>
        </div>
        <div className='flex justify-center'>
          {isCreatingLevel ? (
            <Button disabled>
              <Spinner />
            </Button>
          ) : (
            <Button
              disabled={_.trim(nickname).length <= 0}
              className='mb-4'
              aria-label='click to submit the topic created'
              onClick={submitNewTopic}
            >
              Submit Topic
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
