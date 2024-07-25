'use client';
import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAddPost } from '@/hooks/use-post';
import { RocketIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function NewPost() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('<p>hello from parent!</p>');
  const addPost = useAddPost();
  const onSubmit = () => {
    addPost.mutate(content, {
      onSuccess() {
        setOpen(false);
        toast.success('پست جدید ثبت شد');
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-8 h-12 w-full rounded-full bg-gradient-to-l from-blue-600 to-indigo-500 font-bold text-white">
          <RocketIcon className="ml-2 size-5" />
          پست جدید
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>پست جدید</DialogTitle>
        </DialogHeader>
        <Tiptap content={content} setContent={setContent} onClick={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
