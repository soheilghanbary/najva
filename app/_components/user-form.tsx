'use client';
import { LoadingIcon } from '@/components/icons';
import { TextField } from '@/components/text-field';
import { TextFieldArea } from '@/components/textarea';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'نام و نام خانوادگی الزامی است'),
  bio: z.string().min(1, 'بیوگرافی الزامی است'),
});

type FormSchema = z.infer<typeof formSchema>;

function UpdateForm(props: FormSchema) {
  const { mutateAsync, isPending } = useUser().updateUser;
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: props,
  });
  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <TextField label="نام و نام خانوادگی" {...register('name')} />
      <TextFieldArea label="بیوگرافی" {...register('bio')} />
      <Button disabled={isPending} className="w-fit" type="submit">
        ذخیره
      </Button>
    </form>
  );
}

export function UserForm() {
  const { data: user, isPending } = useUser().getUser;
  if (isPending)
    return (
      <div className="flex h-60 items-center justify-center fill-primary">
        <LoadingIcon />
      </div>
    );
  return <UpdateForm bio={user.bio} name={user.name} />;
}
