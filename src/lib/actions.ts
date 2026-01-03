'use server';

import { configureSmartReminder, type SmartReminderInput } from '@/ai/flows/smart-reminder-configuration';
import { generateImage, type GenerateImageInput } from '@/ai/flows/generate-image';

export async function getSmartReminderConfig(input: SmartReminderInput) {
    try {
        const result = await configureSmartReminder(input);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error in getSmartReminderConfig:', error);
        return { success: false, error: 'Failed to generate reminder configuration. Please ensure the Genkit server is running.' };
    }
}

export async function generateLoanImage(prompt: string) {
    try {
        const result = await generateImage({ prompt: `A professional, high-quality image representing a "${prompt}", suitable for a financial application.` });
        return { success: true, data: result.imageUrl };
    } catch (error) {
        console.error('Error in generateLoanImage:', error);
        return { success: false, error: 'Failed to generate image. Please ensure the Genkit server is running and the API key is valid.' };
    }
}
