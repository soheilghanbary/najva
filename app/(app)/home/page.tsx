import { PostList } from '@/app/_components/post-list';

export default () => (
  <section>
    <header className="z-50 flex items-center justify-center gap-4 border-b bg-background/90 p-3 backdrop-blur">
      <h1 className="text-center font-bold text-foreground text-xl">خانه</h1>
    </header>
    <PostList />
  </section>
);
