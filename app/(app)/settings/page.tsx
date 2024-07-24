import { BackButton } from '@/app/_components/back-button';
import { SignOutButton } from '@/app/_components/signout-button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  BadgeCheckIcon,
  type LucideIcon,
  UserPenIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';

type MenuLink = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export default () => {
  return (
    <div className="mx-auto grid max-w-md gap-2 p-4">
      <header className="mb-4 flex items-center gap-4">
        <BackButton />
        <h1 className="font-bold text-foreground text-xl">تنظیمات</h1>
      </header>
      <MenuLink
        href="/settings/account"
        label="ویرایش حساب کاربری"
        icon={UserPenIcon}
      />
      <MenuLink
        href="/settings/about"
        label="درباره فولیوهاب"
        icon={BadgeCheckIcon}
      />
      <MenuLink href="/settings/about" label="پشتیبانی" icon={UsersIcon} />
      <Separator className="bg-border/40" />
      <SignOutButton />
    </div>
  );
};

const MenuLink = ({ href, icon: Icon, label }: MenuLink) => (
  <Link
    href={href}
    className="flex items-center gap-3 rounded-md p-3 text-foreground/75 duration-150 hover:bg-muted/50 hover:text-foreground dark:hover:bg-muted/40"
  >
    <Icon className="size-5" />
    <p className="flex-1 font-medium text-sm">{label}</p>
    <ArrowLeft className="size-4" />
  </Link>
);
