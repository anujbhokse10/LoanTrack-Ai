'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Landmark, Calendar, TrendingUp } from 'lucide-react';
import { useLoanContext } from '@/contexts/loan-context';
import { useMemo } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { calculateRemainingBalance, formatCurrency, getNextDueDate } from '@/lib/utils';
import type { Loan } from '@/lib/types';

export default function StatsCards() {
  const { loans } = useLoanContext();

  const stats = useMemo(() => {
    if (loans.length === 0) {
      return {
        totalBalance: 0,
        totalLoans: 0,
        nextEmi: null,
        highestInterestLoan: null,
      };
    }

    const totalBalance = loans.reduce((acc, loan) => acc + calculateRemainingBalance(loan), 0);

    const upcomingEmis = loans
      .map(loan => ({
        ...loan,
        nextDueDate: getNextDueDate(loan.startDate, loan.paidMonths),
      }))
      .filter(loan => loan.paidMonths < loan.tenure) // Filter out completed loans
      .sort((a, b) => a.nextDueDate.getTime() - b.nextDueDate.getTime());
    
    const nextEmi = upcomingEmis[0] || null;

    const highestInterestLoan = [...loans].sort((a,b) => b.interestRate - a.interestRate)[0];

    return {
      totalBalance,
      totalLoans: loans.length,
      nextEmi,
      highestInterestLoan
    };
  }, [loans]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">{formatCurrency(stats.totalBalance)}</div>
          <p className="text-xs text-muted-foreground">Across {stats.totalLoans} loans</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next EMI Due</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           {stats.nextEmi ? (
            <>
              <div className="text-2xl font-bold font-headline">{formatCurrency(stats.nextEmi.emi)}</div>
              <p className="text-xs text-muted-foreground">For {stats.nextEmi.name}, due {formatDistanceToNow(stats.nextEmi.nextDueDate, { addSuffix: true })}</p>
            </>
          ) : (
             <>
              <div className="text-2xl font-bold font-headline">N/A</div>
              <p className="text-xs text-muted-foreground">No active loans</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Highest Interest Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {stats.highestInterestLoan ? (
             <>
              <div className="text-2xl font-bold font-headline">{stats.highestInterestLoan.interestRate.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">{stats.highestInterestLoan.name}</p>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold font-headline">N/A</div>
              <p className="text-xs text-muted-foreground">No active loans</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">{stats.totalLoans}</div>
          <p className="text-xs text-muted-foreground">Currently tracking</p>
        </CardContent>
      </Card>
    </div>
  );
}
