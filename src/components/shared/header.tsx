import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { UserNav } from '@/components/auth/user-nav';
import { DemoModeToggle } from '../dashboard/demo-mode-toggle';

export default function Header() {

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold font-headline text-lg">
              LoanTrack AI
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DemoModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
