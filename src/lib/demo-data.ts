import { Loan, PaymentRecord } from './types';

export const demoLoans: Loan[] = [
  {
    id: '1',
    userId: 'demo-user',
    name: 'Home Loan',
    principal: 5000000,
    interestRate: 8.5,
    emi: 43391,
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)).toISOString(),
    tenure: 240, // 20 years
    paidMonths: 36, // 3 years
  },
  {
    id: '2',
    userId: 'demo-user',
    name: 'Car Loan',
    principal: 800000,
    interestRate: 10,
    emi: 16999,
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
    tenure: 60, // 5 years
    paidMonths: 12, // 1 year
  },
  {
    id: '3',
    userId: 'demo-user',
    name: 'Personal Loan',
    principal: 200000,
    interestRate: 14,
    emi: 9964,
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 10)).toISOString(),
    tenure: 24, // 2 years
    paidMonths: 10,
  },
  {
    id: '4',
    userId: 'demo-user',
    name: 'Student Loan',
    principal: 1200000,
    interestRate: 9.2,
    emi: 15394,
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    tenure: 120, // 10 years
    paidMonths: 1, // Due soon
  },
];


export const demoPaymentHistory: PaymentRecord[] = [
    {
        id: 'p1',
        loanId: '1',
        loanName: 'Home Loan',
        amount: 43391,
        paymentDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
    },
    {
        id: 'p2',
        loanId: '2',
        loanName: 'Car Loan',
        amount: 16999,
        paymentDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
    },
     {
        id: 'p3',
        loanId: '3',
        loanName: 'Personal Loan',
        amount: 9964,
        paymentDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
    },
     {
        id: 'p4',
        loanId: '1',
        loanName: 'Home Loan',
        amount: 43391,
        paymentDate: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString()
    },
];
