export interface WrappedInsight {
  relationshipType: string;
  status: string;
  summary: string;
  topSignal: string;
  funObservation: string;
  wildCardObservation: string;
  chatChemistryScore: number;
  interpretationConfidence: number;
}

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
    mostActiveTimeOfDay: string;
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
  streaks: { longestDays: number; currentDays: number };
  words: {
    you: { word: string; count: number }[];
    them: { word: string; count: number }[];
  };
  emojis: {
    you: { emoji: string; count: number }[];
    them: { emoji: string; count: number }[];
    topOverall: { emoji: string; count: number } | null;
  };
}

