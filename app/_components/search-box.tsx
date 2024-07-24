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
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSite } from '@/hooks/use-site';
import type { SiteProps } from '@/types';
import { Link2Icon, SearchIcon } from 'lucide-react';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function SearchBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // add key when click crtl + j open
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'j') {
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full" variant={'outline'} size={'icon'}>
            <SearchIcon className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>جستجوی سایت</DialogTitle>
            <DialogDescription>جستجو بر اساس نام و آدرس سایت</DialogDescription>
          </DialogHeader>
          <SearchForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-full" variant={'outline'} size={'icon'}>
          <SearchIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[65%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>جستجوی سایت</DrawerTitle>
          <DrawerDescription>جستجو بر اساس نام و آدرس سایت</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <SearchForm />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SearchForm({ className }: React.ComponentProps<'form'>) {
  const [sites, setSites] = React.useState<SiteProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { mutate } = useSite().searchSite;
  // Debounce callback
  const debounced = useDebouncedCallback((q: string) => {
    mutate(q, {
      onSuccess(res) {
        setSites(res);
        setLoading(false);
      },
    });
  }, 1000);

  return (
    <section className="space-y-4">
      <div className="relative flex items-center">
        <Input
          type="text"
          className="pr-[34px]"
          defaultValue={''}
          onChange={(e) => {
            setLoading(true);
            debounced(e.target.value);
          }}
        />
        <SearchIcon className="-translate-y-1/2 absolute top-1/2 right-2.5 size-4 text-muted-foreground" />
      </div>
      <div className="grid gap-4">
        {loading ? (
          <>
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </>
        ) : (
          sites.length > 0 &&
          sites.map((site) => (
            <div
              key={site.id}
              className="flex items-center justify-between rounded-md bg-muted/30 p-2"
            >
              <div>
                <p>{site.name}</p>
                <p className="text-foreground/85 text-xs">{site.url}</p>
              </div>
              <Button asChild variant={'outline'} size={'icon'}>
                <a target="_blank" href={site.url} rel="noreferrer">
                  <Link2Icon className="size-4" />
                </a>
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
