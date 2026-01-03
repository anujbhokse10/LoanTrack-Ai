import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Loan, type LoanStatus } from './types';
import { differenceInDays, parseISO, addMonths } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getNextDueDate(startDate: string, paidMonths: number): Date {
  const start = parseISO(startDate);
  // The first EMI is due one month after the start date.
  // The (paidMonths + 1)-th EMI is due (paidMonths + 1) months after the start date.
  return addMonths(start, paidMonths + 1);
}

export function getLoanStatus(loan: Loan): { status: LoanStatus; days: number } {
  if (loan.paidMonths >= loan.tenure) {
    return { status: 'On Track', days: 999 };
  }
  const nextDueDate = getNextDueDate(loan.startDate, loan.paidMonths);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

  const daysUntilDue = differenceInDays(nextDueDate, today);

  if (daysUntilDue < 0) {
    return { status: 'Overdue', days: Math.abs(daysUntilDue) };
  }
  if (daysUntilDue <= 7) {
    return { status: 'Due Soon', days: daysUntilDue };
  }
  return { status: 'On Track', days: daysUntilDue };
}

export function calculateRemainingBalance(loan: Loan): number {
  const remainingPayments = loan.tenure - loan.paidMonths;
  if (remainingPayments <= 0) {
    return 0;
  }

  if (loan.interestRate === 0) {
    // For zero-interest loans, balance is simply principal minus total paid.
    // Assuming EMI is principal / tenure.
    return Math.max(0, loan.principal - (loan.emi * loan.paidMonths));
  }

  const r = loan.interestRate / 12 / 100; // monthly interest rate
  
  // Calculate remaining balance using the Present Value of an Annuity formula.
  // This calculates the present value of the stream of remaining EMI payments.
  const remainingBalance = loan.emi * ((1 - Math.pow(1 + r, -remainingPayments)) / r);
  
  return Math.max(0, remainingBalance);
}

export function calculateCompletionPercentage(loan: Loan): number {
    if (loan.tenure === 0) return 0;
    return (loan.paidMonths / loan.tenure) * 100;
}
