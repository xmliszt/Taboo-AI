'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { checkoutSuccess } from '@/lib/services/subscriptionService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CheckoutSuccessPage({
  params: { sessionId },
}: {
  params: { sessionId: string };
}) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const linkCustomer = async () => {
      try {
        await checkoutSuccess(sessionId);
      } catch (error) {
        console.error(error);
        setShowAlert(true);
      }
    };
    linkCustomer();
  }, []);

  return (
    <div className='mt-20 w-full flex flex-col items-center justify-center'>
      <h1 className='leading-snug text-center text-4xl font-bold -mt-10'>
        Thank you for your purchase!
      </h1>
      <Link
        href='/profile?anchor=subscription'
        className='mt-10 bg-primary text-primary-foreground p-6 rounded-xl'
      >
        View My Subscription
      </Link>
      <AlertDialog
        open={showAlert}
        onOpenChange={(open) => {
          setShowAlert(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Something went wrong!</AlertDialogTitle>
            <AlertDialogDescription className='leading-snug'>
              Something unexpected happened during the update process between
              Stripe and us. Your subscription may not be updated with us. Taboo
              AI team has been notified and we will help you resolve this issue
              as soon as possible! Alternatively, you can also raise an issue
              report to us in the subscription section in your profile
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>View My Subscription Status</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
