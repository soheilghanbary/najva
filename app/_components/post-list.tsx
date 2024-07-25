'use client';
import { Avatar } from '@/components/avatar';
import { LoadingIcon } from '@/components/icons';
import { useAllPosts } from '@/hooks/use-post';
import { currentNow } from '@/lib/utils';
import type { PostProps } from '@/types';
import { HeartIcon, MessageCircleIcon, RefreshCwIcon } from 'lucide-react';

export function PostList() {
  const { data: posts, isPending } = useAllPosts();
  if (isPending && !posts)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );
  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}

const PostCard = (post: PostProps) => (
  <div className="flex items-start gap-3 border-b p-4">
    <Avatar alt="post alt" src={post.user.image} />
    <section className="w-full space-y-2">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-bold text-sm">{post.user.name}</h4>
        <p className="text-muted-foreground text-xs tracking-wider">
          {currentNow(post.createdAt)}
        </p>
      </div>
      <div id="content" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="float-end flex items-center gap-6">
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground text-sm"
        >
          344
          <HeartIcon className="size-4 text-destructive" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground text-sm"
        >
          5
          <MessageCircleIcon className="size-4 text-sky-500" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground text-sm"
        >
          11
          <RefreshCwIcon className="size-4 text-teal-500" />
        </button>
      </div>
    </section>
  </div>
);
