import { LikedPostList, PostList } from '@/app/_components/post-list';
import { UserProfile } from '@/app/_components/user-profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default () => (
  <section className="p-4">
    <UserProfile />
    <Tabs defaultValue="posts" dir="rtl">
      <TabsList>
        <TabsTrigger value="posts">پست ها</TabsTrigger>
        <TabsTrigger value="likes">پسندیده ها</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <PostList />
      </TabsContent>
      <TabsContent value="likes">
        <LikedPostList />
      </TabsContent>
    </Tabs>
  </section>
);
