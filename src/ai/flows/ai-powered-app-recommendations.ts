'use server';
/**
 * @fileOverview AI-powered app recommendations flow.
 *
 * - aiPoweredAppRecommendations - A function that recommends apps based on user usage patterns.
 * - AIPoweredAppRecommendationsInput - The input type for the aiPoweredAppRecommendations function.
 * - AIPoweredAppRecommendationsOutput - The return type for the aiPoweredAppRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredAppRecommendationsInputSchema = z.object({
  usageHistory: z
    .string()
    .describe(
      'A string containing the user app usage history, including app names and frequency of use.'
    ),
});
export type AIPoweredAppRecommendationsInput = z.infer<
  typeof AIPoweredAppRecommendationsInputSchema
>;

const AIPoweredAppRecommendationsOutputSchema = z.object({
  recommendedApps: z
    .array(z.string())
    .describe('An array of recommended app names.'),
});
export type AIPoweredAppRecommendationsOutput = z.infer<
  typeof AIPoweredAppRecommendationsOutputSchema>

export async function aiPoweredAppRecommendations(
  input: AIPoweredAppRecommendationsInput
): Promise<AIPoweredAppRecommendationsOutput> {
  return aiPoweredAppRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredAppRecommendationsPrompt',
  input: {schema: AIPoweredAppRecommendationsInputSchema},
  output: {schema: AIPoweredAppRecommendationsOutputSchema},
  prompt: `You are an AI assistant that recommends apps to users based on their usage history.

  Usage History: {{{usageHistory}}}

  Based on the usage history, recommend a list of apps that the user might find useful.  Do not suggest apps that the user has already used.
  Return the apps as a simple JSON array of strings.`,
});

const aiPoweredAppRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPoweredAppRecommendationsFlow',
    inputSchema: AIPoweredAppRecommendationsInputSchema,
    outputSchema: AIPoweredAppRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
