import type { NavLinkProps } from '@/types';
import {
  BellIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

export const navLinks: NavLinkProps[] = [
  {
    href: '/home',
    label: 'خانه',
    icon: HomeIcon,
  },
  {
    href: '/search',
    label: 'جستجو',
    icon: SearchIcon,
  },
  {
    href: '/notifications',
    label: 'اعلانات',
    icon: BellIcon,
  },
  {
    href: '/profile',
    label: 'پروفایل کاربری',
    icon: UserIcon,
  },
  {
    href: '/settings',
    label: 'تنظیمات',
    icon: SettingsIcon,
  },
];
