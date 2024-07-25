import { BackButton } from '@/app/_components/back-button';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeartIcon, MessageCircleIcon, RefreshCwIcon } from 'lucide-react';

export default () => (
  <div>
    <header className="mb-4 flex items-center gap-4">
      <BackButton />
      <h1 className="font-bold text-foreground text-xl">پروفایل</h1>
    </header>
    <div className="flex items-center gap-4">
      <Avatar
        alt=""
        src={'https://avatars.githubusercontent.com/u/98669021?v=4'}
        className="size-24"
      />
      <div className="flex w-full items-center justify-between">
        <h2 className="font-semibold">سهیل قنبری</h2>
        <Button variant={'outline'} size={'sm'}>
          ویرایش پروفایل
        </Button>
      </div>
    </div>
    <p className="my-2 text-sm/6">
      توسعه دهنده فول استک و بنیانگذار نجوا و وبکده 🚀
    </p>
    <Tabs defaultValue="posts" dir="rtl">
      <TabsList className="mb-2">
        <TabsTrigger value="posts">پست ها</TabsTrigger>
        <TabsTrigger value="likes">پسندیده ها</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </TabsContent>
      <TabsContent value="likes">مشاهده پست های لایک شده</TabsContent>
    </Tabs>
  </div>
);

const PostCard = () => (
  <div className="flex items-start gap-2.5 border-b">
    <Avatar
      alt=""
      src={'https://avatars.githubusercontent.com/u/98669021?v=4'}
    />
    <section className="space-y-2">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-bold text-sm">سهیل قنبری</h4>
        <p className="text-muted-foreground text-xs">سه روز پیش</p>
      </div>
      <div>
        <img
          alt=""
          className="rounded-xl"
          src="https://media.wired.com/photos/639bf35a24c352e627eccc43/master/pass/Ragnaro%CC%88k-culture-ar1qdh.jpg"
        />
        <p className="text-sm/8">این یک نمونه پست میباشد</p>
      </div>
      <div className="flex items-center gap-6">
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground text-sm"
        >
          344
          <HeartIcon className="size-4 text-destructive" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground text-sm"
        >
          5
          <MessageCircleIcon className="size-4 text-sky-500" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground text-sm"
        >
          11
          <RefreshCwIcon className="size-4 text-teal-500" />
        </button>
      </div>
    </section>
  </div>
);
