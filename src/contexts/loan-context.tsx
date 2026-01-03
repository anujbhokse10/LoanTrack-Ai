'use client';

import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import type { Loan } from '@/lib/types';
import { demoLoans } from '@/lib/demo-data';

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
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [userLoans, setUserLoans] = useState<Loan[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null);

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };
  
  // Use a state for demo loans so we can update images
  const [currentDemoLoans, setCurrentDemoLoans] = useState<Loan[]>(demoLoans);

  const loans = useMemo(() => isDemoMode ? currentDemoLoans : userLoans, [isDemoMode, userLoans, currentDemoLoans]);
  
  const updateLoan = (updatedLoan: Loan) => {
    if (isDemoMode) {
        setCurrentDemoLoans(prev => prev.map(l => l.id === updatedLoan.id ? updatedLoan : l));
    } else {
        setUserLoans(prev => prev.map(l => l.id === updatedLoan.id ? updatedLoan : l));
    }
  };

  const addLoan = (loanData: Omit<Loan, 'id' | 'userId'>) => {
    // In a real app, this would be an API call.
    // For now, we just update local state.
    const newLoan: Loan = {
      ...loanData,
      id: new Date().getTime().toString(),
      userId: 'current-user', // Replace with actual user ID
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
