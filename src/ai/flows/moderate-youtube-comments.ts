'use server';

/**
 * @fileOverview Moderates YouTube comments to ensure they match advertiser-provided templates.
 *
 * - moderateYouTubeComments - A function that moderates YouTube comments.
 * - ModerateYouTubeCommentsInput - The input type for the moderateYouTubeComments function.
 * - ModerateYouTubeCommentsOutput - The return type for the moderateYouTubeComments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateYouTubeCommentsInputSchema = z.object({
  comment: z.string().describe('The YouTube comment to be moderated.'),
  templates: z.array(z.string()).describe('An array of approved comment templates.'),
});
export type ModerateYouTubeCommentsInput = z.infer<
  typeof ModerateYouTubeCommentsInputSchema
>;

const ModerateYouTubeCommentsOutputSchema = z.object({
  isApproved: z
    .boolean()
    .describe(
      'Whether the comment is approved based on matching one of the templates.'
    ),
});
export type ModerateYouTubeCommentsOutput = z.infer<
  typeof ModerateYouTubeCommentsOutputSchema
>;

export async function moderateYouTubeComments(
  input: ModerateYouTubeCommentsInput
): Promise<ModerateYouTubeCommentsOutput> {
  return moderateYouTubeCommentsFlow(input);
}

const moderateYouTubeCommentsPrompt = ai.definePrompt({
  name: 'moderateYouTubeCommentsPrompt',
  input: {schema: ModerateYouTubeCommentsInputSchema},
  output: {schema: ModerateYouTubeCommentsOutputSchema},
  prompt: `You are a YouTube comment moderator. Your task is to determine if a given comment is approved based on whether it matches one of the provided templates.

Comment: "{{comment}}"

Templates:
{{#each templates}}
- "{{this}}"
{{/each}}

Determine if the comment is an exact match (case-sensitive) to one of the templates. If it matches, the comment is approved.
Return a JSON object indicating whether the comment is approved.
`, // Added Handlebars each block
});

const moderateYouTubeCommentsFlow = ai.defineFlow(
  {
    name: 'moderateYouTubeCommentsFlow',
    inputSchema: ModerateYouTubeCommentsInputSchema,
    outputSchema: ModerateYouTubeCommentsOutputSchema,
  },
  async input => {
    const {output} = await moderateYouTubeCommentsPrompt(input);
    return output!;
  }
);
