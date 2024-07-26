'use client';
import { LogoIcon } from '@/components/icons';
import { navLinks } from '@/config/nav-links';
import { cn } from '@/lib/utils';
import type { NavLinkProps } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NewPost } from './new-post-modal';

export const Sidebar = () => (
  <aside className="sticky top-0 hidden h-dvh w-64 px-4 py-2 md:inline">
    <LogoIcon className="mr-2 mb-4 size-10" />
    <nav className="grid gap-2">
      {navLinks.map(({ href, label, icon }, i) => (
        <SidebarLink key={i} href={href} label={label} icon={icon} />
      ))}
    </nav>
    <NewPost />
  </aside>
);

const SidebarLink = ({ href, label, icon: Icon }: NavLinkProps) => {
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
