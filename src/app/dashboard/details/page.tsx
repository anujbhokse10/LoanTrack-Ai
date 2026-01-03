'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MotionDiv } from '@/components/shared/motion-div';
import {
  BarChart,
  Bell,
  Bot,
  CircleDollarSign,
  Contact,
  LayoutDashboard,
  ShieldCheck,
  ToggleRight,
} from 'lucide-react';

const features = [
  {
    icon: <LayoutDashboard className="h-5 w-5 text-primary" />,
    title: 'Unified Dashboard',
    description:
      'Get a complete overview of your financial health. View all your loans, key statistics like total balance and next EMI, all in one place.',
  },
  {
    icon: <CircleDollarSign className="h-5 w-5 text-primary" />,
    title: 'Smart Loan Management',
    description:
      'Easily add, edit, and delete loans. The app automatically calculates your outstanding balances and repayment progress.',
  },
  {
    icon: <Bell className="h-5 w-5 text-primary" />,
    title: 'Intelligent EMI Alerts',
    description:
      'Stay on top of your payments with visual cues. Loans are automatically tagged as "On Track", "Due Soon", or "Overdue" to help you prioritize.',
  },
  {
    icon: <BarChart className="h-5 w-5 text-primary" />,
    title: 'Insightful Data Visualization',
    description:
      'Interactive charts from Recharts provide deep insights into your loan portfolio, including loan distribution and upcoming payment schedules.',
  },
  {
    icon: <Bot className="h-5 w-5 text-primary" />,
    title: 'AI-Powered Assistance',
    description:
      'Leverage our GenAI-powered tools, including a conversational financial advisor and a smart reminder scheduler, to make informed decisions.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: 'Secure Authentication',
    description:
      'Your data is protected with secure sign-up and login powered by Firebase Authentication, including support for Google.',
  },
  {
    icon: <ToggleRight className="h-5 w-5 text-primary" />,
    title: 'Demo Mode',
    description:
      'Instantly populate the app with sample data for a quick and comprehensive demonstration of all its features.',
  },
];

export default function DetailsPage() {
  return (
    <div className="flex flex-col gap-8">
      <MotionDiv>
        <h1 className="text-3xl font-bold font-headline mb-2">About LoanTrack AI</h1>
        <p className="text-muted-foreground">
          A smart loan monitoring and repayment assistant to help you stay on top of your finances.
        </p>
      </MotionDiv>

      <MotionDiv delay={0.1}>
        <Accordion type="single" collapsible className="w-full">
          {features.map((feature, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <span className="font-semibold text-base">{feature.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-8 text-muted-foreground">
                {feature.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MotionDiv>
    </div>
  );
}
