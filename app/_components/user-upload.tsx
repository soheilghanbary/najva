'use client';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/hooks/use-user';
import { uploadImage } from '@/lib/upload';
import { UploadCloudIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function UploadImage({ initialPath }: { initialPath: string }) {
  const { mutateAsync, isPending } = useUser().updateUser;
  const [path, setPath] = useState(initialPath);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    setPath(URL.createObjectURL(acceptedFiles[0]));
    const upload = await uploadImage(acceptedFiles[0]);
    await mutateAsync({ image: upload.Location });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="flex items-center gap-4">
      <Avatar src={path} alt="" className="size-20 shadow-sm" />
      <Button
        size={'sm'}
        disabled={isPending}
        variant={'outline'}
        {...getRootProps()}
      >
        <input type="hidden" {...getInputProps()} />
        <UploadCloudIcon className="ml-2 size-4" />
        آپلود تصویر
      </Button>
    </div>
  );
}

export const UserUpload = () => {
  const { data: user, isPending } = useUser().getUser;
  if (isPending)
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="size-20 rounded-full" />
        <Skeleton className="h-[32px] w-[105px] rounded-md" />
      </div>
    );
  return <UploadImage initialPath={user?.image || ''} />;
};
