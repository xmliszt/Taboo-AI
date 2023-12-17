'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

import { AuthStatus } from '@/components/auth-provider';
import { useToast } from '@/components/ui/use-toast';
import { firebaseAuth } from '@/firebase/firebase-client';

import { signInWithGoogle } from '../services/authService';
import {
  getUser,
  signinUser,
  updateUIDIfNotExist,
  updateUserFromAuth,
} from '../services/userService';
import IUser from '../types/user.type';

const TIMEOUT = 60000; // seconds

export function useFirebaseAuth() {
  const { toast } = useToast();
  const [user, setUser] = useState<IUser>();
  const [status, setStatus] = useState<AuthStatus>('loading');
  const loginTimer = useRef<NodeJS.Timeout | null>(null);

  const login = useCallback(async () => {
    try {
      setStatus('loading');
      loginTimer.current = setTimeout(() => {
        if (status === 'loading') {
          setStatus('unauthenticated');
          toast({
            title: 'Sign in timeout. Please try again!',
            variant: 'destructive',
          });
        }
      }, TIMEOUT);
      await signInWithGoogle();
    } catch (error) {
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
        throw Error('Sign in popup was blocked by browser.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast({ title: 'Sign in is cancelled.' });
      } else {
        console.error(error);
        toast({ title: 'Failed to sign in!', variant: 'destructive' });
      }
      setStatus('unauthenticated');
    } finally {
      loginTimer.current && clearTimeout(loginTimer.current);
    }
  }, []);

  const logout = useCallback(async () => {
    setStatus('loading');
    try {
      await signOut(firebaseAuth);
      await firebaseAuth.signOut();
      toast({ title: 'You are logged out.' });
    } catch (error) {
      console.error(error);
    } finally {
      setStatus('unauthenticated');
    }
  }, []);

  const handleAuthUser = useCallback(async (currentUser: User | null | undefined) => {
    if (currentUser && currentUser.email) {
      try {
        const user = await getUser(currentUser.email);
        if (user) {
          // existing user
          await signinUser(user.email);
          user.uid === undefined && (await updateUIDIfNotExist(user.email, currentUser.uid));
          setUser(user);
          setStatus('authenticated');
          const username = user.nickname ?? user.name;
          toast({
            title: 'Welcome Back!' + (username ? ' ' + username : ''),
          });
        } else {
          // new user
          const newUser = await updateUserFromAuth(currentUser);
          setUser(newUser);
          setStatus('authenticated');
          const username = newUser.nickname ?? newUser.name;
          toast({
            title: 'Hi' + (username ? ' ' + username : '') + '! Welcome to Taboo AI!',
          });
        }
      } catch (error) {
        console.log(error.message);
        setStatus('unauthenticated');
      }
    } else {
      setUser(undefined);
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      await handleAuthUser(user);
    });

    return () => unsubscribe();
  }, [handleAuthUser]);

  return { user, status, setStatus, login, logout };
}
