'use client';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signOut({ callbackUrl: '/' });
      }}
      variant={'secondary'}
      className="w-full font-semibold text-destructive"
    >
      <LogOutIcon className="ml-2 size-4" />
      خروج از حساب
    </Button>
  );
};
