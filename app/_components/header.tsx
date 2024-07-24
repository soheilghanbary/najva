import { ModeToggle } from '@/components/mode-toggle';
import { getUserSession } from '@/server/lib/auth';
import Link from 'next/link';
import { LoginModal } from './login-modal';
import { NavLinks } from './nav-links';
import { NewSiteModal } from './new-site-modal';
import { SearchBox } from './search-box';

export async function Header() {
  const user = await getUserSession();
  return (
    <header className="sticky top-0 z-50 border-border/50 border-b bg-background/85 p-4 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between gap-3">
        <Link href={'/'} className="font-black text-primary">
          <h6>فولیوهاب</h6>
        </Link>
        <NavLinks />
        <div className="flex items-center justify-end gap-4">
          <SearchBox />
          <ModeToggle />
          {user ? <NewSiteModal /> : <LoginModal />}
        </div>
      </nav>
    </header>
  );
}
