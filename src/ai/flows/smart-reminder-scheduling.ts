'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligently scheduling EMI reminders based on user payment behavior and loan risk profile.
 *
 * - scheduleSmartReminder - A function that schedules smart EMI reminders.
 * - SmartReminderSchedulingInput - The input type for the scheduleSmartReminder function.
 * - SmartReminderSchedulingOutput - The return type for the scheduleSmartReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReminderSchedulingInputSchema = z.object({
  loanName: z.string().describe('The name of the loan.'),
  emiAmount: z.number().describe('The EMI amount for the loan.'),
  dueDate: z.string().describe('The due date of the EMI (ISO format).'),
  riskProfile: z
    .enum(['low', 'medium', 'high'])
    .describe('The risk profile of the user (low, medium, high).'),
  pastPaymentBehavior: z
    .string()
    .describe(
      'Description of the user past payment behavior. E.g. always pays on time, often delays payment, etc.'
    ),
});
export type SmartReminderSchedulingInput = z.infer<
  typeof SmartReminderSchedulingInputSchema
>;

const SmartReminderSchedulingOutputSchema = z.object({
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
      'Any additional relevant details such as number of reminders to send and why this configuration was chosen.'
    ),
});
export type SmartReminderSchedulingOutput = z.infer<
  typeof SmartReminderSchedulingOutputSchema
>;

export async function scheduleSmartReminder(
  input: SmartReminderSchedulingInput
): Promise<SmartReminderSchedulingOutput> {
  return smartReminderSchedulingFlow(input);
}

const smartReminderSchedulingPrompt = ai.definePrompt({
  name: 'smartReminderSchedulingPrompt',
  input: {schema: SmartReminderSchedulingInputSchema},
  output: {schema: SmartReminderSchedulingOutputSchema},
  prompt: `You are an AI assistant that intelligently schedules EMI reminders based on loan details, risk profile, and past payment behavior.

  Given the following loan details, risk profile, and past payment behavior, determine the optimal reminder schedule to help the user avoid missed payments.

  Loan Name: {{{loanName}}}
  EMI Amount: {{{emiAmount}}}
  Due Date: {{{dueDate}}}
  Risk Profile: {{{riskProfile}}}
  Past Payment Behavior: {{{pastPaymentBehavior}}}

  Consider the following factors when determining the reminder schedule:

  - Risk Profile: High-risk users should receive more frequent and earlier reminders.
  - EMI Amount: Higher EMI amounts may warrant earlier reminders.
  - Proximity to Due Date: Reminders should become more frequent as the due date approaches.
  - User Payment Behavior: Users with a history of late payments should receive earlier and more frequent reminders.
  - User Preference: User should receive a reasonable amount of reminders to avoid alert fatigue.

  Return the reminder configuration in the following JSON format:
  {
    "reminderDaysBefore": number, // The number of days before the due date to send the first reminder
    "reminderFrequency": string, // The frequency of reminders (e.g., daily, every other day) after the first reminder
    "reminderTime": string, // The time of day to send the reminders (HH:mm)
    "additionalDetails": string // Any additional relevant details such as number of reminders to send and why this configuration was chosen
  }
  `,
});

const smartReminderSchedulingFlow = ai.defineFlow(
  {
    name: 'smartReminderSchedulingFlow',
    inputSchema: SmartReminderSchedulingInputSchema,
    outputSchema: SmartReminderSchedulingOutputSchema,
  },
  async input => {
    const {output} = await smartReminderSchedulingPrompt(input);
    return output!;
  }
);
