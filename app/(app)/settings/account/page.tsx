import { BackButton } from '@/app/_components/back-button';
import { UserForm } from '@/app/_components/user-form';
import { UserUpload } from '@/app/_components/user-upload';

export default async () => {
  return (
    <section className="p-4">
      <header className="mb-4 flex items-center gap-4">
        <BackButton />
        <h1 className="font-bold text-foreground text-xl">
          ویرایش حساب کاربری
        </h1>
      </header>
      <div className="space-y-4 pt-2">
        <UserUpload />
        <UserForm />
      </div>
    </section>
  );
};
