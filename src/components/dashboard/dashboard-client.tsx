'use client';

import { MotionDiv } from '@/components/shared/motion-div';
import AddEditLoanSheet from './add-edit-loan-sheet';
import AiAnalysis from './ai-analysis';
import Charts from './charts';
import LoanList from './loan-list';
import StatsCards from './stats-cards';

export default function DashboardClient() {

  return (
    <div className="flex flex-col gap-8">
      <MotionDiv>
        <StatsCards />
      </MotionDiv>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <LoanList />
        </div >
        <MotionDiv className="lg:col-span-1 flex flex-col gap-8" delay={0.2}>
          <AiAnalysis />
          <Charts />
        </MotionDiv>
      </div>

      <AddEditLoanSheet />
    </div>
  );
}
