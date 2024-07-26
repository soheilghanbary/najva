'use client';
import { Avatar } from '@/components/avatar';
import { LoadingIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useGetUser } from '@/hooks/use-user';
import Link from 'next/link';
import { BackButton } from './back-button';

export function UserProfile() {
  const { data: user, isPending } = useGetUser();
  if (isPending)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );
  return (
    <section className="mb-2">
      <header className="mb-4 flex items-center gap-4">
        <BackButton />
        <h1 className="font-bold text-foreground text-xl">پروفایل</h1>
      </header>
      <div className="flex items-center gap-4">
        <Avatar alt="" src={user.image} className="size-24" />
        <div className="flex w-full items-center justify-between">
          <h2 className="font-semibold">{user.name}</h2>
          <Button asChild variant={'outline'} size={'sm'}>
            <Link href={'settings/account'}>ویرایش پروفایل</Link>
          </Button>
        </div>
      </div>
      <p className="mt-2 text-sm/6">{user.bio}</p>
    </section>
  );
}
