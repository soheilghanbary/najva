'use client';
import { Avatar } from '@/components/avatar';
import { LoadingIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSite } from '@/hooks/use-site';
import type { SiteProps } from '@/types';
import { HeartIcon, Link2Icon } from 'lucide-react';

export const SiteLikedList = () => {
  const { data: sites, isPending } = useSite().getAll;
  if (isPending)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sites?.map((site) => (
        <SiteCard key={site.id} {...site} />
      ))}
    </div>
  );
};

export function SiteList() {
  const { data: sites, isPending } = useSite().getAll;
  if (isPending)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sites?.map((site) => (
        <SiteCard key={site.id} {...site} />
      ))}
    </div>
  );
}

const SiteCard = (site: SiteProps) => (
  <div className="rounded-lg border">
    <img className="rounded-t-lg" alt={site.name} src={site.image} />
    <div className="p-3">
      <h2 className="font-semibold">{site.name}</h2>
      <Separator className="my-2 bg-border/40" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar alt={site.user.name} src={site.user.image} />
          <p className="font-medium text-foreground/85 text-xs lg:text-sm">
            {site.user.name}
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <p className="hidden font-medium text-foreground/85 text-xs">344</p>
          <SiteLikeButton siteId={site.id} />
          <Button asChild variant={'outline'} size={'icon'}>
            <a target="_blank" href={site.url} rel="noreferrer">
              <Link2Icon className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const SiteLikeButton = ({ siteId }: { siteId: string }) => {
  const { mutate, isPending } = useSite().toggleLike;
  const handleLike = () => mutate(siteId);
  return (
    <Button
      onClick={handleLike}
      disabled={isPending}
      variant={'outline'}
      size={'icon'}
    >
      <HeartIcon className="size-4 text-primary" />
    </Button>
  );
};
