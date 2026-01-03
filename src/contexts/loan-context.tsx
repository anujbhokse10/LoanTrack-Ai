'use client';

import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import type { Loan, PaymentRecord } from '@/lib/types';
import { demoLoans, demoPaymentHistory } from '@/lib/demo-data';

interface LoanContextType {
  loans: Loan[];
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  isSheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  editingLoan: Loan | null;
  setEditingLoan: (loan: Loan | null) => void;
  addLoan: (loan: Omit<Loan, 'id' | 'userId'>) => void;
  updateLoan: (loan: Loan) => void;
  deleteLoan: (loanId: string) => void;
  paymentHistory: PaymentRecord[];
  makePayment: (loanId: string) => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [userLoans, setUserLoans] = useState<Loan[]>([]);
  const [userPaymentHistory, setUserPaymentHistory] = useState<PaymentRecord[]>([]);

  const [isDemoMode, setIsDemoMode] = useState(true); // Always start in demo mode
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };
  
  const [currentDemoLoans, setCurrentDemoLoans] = useState<Loan[]>(demoLoans);
  const [currentDemoPaymentHistory, setCurrentDemoPaymentHistory] = useState<PaymentRecord[]>(demoPaymentHistory);

  const loans = useMemo(() => isDemoMode ? currentDemoLoans : userLoans, [isDemoMode, userLoans, currentDemoLoans]);
  const paymentHistory = useMemo(() => isDemoMode ? currentDemoPaymentHistory : userPaymentHistory, [isDemoMode, userPaymentHistory, currentDemoPaymentHistory]);
  
  const updateLoan = (updatedLoan: Loan) => {
    const updater = (prev: Loan[]) => prev.map(l => l.id === updatedLoan.id ? updatedLoan : l);
    if (isDemoMode) {
        setCurrentDemoLoans(updater);
    } else {
        setUserLoans(updater);
    }
  };

  const addLoan = (loanData: Omit<Loan, 'id' | 'userId'>) => {
    const newLoan: Loan = {
      ...loanData,
      id: new Date().getTime().toString(),
      userId: 'current-user',
    };
    if (!isDemoMode) {
      setUserLoans(prev => [...prev, newLoan]);
    }
  };

  const deleteLoan = (loanId: string) => {
     if (!isDemoMode) {
       setUserLoans(prev => prev.filter(l => l.id !== loanId));
    }
  };

  const makePayment = (loanId: string) => {
    let paidLoan: Loan | undefined;
    const loanUpdater = (prev: Loan[]) => prev.map(l => {
        if (l.id === loanId && l.paidMonths < l.tenure) {
            paidLoan = l;
            return { ...l, paidMonths: l.paidMonths + 1 };
        }
        return l;
    });

    const historyUpdater = (prev: PaymentRecord[]) => {
      if (!paidLoan) return prev;
      const newPayment: PaymentRecord = {
        id: new Date().getTime().toString(),
        loanId: paidLoan.id,
        loanName: paidLoan.name,
        amount: paidLoan.emi,
        paymentDate: new Date().toISOString(),
      };
      return [newPayment, ...prev];
    };

    if (isDemoMode) {
        setCurrentDemoLoans(loanUpdater);
        setCurrentDemoPaymentHistory(historyUpdater);
    } else {
        setUserLoans(loanUpdater);
        setUserPaymentHistory(historyUpdater);
    }
  };

  const value = {
    loans,
    setLoans: isDemoMode ? setCurrentDemoLoans : setUserLoans,
    isDemoMode,
    toggleDemoMode,
    isSheetOpen,
    setSheetOpen: (open: boolean) => {
        if (!open) setEditingLoan(null);
        setIsSheetOpen(open);
    },
    editingLoan,
    setEditingLoan: (loan: Loan | null) => {
        setEditingLoan(loan);
        setIsSheetOpen(true);
    },
    addLoan,
    updateLoan,
    deleteLoan,
    paymentHistory,
    makePayment,
  };

  return (
    <LoanContext.Provider value={value}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoanContext must be used within a LoanProvider');
  }
  return context;
};
