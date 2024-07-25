import type { Post, Prisma, Site, User } from "@prisma/client";

type NavLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type SiteProps = Site & {
  user: User;
};

type PostProps = Post & Prisma.PostGetPayload<{ include: { user: true } }>;
