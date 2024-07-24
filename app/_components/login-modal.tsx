'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const OAuth = () => {
  const [loading, setLoading] = useState({ google: false, github: false });

  const onSignIn = (provider: 'google' | 'github') => {
    setLoading({ ...loading, [provider]: true });
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        disabled={loading.google}
        onClick={() => onSignIn('google')}
      >
        گوگل
      </Button>
      <Button
        variant="default"
        disabled={loading.github}
        onClick={() => onSignIn('github')}
      >
        گیت هاب
      </Button>
    </div>
  );
};

export function LoginModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>وارد شوید</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>ورود به حساب کاربری</DialogTitle>
            <DialogDescription>
              برای دسترسی به داشبورد وارد حساب کاربری خود شوید
            </DialogDescription>
          </DialogHeader>
          <OAuth />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>وارد شوید</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>ورود به حساب کاربری</DrawerTitle>
          <DrawerDescription>
            برای دسترسی به داشبورد وارد حساب کاربری خود شوید
          </DrawerDescription>
        </DrawerHeader>
        <section className="p-4">
          <OAuth />
        </section>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
