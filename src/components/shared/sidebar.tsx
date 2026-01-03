'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Banknote,
  Lightbulb,
  History,
  Info,
  LogOut,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';
import { getFirebase } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/balance', label: 'Your Loans', icon: Banknote },
  { href: '/dashboard/invoice', label: 'AI Financial Advisor', icon: Lightbulb },
  { href: '/dashboard/history', label: 'History', icon: History },
  { href: '/dashboard/details', label: 'About', icon: Info },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleSignOut = async () => {
    const { auth } = getFirebase();
    if (auth) {
      await signOut(auth);
    }
    router.push('/login');
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
        <div className="grid h-16 grid-cols-6">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium',
                pathname === href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only sm:not-sr-only">{label}</span>
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only">Log Out</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background flex flex-col">
      <nav className="flex flex-col gap-2 p-4 flex-grow">
        <TooltipProvider>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname === href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </Button>
      </div>
    </aside>
  );
}
