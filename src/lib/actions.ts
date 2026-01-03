'use server';

import { configureSmartReminder, type SmartReminderInput } from '@/ai/flows/smart-reminder-configuration';
import { analyzeLoans, type LoanAnalysisInput } from '@/ai/flows/loan-analysis';

export async function getSmartReminderConfig(input: SmartReminderInput) {
    try {
        const result = await configureSmartReminder(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in getSmartReminderConfig:', error);
        return { success: false, error: 'Failed to generate reminder configuration. Please ensure the Genkit server is running.' };
    }
}

export async function getLoanAnalysis(input: LoanAnalysisInput) {
    try {
        const result = await analyzeLoans(input);
        return { success: true, data: result };
    } catch(error) {
        console.error('Error in getLoanAnalysis:', error);
        return { success: false, error: 'Failed to generate loan analysis. Please ensure the Genkit server is running.' };
    }
}
