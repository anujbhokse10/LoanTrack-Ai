'use client';

import { useLoanContext } from '@/contexts/loan-context';
import LoanCard from './loan-card';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import { MotionDiv } from '../shared/motion-div';

export default function LoanList() {
  const { loans, setSheetOpen } = useLoanContext();

  if (loans.length === 0) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>No Loans Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Get started by adding your first loan.</p>
          <Button onClick={() => setSheetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Loan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-headline tracking-tight">Your Loans</h2>
         <Button onClick={() => setSheetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Loan
          </Button>
      </div>
      <div className="flex flex-col gap-4">
        {loans.map((loan, index) => (
           <MotionDiv key={loan.id} delay={index * 0.1}>
             <LoanCard loan={loan} />
           </MotionDiv>
        ))}
      </div>
    </div>
  );
}
