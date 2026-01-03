'use server';

/**
 * @fileOverview This file defines a Genkit flow for a conversational AI financial advisor.
 *
 * - chatWithAdvisor - A function that provides conversational financial analysis.
 * - ChatWithAdvisorInput - The input type for the chatWithAdvisor function.
 * - ChatWithAdvisorOutput - The return type for the chatWithAdvisor function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Loan } from '@/lib/types';

const LoanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  principal: z.number(),
  interestRate: z.number(),
  emi: z.number(),
  startDate: z.string(),
  tenure: z.number(),
  paidMonths: z.number(),
});

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatWithAdvisorInputSchema = z.object({
  loans: z.array(LoanSchema),
  messages: z.array(MessageSchema),
});
export type ChatWithAdvisorInput = z.infer<typeof ChatWithAdvisorInputSchema>;

const ChatWithAdvisorOutputSchema = z.object({
  content: z.string().describe("The AI's response to the user's message."),
});
export type ChatWithAdvisorOutput = z.infer<typeof ChatWithAdvisorOutputSchema>;

export async function chatWithAdvisor(
  input: ChatWithAdvisorInput
): Promise<ChatWithAdvisorOutput> {
  return financialChatFlow(input);
}

const financialChatPrompt = ai.definePrompt({
  name: 'financialChatPrompt',
  input: { schema: ChatWithAdvisorInputSchema },
  output: { schema: ChatWithAdvisorOutputSchema },
  prompt: `You are an expert financial advisor AI. Your role is to answer questions and provide advice based on the user's loan portfolio.

You are having a conversation with a user. Use the message history to understand the context of their questions.

Here is the user's current loan portfolio:
{{{json loans}}}

Here is the conversation history so far:
{{#each messages}}
- {{role}}: {{content}}
{{/each}}

Based on the portfolio and the conversation, provide a helpful and concise answer to the user's latest message.
If you are starting the conversation, provide a brief, two-sentence summary of the user's overall loan situation as your opening message.
`,
});

const financialChatFlow = ai.defineFlow(
  {
    name: 'financialChatFlow',
    inputSchema: ChatWithAdvisorInputSchema,
    outputSchema: ChatWithAdvisorOutputSchema,
  },
  async input => {
    if (input.loans.length === 0) {
      return {
        content: "You don't have any active loans being tracked. Add a loan to get started with AI analysis.",
      };
    }
    const { output } = await financialChatPrompt(input);
    return { content: output!.content };
  }
);
