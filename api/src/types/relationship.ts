import type {
  WordFrequency,
  EmojiFrequency,
} from './analytics';

// ─── Compact profile sent to the AI ─────────────────────────────────────────
export interface RelationshipProfile {
  people: { you: string; them: string };

  overview: {
    totalMessages: number;
    chatDurationDays: number;
    activeDays: number;
    totalConversations: number;
    avgMessagesPerDay: number;
  };

  messageBalance: {
    you: { count: number; percentage: number; avgCharacters: number };
    them: { count: number; percentage: number; avgCharacters: number };
  };

  conversationInitiation: {
    you: number;
    them: number;
    youPercentage: number;
    themPercentage: number;
  };

  replyTime: {
    youMedianMinutes: number;
    themMedianMinutes: number;
    youAvgMinutes: number;
    themAvgMinutes: number;
    youUnder5MinPercentage: number;
    themUnder5MinPercentage: number;
  };

  activity: {
    peakHour: number;
    peakDay: string;
    nightMessagePercentage: number;
    mostActiveTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  };

  engagement: {
    questionsByYou: number;
    questionsByThem: number;
    doubleTextsByYou: number;
    doubleTextsByThem: number;
    unansweredByYou: number;
    unansweredByThem: number;
    longestConversationMinutes: number;
    longestConversationMessages: number;
  };

  streaks: {
    longestDays: number;
    currentDays: number;
  };

  words: {
    you: WordFrequency[];   // top 20
    them: WordFrequency[];  // top 20
  };

  emojis: {
    you: EmojiFrequency[];   // top 10
    them: EmojiFrequency[];  // top 10
    topOverall: EmojiFrequency | null;
  };
}

// ─── AI output schema ────────────────────────────────────────────────────────
export interface WrappedInsight {
  relationshipType: string;
  status: string;
  summary: string;
  topSignal: string;
  funObservation: string;
  wildCardObservation: string;
  chatChemistryScore: number;  // 0–100
  interpretationConfidence: number; // 0–1
}

// ─── Final API response ──────────────────────────────────────────────────────
export interface AnalyzeResponse {
  success: boolean;
  chatName: string;
  profile: RelationshipProfile;
  wrapped: WrappedInsight;
  error?: string;
}
