import { siteConfig } from '@/config/site';
import { SiteList } from './_components/site-list';

export default () => (
  <section className="p-4">
    <div className="mx-auto grid max-w-lg gap-4">
      <h1 className="text-center font-black text-2xl/relaxed text-foreground lg:text-4xl">
        {siteConfig.name}
      </h1>
      <p className="mb-8 text-center text-foreground/80 text-sm/8 lg:text-base/8">
        {siteConfig.description} 🚀
      </p>
    </div>
    <SiteList />
  </section>
);
