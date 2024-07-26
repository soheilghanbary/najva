'use client';
import { useLikePost } from '@/hooks/use-post';
import { HeartIcon } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  postId: string;
  likes: number;
};

export const PostLikeButton = ({ postId, likes }: Props) => {
  const { mutate, isPending } = useLikePost();
  const onSubmit = () => {
    mutate(postId, {
      onSuccess: () => {
        toast.success('Post Liked!');
      },
    });
  };
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 text-muted-foreground text-sm"
      disabled={isPending}
      onClick={onSubmit}
    >
      {likes}
      <HeartIcon className="size-4 text-destructive" />
    </button>
  );
};
