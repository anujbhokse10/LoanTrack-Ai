'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { Loan, LoanStatus } from '@/lib/types';
import {
  formatCurrency,
  getLoanStatus,
  calculateRemainingBalance,
  calculateCompletionPercentage,
} from '@/lib/utils';
import { useLoanContext } from '@/contexts/loan-context';
import { useState } from 'react';
import SmartReminderDialog from './smart-reminder-dialog';
import Image from 'next/image';

type LoanCardProps = {
  loan: Loan;
};

const statusColors: Record<LoanStatus, string> = {
  'On Track': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800',
  'Due Soon': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800',
  'Overdue': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800',
};

export default function LoanCard({ loan }: LoanCardProps) {
  const { setEditingLoan, deleteLoan, isDemoMode } = useLoanContext();
  const [isReminderDialogOpen, setReminderDialogOpen] = useState(false);

  const { status, days } = getLoanStatus(loan);
  const remainingBalance = calculateRemainingBalance(loan);
  const completionPercentage = calculateCompletionPercentage(loan);

  const getStatusText = () => {
    switch (status) {
      case 'Overdue':
        return `Overdue by ${days} day${days > 1 ? 's' : ''}`;
      case 'Due Soon':
        return `Due in ${days} day${days > 1 ? 's' : ''}`;
      default:
        return 'On Track';
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row overflow-hidden">
        {loan.imageUrl && (
           <div className="relative h-48 md:h-auto md:w-1/3">
             <Image 
                src={loan.imageUrl} 
                alt={loan.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
             />
           </div>
        )}
        <div className="flex flex-col flex-grow">
            <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                <CardTitle className="text-xl">{loan.name}</CardTitle>
                <CardDescription>
                    EMI: {formatCurrency(loan.emi)}/month
                </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                <Badge className={statusColors[status]}>{status}</Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isDemoMode}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Loan options</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setEditingLoan(loan)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => deleteLoan(loan.id)} className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
            <div>
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Progress</span>
                <span>
                    {loan.paidMonths} / {loan.tenure} months
                </span>
                </div>
                <Progress value={completionPercentage} aria-label={`${completionPercentage.toFixed(0)}% paid`} />
            </div>
            <div className="flex justify-between items-center text-sm">
                <div className="text-muted-foreground">
                Remaining:{' '}
                <span className="font-bold text-foreground">
                    {formatCurrency(remainingBalance)}
                </span>
                </div>
                <div className="text-muted-foreground">
                {getStatusText()}
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex justify-start">
                <Button variant="outline" size="sm" onClick={() => setReminderDialogOpen(true)}>
                    <Bell className="mr-2 h-4 w-4" />
                    Smart Alerts
                </Button>
            </CardFooter>
        </div>
      </Card>
      <SmartReminderDialog
        loan={loan}
        status={status}
        open={isReminderDialogOpen}
        onOpenChange={setReminderDialogOpen}
      />
    </>
  );
}
