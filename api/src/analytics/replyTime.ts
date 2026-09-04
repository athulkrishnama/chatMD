import type { NormalizedMessage } from '../types/message';
import type { ReplyTimeStats, PersonReplyStats, ReplyBuckets } from '../types/analytics';

const CONVERSATION_GAP_MS = 60 * 60 * 1000; // 60 minutes

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function buildBuckets(delaysMinutes: number[]): ReplyBuckets {
  return {
    under1Min: delaysMinutes.filter((d) => d < 1).length,
    min1to5: delaysMinutes.filter((d) => d >= 1 && d < 5).length,
    min5to15: delaysMinutes.filter((d) => d >= 5 && d < 15).length,
    min15to30: delaysMinutes.filter((d) => d >= 15 && d < 30).length,
    min30to60: delaysMinutes.filter((d) => d >= 30 && d < 60).length,
    over60Min: delaysMinutes.filter((d) => d >= 60).length,
  };
}

function buildPersonReplyStats(delays: number[]): PersonReplyStats {
  if (delays.length === 0) {
    return {
      avgMinutes: 0, medianMinutes: 0, fastestMinutes: 0,
      slowestMinutes: 0, under5MinPercentage: 0,
      buckets: buildBuckets([]), sampleCount: 0,
    };
  }
  const avg = delays.reduce((s, d) => s + d, 0) / delays.length;
  const under5 = delays.filter((d) => d < 5).length;
  return {
    avgMinutes: parseFloat(avg.toFixed(2)),
    medianMinutes: parseFloat(median(delays).toFixed(2)),
    fastestMinutes: parseFloat(Math.min(...delays).toFixed(2)),
    slowestMinutes: parseFloat(Math.max(...delays).toFixed(2)),
    under5MinPercentage: parseFloat(((under5 / delays.length) * 100).toFixed(1)),
    buckets: buildBuckets(delays),
    sampleCount: delays.length,
  };
}

export function calculateReplyTime(messages: NormalizedMessage[]): ReplyTimeStats {
  const youDelays: number[] = [];
  const themDelays: number[] = [];

  for (let i = 1; i < messages.length; i++) {
    const prev = messages[i - 1];
    const curr = messages[i];

    // Only count if sender changed (it's a reply, not a double text)
    if (prev.isOutgoing === curr.isOutgoing) continue;

    const gapMs = curr.timestamp.getTime() - prev.timestamp.getTime();
    // Only count within a conversation (< 60 min gap = plausible reply)
    if (gapMs > CONVERSATION_GAP_MS || gapMs < 0) continue;

    const gapMinutes = gapMs / 60000;

    if (curr.isOutgoing) {
      // You replied to them
      youDelays.push(gapMinutes);
    } else {
      // They replied to you
      themDelays.push(gapMinutes);
    }
  }

  return {
    you: buildPersonReplyStats(youDelays),
    them: buildPersonReplyStats(themDelays),
  };
}
