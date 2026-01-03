'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLoanContext } from '@/contexts/loan-context';
import { useEffect } from 'react';

const loanSchema = z.object({
  name: z.string().min(2, { message: 'Loan name is required.' }),
  principal: z.coerce.number().positive({ message: 'Principal must be positive.' }),
  interestRate: z.coerce.number().min(0, { message: 'Interest rate cannot be negative.' }),
  emi: z.coerce.number().positive({ message: 'EMI must be positive.' }),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  tenure: z.coerce.number().int().positive({ message: 'Tenure must be a positive number of months.' }),
  paidMonths: z.coerce.number().int().min(0, { message: 'Paid months cannot be negative.' }),
});

export default function AddEditLoanSheet() {
  const { isSheetOpen, setSheetOpen, editingLoan, addLoan, updateLoan } = useLoanContext();

  const form = useForm<z.infer<typeof loanSchema>>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      name: '',
      principal: 0,
      interestRate: 0,
      emi: 0,
      startDate: new Date().toISOString().split('T')[0],
      tenure: 0,
      paidMonths: 0,
    },
  });

  useEffect(() => {
    if (editingLoan) {
      form.reset({
        ...editingLoan,
        startDate: new Date(editingLoan.startDate).toISOString().split('T')[0],
      });
    } else {
      form.reset({
        name: '',
        principal: 0,
        interestRate: 0,
        emi: 0,
        startDate: new Date().toISOString().split('T')[0],
        tenure: 0,
        paidMonths: 0,
      });
    }
  }, [editingLoan, form]);

  const onSubmit = (values: z.infer<typeof loanSchema>) => {
    if (editingLoan) {
      updateLoan({ ...editingLoan, ...values });
    } else {
      addLoan(values);
    }
    setSheetOpen(false);
  };
  
  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{editingLoan ? 'Edit Loan' : 'Add New Loan'}</SheetTitle>
          <SheetDescription>
            {editingLoan ? 'Update the details of your existing loan.' : 'Enter the details of your new loan to start tracking.'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-8">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Loan Name</FormLabel><FormControl><Input placeholder="e.g., Home Loan" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="principal" render={({ field }) => (
                    <FormItem><FormLabel>Principal Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="interestRate" render={({ field }) => (
                    <FormItem><FormLabel>Interest Rate (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
             <FormField control={form.control} name="emi" render={({ field }) => (
                <FormItem><FormLabel>EMI Amount</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <div className="grid grid-cols-2 gap-4">
                 <FormField control={form.control} name="startDate" render={({ field }) => (
                    <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="tenure" render={({ field }) => (
                    <FormItem><FormLabel>Tenure (Months)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
             <FormField control={form.control} name="paidMonths" render={({ field }) => (
                <FormItem><FormLabel>Months Already Paid</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <SheetFooter className="pt-4">
                <Button type="submit">{editingLoan ? 'Save Changes' : 'Add Loan'}</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
