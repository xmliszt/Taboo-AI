'use client';

import { FormEvent, useEffect, useState } from 'react';
import BackButton from '../(components)/BackButton';
import { getScoresCache, setUser } from '../../lib/cache';
import LoadingMask from '../(components)/Loading';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { createUser } from '../../lib/services/frontend/userService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [nickname, setNickname] = useState<string>('');
  const [hasScores, setHasScores] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (hasScores === null) {
      const scoresCache = getScoresCache();
      setHasScores(scoresCache !== null);
    }
  }, [hasScores]);

  const signup = (e: FormEvent) => {
    e.preventDefault();
    if (nickname.length <= 0) {
      setErrorMessage('Please enter nickname before submitting!');
    } else {
      confirmAlert({
        title: 'Your Nickname is...',
        message: nickname,
        buttons: [
          { label: 'Submit', onClick: submitNickname },
          { label: 'Wait! Let me change!' },
        ],
      });
    }
  };

  const submitNickname = async () => {
    try {
      setIsLoading(true);
      const newUser = await createUser(nickname);
      window.dispatchEvent(new CustomEvent('onSignUpComplete'));
      setUser(newUser);
      router.push(hasScores ? '/result' : '/');
    } catch (error) {
      console.error(error);
      setErrorMessage(
        'Sorry! We are unable to submit your nickname at the moment. Please try again later!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingMask
        isLoading={isLoading}
        message='Submitting your nickname...'
      />
      <BackButton href={hasScores ? '/result' : '/'} />
      <section className='w-full h-full flex justify-center items-center leading-normal'>
        <div
          className={`h-4/5 aspect-square max-w-[80vw] max-h-[80vh] rounded-3xl drop-shadow-lg bg-white dark:bg-neon-gray p-4 lg:p-16 transition-all ${
            errorMessage !== null
              ? 'border-red dark:border-neon-red border-8'
              : 'border-none'
          }`}
        >
          <form
            onSubmit={signup}
            className='flex flex-col h-full gap-4 text-center'
          >
            <label
              htmlFor='nickname-input'
              aria-label='lable for the nickname input'
              className='text-black dark:text-neon-white text-xl lg:text-3xl'
            >
              Nickname
            </label>
            <input
              id='nickname-input'
              type='text'
              aria-label='input your nickname here'
              placeholder='Enter your nickname...'
              className='h-24 lg:h-36 rounded-3xl w-full text-2xl lg:text-4xl focus:!border-green focus:dark:!border-neon-green'
              onChange={(e) => {
                e.preventDefault();
                setErrorMessage(null);
                setNickname(e.target.value);
              }}
            />
            <label
              htmlFor='nickname-input'
              className='text-black dark:text-neon-white'
            >
              ... so that you can identify yourself in the ranking board.
            </label>
            <div className='flex-grow text-3xl text-red dark:text-neon-red h-full items-center justify-center flex'>
              {errorMessage}
            </div>
            <button className='h-24 lg:h-36 text-2xl lg:text-4xl !bg-green dark:!bg-neon-black !text-white dark:!text-neon-white'>
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignupPage;