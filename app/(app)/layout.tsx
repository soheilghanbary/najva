import type { PropsWithChildren } from 'react';
import { SecondarySidebar } from '../_components/secondary-sidebar';
import { Sidebar } from '../_components/sidebar';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <section className="container mx-auto flex">
      <Sidebar />
      <main className="h-dvh flex-1 border-x p-4">{children}</main>
      <SecondarySidebar />
    </section>
  );
}
