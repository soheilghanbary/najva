'use client';
import { cn } from '@/lib/utils';
import type { NavLinkProps } from '@/types';
import { HomeIcon, LayoutGridIcon, PieChart, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, icon: Icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center rounded-md px-3 py-2 font-medium text-foreground/75 text-sm duration-150 hover:bg-muted/60 hover:text-foreground',
        isActive && 'bg-muted/60 text-foreground',
      )}
    >
      <Icon className="ml-2 size-4" />
      {label}
    </Link>
  );
};

export const NavLinks = () => {
  return (
    <div className="hidden flex-1 items-center gap-2 md:flex">
      <NavLink href="/" label="خانه" icon={HomeIcon} />
      <NavLink href="/sites" label="سایت ها" icon={LayoutGridIcon} />
      <NavLink href="/dashboard" label="داشبورد" icon={PieChart} />
      <NavLink href="/settings" label="تنظیمات" icon={SettingsIcon} />
    </div>
  );
};
