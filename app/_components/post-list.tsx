'use client';
import { Avatar } from '@/components/avatar';
import { LoadingIcon } from '@/components/icons';
import { useAllPosts, useLikedPosts, useUserPosts } from '@/hooks/use-post';
import { currentNow } from '@/lib/utils';
import type { PostProps } from '@/types';
import { MessageCircleIcon, RefreshCwIcon } from 'lucide-react';
import { PostLikeButton } from './post-like-button';

export function UserPostList() {
  const { data: posts, isPending } = useUserPosts();
  if (isPending && !posts)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );

  if (!posts?.length)
    return <p className="my-8 text-muted-foreground">پستی ننوشتی 😒</p>;

  return posts?.map((post) => <PostCard key={post.id} {...post} />);
}

export function LikedPostList() {
  const { data: posts, isPending } = useLikedPosts();
  if (isPending && !posts)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );
  return posts?.map((post) => <PostCard key={post.id} {...post} />);
}

export function PostList() {
  const { data: posts, isPending } = useAllPosts();
  if (isPending && !posts)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );
  return posts?.map((post) => <PostCard key={post.id} {...post} />);
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
        <PostLikeButton postId={post.id} likes={post.likes.length} />
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
