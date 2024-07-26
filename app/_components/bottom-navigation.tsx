'use client';
import { navLinks } from '@/config/nav-links';
import { cn } from '@/lib/utils';
import type { NavLinkProps } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNavigation() {
  return (
    <section className="fixed bottom-0 left-0 z-50 grid w-full grid-cols-5 border-t bg-background/85 backdrop-blur">
      {navLinks.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
    </section>
  );
}

const NavLink = ({ href, icon: Icon }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center rounded-md p-3 font-medium text-foreground/75 text-sm duration-100 md:hidden',
        isActive && 'text-primary',
      )}
    >
      <Icon className="size-5" />
    </Link>
  );
};
