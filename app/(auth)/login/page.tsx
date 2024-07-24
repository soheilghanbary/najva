import { OAuth } from '@/app/_components/oauth';
import { siteConfig } from '@/config/site';
import { getUserSession } from '@/server/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getUserSession();
  if (session) redirect('/home');
  return (
    <section className="flex h-dvh w-dvw flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-center font-black text-3xl">{siteConfig.name}</h1>
        <p className="mb-4 text-center text-sm/6">{siteConfig.description}</p>
        <OAuth />
      </div>
    </section>
  );
}
