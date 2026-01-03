import { Loan } from './types';

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
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob3VzZXxlbnwwfHx8fDE3NjgxODkyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXJ8ZW58MHx8fHwxNzY4MTg5MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZ3JhZHVhdGlvbnxlbnwwfHx8fDE3NjgxODkzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];
