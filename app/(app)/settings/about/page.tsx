import { siteConfig } from '@/config/site';
import { currentNow } from '@/lib/utils';

export default () => {
  return (
    <section className="mx-auto max-w-md space-y-4 p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-black text-xl">
          درباره پلتفرم <span className="text-primary">{siteConfig.name}</span>
        </h1>
      </div>
      <p className="text-center text-sm/7">{siteConfig.description}</p>
      <ul className="flex flex-col items-center justify-center gap-2 pt-4 font-medium text-sm">
        <li>نسخه: 0.7.1</li>
        <li>بنیان گذار: سهیل قنبری</li>
        <li>ایمیل: soli.ghanbary@gmail.com</li>
        <li>آخرین بروزرسانی: {currentNow()}</li>
      </ul>
    </section>
  );
};
