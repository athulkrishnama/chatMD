import type { WrappedInsight } from '../types/relationship';

export function parseAIResponse(raw: string): WrappedInsight {
  // Strip any markdown code fences if the model added them
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  // Validate required fields with fallbacks
  return {
    relationshipType: parsed.relationshipType ?? 'Best Friends',
    status: parsed.status ?? 'Hard to Define',
    summary: parsed.summary ?? 'This conversation has a unique dynamic worth celebrating.',
    topSignal: parsed.topSignal ?? 'You both keep the conversation going.',
    funObservation: parsed.funObservation ?? 'Your chat has a personality of its own.',
    wildCardObservation: parsed.wildCardObservation ?? 'The data speaks for itself.',
    chatChemistryScore: typeof parsed.chatChemistryScore === 'number'
      ? Math.min(100, Math.max(0, Math.round(parsed.chatChemistryScore)))
      : 50,
    interpretationConfidence: typeof parsed.interpretationConfidence === 'number'
      ? Math.min(1, Math.max(0, parsed.interpretationConfidence))
      : 0.7,
  };
}
