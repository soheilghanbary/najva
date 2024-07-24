import type { Site, User } from "@prisma/client";

type NavLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type SiteProps = Site & {
  user: User;
};
