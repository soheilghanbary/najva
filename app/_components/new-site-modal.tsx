'use client';
import { TextField } from '@/components/text-field';
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
import { Label } from '@/components/ui/label';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSite } from '@/hooks/use-site';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgePlusIcon, UploadCloudIcon } from 'lucide-react';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function NewSiteModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const onClose = () => setOpen(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full">
            <BadgePlusIcon className="ml-2 size-4" />
            سایت جدید
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>افزودن سایت جدید</DialogTitle>
            <DialogDescription>
              ایجاد سایت جدید و افزودن به لیست سایت ها.
            </DialogDescription>
          </DialogHeader>
          <SiteForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-full">
          <BadgePlusIcon className="ml-2 size-4" />
          سایت جدید
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>افزودن سایت جدید</DrawerTitle>
          <DrawerDescription>
            ایجاد سایت جدید و افزودن به لیست سایت ها.
          </DrawerDescription>
        </DrawerHeader>
        <SiteForm onClose={onClose} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const siteSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

type SiteSchema = z.infer<typeof siteSchema>;

function SiteForm({ onClose }: { onClose: () => void }) {
  const [file, setFile] = React.useState<File | any>();
  const { register, handleSubmit, setValue } = useForm<SiteSchema>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  });
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const { mutateAsync, isPending } = useSite().addSite;

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({ ...data, file });
    toast.success('سایت با موفقیت افزوده شد.');
    onClose();
  });

  return (
    <form onSubmit={onSubmit} className={'grid items-start gap-4 px-4 md:px-0'}>
      <Label>تصویر وبسایت</Label>
      {file ? (
        <div
          {...getRootProps()}
          className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-md border shadow-sm duration-150 hover:bg-muted/40 active:scale-95"
        >
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="size-full rounded-[inherit] object-contain"
          />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-md border shadow-sm duration-150 hover:bg-muted/40 active:scale-95"
        >
          <input type="hidden" {...getInputProps()} />
          <UploadCloudIcon />
          <p className="text-center font-medium text-sm">آپلود عکس از وبسایت</p>
        </div>
      )}
      <TextField label="نام وبسایت" {...register('name')} />
      <TextField label="آدرس وبسایت" {...register('url')} />
      <Button disabled={isPending} type="submit" className="w-fit">
        افزودن
      </Button>
    </form>
  );
}
