'use client';

import AiChat from "@/components/dashboard/ai-chat";
import { MotionDiv } from "@/components/shared/motion-div";

export default function AiFinancialAdvisorPage() {
    return (
        <div className="flex flex-col h-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline mb-2">AI Financial Advisor</h1>
                <p className="text-muted-foreground">
                    Chat with our AI to get personalized insights and recommendations on your loan portfolio.
                </p>
            </div>
            <MotionDiv className="flex-grow flex flex-col">
                <AiChat />
            </MotionDiv>
        </div>
    );
}
