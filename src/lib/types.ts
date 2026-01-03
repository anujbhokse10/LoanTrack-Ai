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
  imageUrl?: string;
}

export type LoanStatus = 'On Track' | 'Due Soon' | 'Overdue';
