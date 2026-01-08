'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, MoreHorizontal, Pencil, Trash2, IndianRupee } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';


type LoanCardProps = {
  loan: Loan;
};

const statusConfig: Record<LoanStatus, { className: string; color: string }> = {
  'On Track': { 
    className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800',
    color: 'hsl(var(--chart-1))'
  },
  'Due Soon': {
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800',
    color: 'hsl(var(--chart-2))'
  },
  'Overdue': {
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800',
    color: 'hsl(var(--chart-3))'
  },
};


export default function LoanCard({ loan }: LoanCardProps) {
  const { setEditingLoan, deleteLoan, isDemoMode, makePayment } = useLoanContext();
  const [isReminderDialogOpen, setReminderDialogOpen] = useState(false);

  const { status } = getLoanStatus(loan);
  const remainingBalance = calculateRemainingBalance(loan);
  const completionPercentage = calculateCompletionPercentage(loan);
  const config = statusConfig[status];
  
  const isPaidOff = loan.paidMonths >= loan.tenure;

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold font-headline">{loan.name}</CardTitle>
                 <div className="flex items-center gap-2">
                    <Badge className={config.className}>{isPaidOff ? 'Completed' : status}</Badge>
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
        <CardContent className="flex-grow space-y-4">
            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly EMI</span>
                    <span className="font-medium text-foreground">{formatCurrency(loan.emi)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Months Paid</span>
                    <span className="font-medium text-foreground">{loan.paidMonths} / {loan.tenure}</span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Balance Left</span>
                    <span className="text-foreground">{formatCurrency(remainingBalance)}</span>
                </div>
            </div>
            <div className="space-y-2">
                <Progress value={completionPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{isPaidOff ? 'Paid Off!' : 'Repayment Progress'}</span>
                    <span>{completionPercentage.toFixed(0)}%</span>
                </div>
            </div>
        </CardContent>
        <CardFooter className="bg-secondary/50 p-3 flex justify-between items-center mt-auto">
             <Button variant="ghost" size="sm" onClick={() => setReminderDialogOpen(true)} disabled={isPaidOff}>
                <Bell className="mr-2 h-4 w-4 text-primary" />
                Smart Alerts
            </Button>
            <Button size="sm" onClick={() => makePayment(loan.id)} disabled={isPaidOff}>
                <IndianRupee className="mr-2 h-4 w-4" />
                Pay EMI
            </Button>
        </CardFooter>
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
