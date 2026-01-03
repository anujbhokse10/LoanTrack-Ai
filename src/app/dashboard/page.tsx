'use client';

import { MotionDiv } from '@/components/shared/motion-div';
import StatsCards from '@/components/dashboard/stats-cards';
import AddEditLoanSheet from '@/components/dashboard/add-edit-loan-sheet';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <MotionDiv>
        <h1 className="text-3xl font-bold font-headline mb-4">Dashboard Overview</h1>
        <StatsCards />
      </MotionDiv>
      <AddEditLoanSheet />
    </div>
  );
}
