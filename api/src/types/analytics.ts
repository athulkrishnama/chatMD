import type { NormalizedMessage } from './message';

// ─── A single conversation thread (gap > 60 min = new thread) ────────────────
export interface ConversationThread {
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  messages: NormalizedMessage[];
  startedBy: string;
  messageCount: number;
}

// ─── Per-person message breakdown ────────────────────────────────────────────
export interface PersonStats {
  count: number;
  percentage: number;
  avgCharacters: number;
  medianCharacters: number;
}

export interface MessageStats {
  totalMessages: number;
  you: PersonStats;
  them: PersonStats;
  chatName: string;
  chatDurationDays: number;
  activeDays: number;
  avgMessagesPerDay: number;
  firstMessageDate: Date;
  lastMessageDate: Date;
}

// ─── Reply-time bucket labels ─────────────────────────────────────────────────
export interface ReplyBuckets {
  under1Min: number;
  min1to5: number;
  min5to15: number;
  min15to30: number;
  min30to60: number;
  over60Min: number;
}

export interface PersonReplyStats {
  avgMinutes: number;
  medianMinutes: number;
  fastestMinutes: number;
  slowestMinutes: number;
  under5MinPercentage: number;
  buckets: ReplyBuckets;
  sampleCount: number;
}

export interface ReplyTimeStats {
  you: PersonReplyStats;
  them: PersonReplyStats;
}

// ─── Activity (hour / day breakdown) ─────────────────────────────────────────
export interface ActivityStats {
  byHour: number[];          // index = hour (0–23), value = message count
  byDayOfWeek: number[];     // index = 0 (Sun) – 6 (Sat)
  peakHour: number;
  secondPeakHour: number;
  peakDay: string;
  leastActiveDay: string;
  morningMessages: number;   // 06:00–11:59
  afternoonMessages: number; // 12:00–17:59
  eveningMessages: number;   // 18:00–21:59
  nightMessages: number;     // 22:00–05:59
  nightMessagePercentage: number;
}

// ─── Word & emoji frequency ───────────────────────────────────────────────────
export interface WordFrequency { word: string; count: number; }
export interface EmojiFrequency { emoji: string; count: number; }

export interface WordStats {
  you: WordFrequency[];
  them: WordFrequency[];
}

export interface EmojiStats {
  you: EmojiFrequency[];
  them: EmojiFrequency[];
  total: EmojiFrequency[];
}

// ─── Engagement metrics ───────────────────────────────────────────────────────
export interface EngagementStats {
  questionsAskedByYou: number;
  questionsAskedByThem: number;
  doubleTextsByYou: number;
  doubleTextsByThem: number;
  unansweredByYou: number;
  unansweredByThem: number;
  conversationsStartedByYou: number;
  conversationsStartedByThem: number;
  longestConsecutiveByYou: number;
  longestConsecutiveByThem: number;
}

// ─── Streak stats ─────────────────────────────────────────────────────────────
export interface StreakStats {
  longestStreakDays: number;
  currentStreakDays: number;
  avgGapBetweenActiveDays: number;
  mostInactivePeriodDays: number;
}

// ─── Conversation-level aggregates ───────────────────────────────────────────
export interface ConversationStats {
  total: number;
  startedByYou: number;
  startedByThem: number;
  avgMessageCount: number;
  avgDurationMinutes: number;
  longestDurationMinutes: number;
  longestMessageCount: number;
  shortestDurationMinutes: number;
}
