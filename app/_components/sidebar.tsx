'use client';
import { LogoIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  BellIcon,
  HomeIcon,
  type LucideIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NewPost } from './new-post';

export const Sidebar = () => (
  <aside className="sticky top-0 h-dvh w-64 px-4 py-2">
    <LogoIcon className="mr-2 mb-4 size-10" />
    <nav className="grid gap-2">
      <SidebarLink href="/home" label="خانه" icon={HomeIcon} />
      <SidebarLink href="/search" label="جستجو" icon={SearchIcon} />
      <SidebarLink href="/notifications" label="اعلانات" icon={BellIcon} />
      <SidebarLink href="/profile" label="پروفایل کاربری" icon={UserIcon} />
      <SidebarLink href="/settings" label="تنظیمات" icon={SettingsIcon} />
    </nav>
    <NewPost />
  </aside>
);

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const SidebarLink = ({ href, label, icon: Icon }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-4 rounded-xl px-3.5 py-2.5 text-muted-foreground duration-150 hover:text-foreground',
        {
          'bg-muted text-foreground': isActive,
        },
      )}
    >
      <Icon className="size-5 lg:size-6" />
      <p className="font-semibold lg:text-lg">{label}</p>
    </Link>
  );
};
