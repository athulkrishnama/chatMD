import type { MessageStats, ReplyTimeStats, ActivityStats, WordStats, EmojiStats, EngagementStats, StreakStats, ConversationThread } from './analytics';
import type { RelationshipProfile } from './relationship';

function mostActiveTimeOfDay(activity: ActivityStats): 'morning' | 'afternoon' | 'evening' | 'night' {
  const buckets = [
    { label: 'morning' as const, count: activity.morningMessages },
    { label: 'afternoon' as const, count: activity.afternoonMessages },
    { label: 'evening' as const, count: activity.eveningMessages },
    { label: 'night' as const, count: activity.nightMessages },
  ];
  return buckets.sort((a, b) => b.count - a.count)[0].label;
}

export function generateRelationshipProfile(params: {
  chatName: string;
  msgStats: MessageStats;
  replyStats: ReplyTimeStats;
  activityStats: ActivityStats;
  wordStats: WordStats;
  emojiStats: EmojiStats;
  engagementStats: EngagementStats;
  streakStats: StreakStats;
  threads: ConversationThread[];
}): RelationshipProfile {
  const { chatName, msgStats, replyStats, activityStats, wordStats, emojiStats, engagementStats, streakStats, threads } = params;

  const totalThreads = threads.length;
  const conversationsByYou = engagementStats.conversationsStartedByYou;
  const conversationsByThem = engagementStats.conversationsStartedByThem;
  const youInitiationPct = totalThreads > 0 ? parseFloat(((conversationsByYou / totalThreads) * 100).toFixed(1)) : 0;
  const themInitiationPct = totalThreads > 0 ? parseFloat(((conversationsByThem / totalThreads) * 100).toFixed(1)) : 0;

  const longestThread = threads.reduce(
    (max, t) => (t.durationMinutes > (max?.durationMinutes ?? 0) ? t : max),
    threads[0]
  );

  const topOverallEmoji = emojiStats.total[0] ?? null;

  return {
    people: { you: 'You', them: chatName },

    overview: {
      totalMessages: msgStats.totalMessages,
      chatDurationDays: msgStats.chatDurationDays,
      activeDays: msgStats.activeDays,
      totalConversations: totalThreads,
      avgMessagesPerDay: msgStats.avgMessagesPerDay,
    },

    messageBalance: {
      you: {
        count: msgStats.you.count,
        percentage: msgStats.you.percentage,
        avgCharacters: msgStats.you.avgCharacters,
      },
      them: {
        count: msgStats.them.count,
        percentage: msgStats.them.percentage,
        avgCharacters: msgStats.them.avgCharacters,
      },
    },

    conversationInitiation: {
      you: conversationsByYou,
      them: conversationsByThem,
      youPercentage: youInitiationPct,
      themPercentage: themInitiationPct,
    },

    replyTime: {
      youMedianMinutes: replyStats.you.medianMinutes,
      themMedianMinutes: replyStats.them.medianMinutes,
      youAvgMinutes: replyStats.you.avgMinutes,
      themAvgMinutes: replyStats.them.avgMinutes,
      youUnder5MinPercentage: replyStats.you.under5MinPercentage,
      themUnder5MinPercentage: replyStats.them.under5MinPercentage,
    },

    activity: {
      peakHour: activityStats.peakHour,
      peakDay: activityStats.peakDay,
      nightMessagePercentage: activityStats.nightMessagePercentage,
      mostActiveTimeOfDay: mostActiveTimeOfDay(activityStats),
    },

    engagement: {
      questionsByYou: engagementStats.questionsAskedByYou,
      questionsByThem: engagementStats.questionsAskedByThem,
      doubleTextsByYou: engagementStats.doubleTextsByYou,
      doubleTextsByThem: engagementStats.doubleTextsByThem,
      unansweredByYou: engagementStats.unansweredByYou,
      unansweredByThem: engagementStats.unansweredByThem,
      longestConversationMinutes: longestThread?.durationMinutes ?? 0,
      longestConversationMessages: longestThread?.messageCount ?? 0,
    },

    streaks: {
      longestDays: streakStats.longestStreakDays,
      currentDays: streakStats.currentStreakDays,
    },

    words: {
      you: wordStats.you.slice(0, 20),
      them: wordStats.them.slice(0, 20),
    },

    emojis: {
      you: emojiStats.you.slice(0, 10),
      them: emojiStats.them.slice(0, 10),
      topOverall: topOverallEmoji,
    },
  };
}
