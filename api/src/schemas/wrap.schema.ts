import { z } from 'zod';

export const createWrapSchema = z.object({
  chatName: z.string().min(1, 'Chat name is required'),
  analytics: z.object({
    people: z.object({
      you: z.string(),
      them: z.string(),
    }),
    overview: z.object({
      totalMessages: z.number(),
      chatDurationDays: z.number(),
      activeDays: z.number(),
      totalConversations: z.number(),
      avgMessagesPerDay: z.number(),
    }),
    messageBalance: z.object({
      you: z.object({ count: z.number(), percentage: z.number(), avgCharacters: z.number() }),
      them: z.object({ count: z.number(), percentage: z.number(), avgCharacters: z.number() }),
    }),
    conversationInitiation: z.object({
      you: z.number(),
      them: z.number(),
      youPercentage: z.number(),
      themPercentage: z.number(),
    }),
    replyTime: z.object({
      youMedianMinutes: z.number(),
      themMedianMinutes: z.number(),
      youAvgMinutes: z.number(),
      themAvgMinutes: z.number(),
      youUnder5MinPercentage: z.number(),
      themUnder5MinPercentage: z.number(),
    }),
    activity: z.object({
      peakHour: z.number(),
      peakDay: z.string(),
      nightMessagePercentage: z.number(),
      mostActiveTimeOfDay: z.string(),
    }),
    engagement: z.object({
      questionsByYou: z.number(),
      questionsByThem: z.number(),
      doubleTextsByYou: z.number(),
      doubleTextsByThem: z.number(),
      unansweredByYou: z.number(),
      unansweredByThem: z.number(),
      longestConversationMinutes: z.number(),
      longestConversationMessages: z.number(),
    }),
    streaks: z.object({
      longestDays: z.number(),
      currentDays: z.number(),
    }),
    words: z.object({
      you: z.array(z.object({ word: z.string(), count: z.number() })),
      them: z.array(z.object({ word: z.string(), count: z.number() })),
    }),
    emojis: z.object({
      you: z.array(z.object({ emoji: z.string(), count: z.number() })),
      them: z.array(z.object({ emoji: z.string(), count: z.number() })),
      topOverall: z.object({ emoji: z.string(), count: z.number() }).nullable(),
    }),
  }),
});

