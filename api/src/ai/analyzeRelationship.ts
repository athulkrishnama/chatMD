import OpenAI from 'openai';
import { buildRelationshipPrompt } from './relationshipPrompt';
import { parseAIResponse } from './relationshipSchema';
import type { RelationshipProfile } from '../types/relationship';
import type { WrappedInsight } from '../types/relationship';

let openai: OpenAI | null = null;

function getClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set in .env');
    
    // Initialize OpenAI client pointing to OpenRouter
    openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      defaultHeaders: {
        'HTTP-Referer': process.env.WEB_URL || 'http://localhost:3000', // Required by OpenRouter
        'X-Title': 'ChatWrapped', // Optional but recommended
      },
    });
  }
  return openai;
}

export async function analyzeRelationship(profile: RelationshipProfile): Promise<WrappedInsight> {
  const client = getClient();
  const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';

  const prompt = buildRelationshipPrompt(profile);

  const completion = await client.chat.completions.create({
    model: model,
    messages: [
      {
        role: 'system',
        content: 'You are an AI that analyzes chat statistics to create fun "Chat Wrapped" summaries. You ALWAYS respond with valid JSON matching the requested schema. No markdown, no preamble.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    response_format: { type: 'json_object' }, // Supported by most models on OpenRouter
    temperature: 0.7,
  });

  const rawText = completion.choices[0]?.message?.content || '{}';

  return parseAIResponse(rawText);
}
