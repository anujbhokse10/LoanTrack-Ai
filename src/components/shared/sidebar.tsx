'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Banknote,
  Lightbulb,
  CreditCard,
  History,
  Info,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';


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
  
  if (isMobile) {
      return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
            <div className="grid h-16 grid-cols-5">
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
                        <span>{label}</span>
                    </Link>
                ))}
            </div>
        </div>
      )
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background">
      <nav className="flex flex-col gap-2 p-4">
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
    </aside>
  );
}
