'use client';

import { useLoanContext } from '@/contexts/loan-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { MotionDiv } from '@/components/shared/motion-div';
import { Badge } from '@/components/ui/badge';

export default function HistoryPage() {
  const { paymentHistory } = useLoanContext();

  return (
    <div className="flex flex-col gap-8">
       <MotionDiv>
        <h1 className="text-3xl font-bold font-headline mb-2">Payment History</h1>
        <p className="text-muted-foreground">A detailed log of all your past transactions.</p>
       </MotionDiv>
      
      <MotionDiv delay={0.1}>
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                    You have made {paymentHistory.length} payments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Loan</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentHistory.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground py-10">
                                    No payment history found.
                                </TableCell>
                            </TableRow>
                        )}
                        {paymentHistory.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>
                                    <div className="font-medium">{payment.loanName}</div>
                                </TableCell>
                                <TableCell className="text-right font-medium">{formatCurrency(payment.amount)}</TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    {format(new Date(payment.paymentDate), "dd MMM yyyy, h:mm a")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
       </MotionDiv>
    </div>
  );
}
