'use client';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant={'outline'}
      size={'icon'}
      className="rounded-full"
    >
      <ArrowRightIcon className="size-5" />
    </Button>
  );
}
