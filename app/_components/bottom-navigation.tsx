'use client';
import { cn } from '@/lib/utils';
import type { NavLinkProps } from '@/types';
import {
  HomeIcon,
  LayoutGridIcon,
  PieChartIcon,
  SettingsIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, icon: Icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center gap-1.5 rounded-md p-2 font-medium text-foreground/75 text-sm duration-100 md:hidden',
        isActive && 'text-primary',
      )}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
};

export function BottomNavigation() {
  return (
    <section className="fixed bottom-0 left-0 z-50 grid w-full grid-cols-4 border-border/50 border-t bg-background/85 backdrop-blur">
      <NavLink href="/" label="خانه" icon={HomeIcon} />
      <NavLink href="/sites" label="سایت ها" icon={LayoutGridIcon} />
      <NavLink href="/dashboard" label="داشبورد" icon={PieChartIcon} />
      <NavLink href="/settings" label="تنظیمات" icon={SettingsIcon} />
    </section>
  );
}
