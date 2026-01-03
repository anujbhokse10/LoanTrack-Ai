export interface Loan {
  id: string;
  userId: string;
  name: string;
  principal: number;
  interestRate: number;
  emi: number;
  startDate: string; // ISO string
  tenure: number; // in months
  paidMonths: number;
}

export type LoanStatus = 'On Track' | 'Due Soon' | 'Overdue';

export interface PaymentRecord {
  id: string;
  loanId: string;
  loanName: string;
  amount: number;
  paymentDate: string; // ISO string
}
