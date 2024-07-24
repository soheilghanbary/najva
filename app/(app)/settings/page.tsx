import { BackButton } from '@/app/_components/back-button';
import { SignOutButton } from '@/app/_components/signout-button';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { MagicWandIcon } from '@radix-ui/react-icons';
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
    <div className="grid gap-2">
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
        label="درباره وب اپلیکیشن نجوا"
        icon={BadgeCheckIcon}
      />
      <MenuLink href="/settings/about" label="پشتیبانی" icon={UsersIcon} />
      <div className="flex items-center gap-3 py-4 pr-4 pl-1.5 text-muted-foreground">
        <MagicWandIcon className="size-5" />
        <p className="flex-1 font-medium">تغییر پوسته اپلیکیشن</p>
        <ModeToggle />
      </div>
      <Separator className="bg-border/40" />
      <SignOutButton />
    </div>
  );
};

const MenuLink = ({ href, icon: Icon, label }: MenuLink) => (
  <Link
    href={href}
    className="flex items-center gap-3 rounded-xl p-4 text-muted-foreground duration-100 hover:bg-muted hover:text-foreground dark:hover:bg-muted"
  >
    <Icon className="size-5" />
    <p className="flex-1 font-medium">{label}</p>
    <ArrowLeft className="size-5" />
  </Link>
);
