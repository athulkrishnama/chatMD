import type { NormalizedMessage } from '../types/message';
import type { MessageStats, PersonStats } from '../types/analytics';

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function buildPersonStats(messages: NormalizedMessage[]): PersonStats {
  const total = messages.length;
  const lengths = messages.map((m) => m.text.length);
  const avgCharacters = total > 0 ? Math.round(lengths.reduce((s, l) => s + l, 0) / total) : 0;
  return {
    count: total,
    percentage: 0, // filled in after both are computed
    avgCharacters,
    medianCharacters: Math.round(median(lengths)),
  };
}

export function calculateMessageStats(
  messages: NormalizedMessage[],
  chatName: string
): MessageStats {
  const youMessages = messages.filter((m) => m.isOutgoing);
  const themMessages = messages.filter((m) => !m.isOutgoing);

  const total = messages.length;
  const youStats = buildPersonStats(youMessages);
  const themStats = buildPersonStats(themMessages);

  youStats.percentage = total > 0 ? parseFloat(((youStats.count / total) * 100).toFixed(1)) : 0;
  themStats.percentage = total > 0 ? parseFloat(((themStats.count / total) * 100).toFixed(1)) : 0;

  const sorted = [...messages].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  const firstMessageDate = sorted[0]?.timestamp ?? new Date();
  const lastMessageDate = sorted[sorted.length - 1]?.timestamp ?? new Date();

  const chatDurationDays = Math.max(
    1,
    Math.round((lastMessageDate.getTime() - firstMessageDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Count unique active days
  const activeDates = new Set(
    messages.map((m) => m.timestamp.toISOString().split('T')[0])
  );
  const activeDays = activeDates.size;

  const avgMessagesPerDay = parseFloat((total / chatDurationDays).toFixed(1));

  return {
    totalMessages: total,
    you: youStats,
    them: themStats,
    chatName,
    chatDurationDays,
    activeDays,
    avgMessagesPerDay,
    firstMessageDate,
    lastMessageDate,
  };
}
