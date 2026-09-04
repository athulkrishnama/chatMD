import type { NormalizedMessage } from '../types/message';
import type { EmojiStats, EmojiFrequency } from '../types/analytics';

// Matches Unicode emoji sequences (includes skin tones, ZWJ sequences, flags)
const EMOJI_REGEX =
  /(\p{Emoji_Presentation}|\p{Extended_Pictographic})(\u200d(\p{Emoji_Presentation}|\p{Extended_Pictographic}))*/gu;

function extractEmojis(text: string): string[] {
  return text.match(EMOJI_REGEX) ?? [];
}

function buildFrequency(messages: NormalizedMessage[], topN = 10): EmojiFrequency[] {
  const freq = new Map<string, number>();
  for (const msg of messages) {
    for (const emoji of extractEmojis(msg.text)) {
      freq.set(emoji, (freq.get(emoji) ?? 0) + 1);
    }
  }
  return Array.from(freq.entries())
    .map(([emoji, count]) => ({ emoji, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

export function calculateEmojiStats(messages: NormalizedMessage[]): EmojiStats {
  const you = messages.filter((m) => m.isOutgoing);
  const them = messages.filter((m) => !m.isOutgoing);
  const total = buildFrequency(messages, 10);
  return {
    you: buildFrequency(you),
    them: buildFrequency(them),
    total,
  };
}
