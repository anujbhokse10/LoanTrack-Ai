'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligently configuring EMI reminders based on loan details and risk profile.
 *
 * - configureSmartReminder - A function that configures smart EMI reminders.
 * - SmartReminderInput - The input type for the configureSmartReminder function.
 * - SmartReminderOutput - The return type for the configureSmartReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReminderInputSchema = z.object({
  loanName: z.string().describe('The name of the loan.'),
  emiAmount: z.number().describe('The EMI amount for the loan.'),
  dueDate: z.string().describe('The due date of the EMI (ISO format).'),
  riskProfile: z
    .enum(['low', 'medium', 'high'])
    .describe('The risk profile of the user (low, medium, high).'),
});
export type SmartReminderInput = z.infer<typeof SmartReminderInputSchema>;

const SmartReminderOutputSchema = z.object({
  reminderDaysBefore: z
    .number()
    .describe(
      'The number of days before the due date to send the first reminder.'
    ),
  reminderFrequency: z
    .string()
    .describe(
      'The frequency of reminders (e.g., daily, every other day) after the first reminder.'
    ),
  reminderTime: z.string().describe('The time of day to send the reminders (HH:mm).'),
  additionalDetails: z
    .string()
    .describe(
      'Any additional relevant details such as number of reminders to send.'
    ),
});
export type SmartReminderOutput = z.infer<typeof SmartReminderOutputSchema>;

export async function configureSmartReminder(
  input: SmartReminderInput
): Promise<SmartReminderOutput> {
  return smartReminderConfigurationFlow(input);
}

const smartReminderPrompt = ai.definePrompt({
  name: 'smartReminderPrompt',
  input: {schema: SmartReminderInputSchema},
  output: {schema: SmartReminderOutputSchema},
  prompt: `You are an AI assistant that intelligently configures EMI reminders based on loan details and risk profile.

  Given the following loan details and risk profile, determine the optimal reminder configuration to help the user avoid missed payments.

  Loan Name: {{{loanName}}}
  EMI Amount: {{{emiAmount}}}
  Due Date: {{{dueDate}}}
  Risk Profile: {{{riskProfile}}}

  Consider the following factors when determining the reminder configuration:

  - Risk Profile: High-risk users should receive more frequent and earlier reminders.
  - EMI Amount: Higher EMI amounts may warrant earlier reminders.
  - Proximity to Due Date: Reminders should become more frequent as the due date approaches.
  - User Preference: User should receive a reasonable amount of reminders to avoid alert fatigue.

  Return the reminder configuration in the following JSON format:
  {
    "reminderDaysBefore": number, // The number of days before the due date to send the first reminder
    "reminderFrequency": string, // The frequency of reminders (e.g., daily, every other day) after the first reminder
    "reminderTime": string, // The time of day to send the reminders (HH:mm)
    "additionalDetails": string // Any additional relevant details such as number of reminders to send
  }
  `,
});

const smartReminderConfigurationFlow = ai.defineFlow(
  {
    name: 'smartReminderConfigurationFlow',
    inputSchema: SmartReminderInputSchema,
    outputSchema: SmartReminderOutputSchema,
  },
  async input => {
    const {output} = await smartReminderPrompt(input);
    return output!;
  }
);
