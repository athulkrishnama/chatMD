import type { NormalizedMessage } from './message';
import type { WordStats, WordFrequency } from './analytics';

const STOPWORDS = new Set([
  'the', 'is', 'a', 'an', 'to', 'of', 'and', 'in', 'that', 'it', 'for',
  'on', 'are', 'as', 'was', 'at', 'be', 'this', 'have', 'from', 'or',
  'had', 'by', 'not', 'but', 'they', 'he', 'she', 'we', 'you', 'your',
  'my', 'me', 'him', 'her', 'we', 'our', 'do', 'did', 'so', 'if', 'up',
  'out', 'no', 'can', 'will', 'just', 'then', 'about', 'more', 'also',
  'all', 'get', 'one', 'has', 'its', 'i', 'don', 'was', 'his', 'too',
  'with', 'what', 'there', 'been', 'like', 'them', 'were', 'when',
  'into', 'than', 'their', 'because', 'some', 'very', 'would', 'time',
  'know', 'come', 'think', 'am', 've', 'll', 're', 'ok', 'okay', 'yeah',
  'yes', 'no', 'na', 'yea', 'ya', 'nah', 'hmm', 'hm', 'oh',
  'image', 'video', 'audio', 'media', 'sticker',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, '') // remove URLs
    .replace(/[^\w\s]/g, ' ')        // remove punctuation
    .replace(/\d+/g, ' ')            // remove standalone numbers
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function buildFrequency(messages: NormalizedMessage[], topN = 20): WordFrequency[] {
  const freq = new Map<string, number>();
  for (const msg of messages) {
    if (msg.type !== 'text') continue;
    for (const word of tokenize(msg.text)) {
      freq.set(word, (freq.get(word) ?? 0) + 1);
    }
  }
  return Array.from(freq.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

export function calculateWordStats(messages: NormalizedMessage[]): WordStats {
  const you = messages.filter((m) => m.isOutgoing);
  const them = messages.filter((m) => !m.isOutgoing);
  return {
    you: buildFrequency(you),
    them: buildFrequency(them),
  };
}
