import { SiteLikedList, SiteList } from '@/app/_components/site-list';
import { Avatar } from '@/components/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUser } from '@/server/actions/user';

export default async () => {
  const user = await getUser();
  return (
    <section className="space-y-4 p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Avatar src={user?.image!} alt={user?.name!} className="size-20" />
          <div>
            <p className="font-black text-2xl/relaxed">{user?.name}</p>
            <p className="text-foreground/80 text-sm">{user?.email}</p>
          </div>
        </div>
        <p className="text-foreground/85 text-sm/7">{user?.bio}</p>
      </div>
      <Tabs dir="rtl" defaultValue="sites">
        <TabsList className="mb-4">
          <TabsTrigger value="sites">سایت های من</TabsTrigger>
          <TabsTrigger value="likes">پسندیده ها</TabsTrigger>
        </TabsList>
        <TabsContent value="sites">
          <SiteList />
        </TabsContent>
        <TabsContent value="likes">
          <SiteLikedList />
        </TabsContent>
      </Tabs>
    </section>
  );
};
