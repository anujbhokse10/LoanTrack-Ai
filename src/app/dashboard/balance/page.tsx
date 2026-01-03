'use client';

import { MotionDiv } from '@/components/shared/motion-div';
import AddEditLoanSheet from '@/components/dashboard/add-edit-loan-sheet';
import Charts from '@/components/dashboard/charts';
import LoanList from '@/components/dashboard/loan-list';

export default function BalancePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <LoanList />
        </div>
        <MotionDiv className="lg:col-span-1 flex flex-col gap-8" delay={0.2}>
          <Charts />
        </MotionDiv>
      </div>

      <AddEditLoanSheet />
    </div>
  );
}
