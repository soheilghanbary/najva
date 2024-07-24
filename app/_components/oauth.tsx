'use client';
import { LoadingIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export const OAuth = () => {
  const [loading, setLoading] = useState({ google: false, github: false });

  const onSignIn = (provider: 'google' | 'github') => {
    setLoading({ ...loading, [provider]: true });
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="default"
        disabled={loading.github}
        onClick={() => onSignIn('github')}
      >
        {loading.github ? (
          <LoadingIcon className="ml-2 scale-75 fill-primary-foreground" />
        ) : (
          <GithubIcon className="ml-2 size-4" />
        )}
        ورود با گیت هاب
      </Button>
      <Button
        variant="secondary"
        disabled={loading.google}
        onClick={() => onSignIn('google')}
      >
        ورود با گوگل
      </Button>
    </div>
  );
};
