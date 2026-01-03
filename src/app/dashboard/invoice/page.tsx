'use client';

import AiAnalysis from "@/components/dashboard/ai-analysis";
import { MotionDiv } from "@/components/shared/motion-div";

export default function AiFinancialAdvisorPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold font-headline mb-2">AI Financial Advisor</h1>
            <p className="text-muted-foreground mb-8">
                Get personalized insights and recommendations on your loan portfolio from our AI.
            </p>
            <MotionDiv>
                <AiAnalysis />
            </MotionDiv>
        </div>
    );
}
