'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a user's loan portfolio.
 *
 * - analyzeLoans - A function that provides financial analysis of a user's loans.
 * - LoanAnalysisInput - The input type for the analyzeLoans function.
 * - LoanAnalysisOutput - The return type for the analyzeLoans function.
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
  imageUrl: z.string().optional(),
});

export const LoanAnalysisInputSchema = z.object({
  loans: z.array(LoanSchema),
});
export type LoanAnalysisInput = z.infer<typeof LoanAnalysisInputSchema>;

export const LoanAnalysisOutputSchema = z.object({
  overallSummary: z.string().describe("A brief, two-sentence summary of the user's overall loan situation."),
  keyObservations: z.array(z.string()).describe('A list of 2-3 most important observations about the loan portfolio (e.g., highest interest rate, total debt).'),
  recommendations: z.array(z.string()).describe('A list of 2-3 actionable recommendations for the user (e.g., which loan to prioritize, potential savings).'),
});
export type LoanAnalysisOutput = z.infer<typeof LoanAnalysisOutputSchema>;


export async function analyzeLoans(
  input: LoanAnalysisInput
): Promise<LoanAnalysisOutput> {
  return loanAnalysisFlow(input);
}

const loanAnalysisPrompt = ai.definePrompt({
  name: 'loanAnalysisPrompt',
  input: { schema: LoanAnalysisInputSchema },
  output: { schema: LoanAnalysisOutputSchema },
  prompt: `You are an expert financial advisor AI. Analyze the user's loan portfolio provided below.

  Loan Portfolio:
  {{{json loans}}}

  Your task is to provide a clear, concise, and helpful analysis for the user. Focus on the most critical information that will help them understand their financial position and make better decisions.

  Generate the following:
  1.  **Overall Summary**: A brief, two-sentence summary of the user's overall loan situation.
  2.  **Key Observations**: A list of the 2-3 most important, insightful observations. Examples: "Your total remaining debt is X.", "Your car loan has the highest interest rate at Y%."
  3.  **Recommendations**: A list of 2-3 actionable recommendations. Be specific. Examples: "Consider making extra payments on your high-interest personal loan to save over ₹X in the long run.", "Your home loan is on track, keep up the regular payments."

  Keep your language simple, encouraging, and easy to understand.
  `,
});

const loanAnalysisFlow = ai.defineFlow(
  {
    name: 'loanAnalysisFlow',
    inputSchema: LoanAnalysisInputSchema,
    outputSchema: LoanAnalysisOutputSchema,
  },
  async input => {
    if (input.loans.length === 0) {
        return {
            overallSummary: "You don't have any active loans being tracked. Add a loan to get started with AI analysis.",
            keyObservations: [],
            recommendations: [],
        }
    }
    const { output } = await loanAnalysisPrompt(input);
    return output!;
  }
);
