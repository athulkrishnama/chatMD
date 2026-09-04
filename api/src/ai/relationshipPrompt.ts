import type { RelationshipProfile } from '../types/relationship';

const RELATIONSHIP_TYPES = [
  'Chaotic Besties',
  'Late Night Philosophers',
  'Certified Yappers',
  'Best Friends',
  'Low Maintenance, High Trust',
  'Flirty but Confused',
  'One-Sided Situation',
  'Professional Somehow',
  'Dry Texting Specialists',
  'We Talk Once a Month',
  'Emotional Support Department',
  'Partners in Crime',
  'Suspiciously Close',
];

function formatHour(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

export function buildRelationshipPrompt(profile: RelationshipProfile): string {
  const { people, overview, messageBalance, conversationInitiation, replyTime, activity, engagement, streaks, words, emojis } = profile;

  const topWords = (arr: { word: string; count: number }[]) =>
    arr.slice(0, 8).map((w) => `"${w.word}" (${w.count}x)`).join(', ');
  const topEmojis = (arr: { emoji: string; count: number }[]) =>
    arr.slice(0, 5).map((e) => `${e.emoji} (${e.count}x)`).join(', ');

  const charRatio = messageBalance.them.avgCharacters > 0
    ? (messageBalance.you.avgCharacters / messageBalance.them.avgCharacters).toFixed(1)
    : '1.0';

  const statsBlock = `
=== CHAT STATISTICS ===
Chat between: ${people.you} and ${people.them}
Duration: ${overview.chatDurationDays} days | Active days: ${overview.activeDays}
Total messages: ${overview.totalMessages} | Avg per day: ${overview.avgMessagesPerDay}
Total conversations: ${overview.totalConversations}

MESSAGE BALANCE
${people.you}: ${messageBalance.you.count} messages (${messageBalance.you.percentage}%), avg ${messageBalance.you.avgCharacters} chars/msg
${people.them}: ${messageBalance.them.count} messages (${messageBalance.them.percentage}%), avg ${messageBalance.them.avgCharacters} chars/msg
Character ratio (You:Them): ${charRatio}

CONVERSATION INITIATION
${people.you} started: ${conversationInitiation.you} (${conversationInitiation.youPercentage}%)
${people.them} started: ${conversationInitiation.them} (${conversationInitiation.themPercentage}%)

REPLY TIMES
${people.you}: median ${replyTime.youMedianMinutes} min | avg ${replyTime.youAvgMinutes} min | under 5 min: ${replyTime.youUnder5MinPercentage}%
${people.them}: median ${replyTime.themMedianMinutes} min | avg ${replyTime.themAvgMinutes} min | under 5 min: ${replyTime.themUnder5MinPercentage}%

ACTIVITY
Peak hour: ${formatHour(activity.peakHour)}
Peak day: ${activity.peakDay}
Night messages (10PM–6AM): ${activity.nightMessagePercentage}%
Most active time of day: ${activity.mostActiveTimeOfDay}

ENGAGEMENT
Questions asked — ${people.you}: ${engagement.questionsByYou}, ${people.them}: ${engagement.questionsByThem}
Double texts — ${people.you}: ${engagement.doubleTextsByYou}, ${people.them}: ${engagement.doubleTextsByThem}
Unanswered messages — ${people.you}: ${engagement.unansweredByYou}, ${people.them}: ${engagement.unansweredByThem}
Longest conversation: ${engagement.longestConversationMinutes} minutes, ${engagement.longestConversationMessages} messages

STREAKS
Longest streak: ${streaks.longestDays} consecutive days
Current streak: ${streaks.currentDays} days

TOP WORDS
${people.you}: ${topWords(words.you)}
${people.them}: ${topWords(words.them)}

TOP EMOJIS
${people.you}: ${topEmojis(emojis.you) || 'none'}
${people.them}: ${topEmojis(emojis.them) || 'none'}
${emojis.topOverall ? `Overall most used: ${emojis.topOverall.emoji} (${emojis.topOverall.count}x)` : ''}
=== END STATISTICS ===
  `.trim();

  return `You are analyzing a WhatsApp conversation for a fun "Chat Wrapped" feature.

${statsBlock}

Based ONLY on the statistics above, generate a JSON response with the following fields:
- "relationshipType": Choose the SINGLE best matching label from this list: ${JSON.stringify(RELATIONSHIP_TYPES)}
- "status": A short 2-4 word playful status (e.g. "Chaotic but Stable", "Comfortably Attached")
- "summary": 2-3 sentences describing the relationship dynamic based on the stats. Be specific, reference real numbers.
- "topSignal": The single most interesting finding from the stats (one sentence).
- "funObservation": A fun, witty observation based on the data (one sentence, can be humorous).
- "wildCardObservation": An unexpected or surprising insight from the stats (one sentence).
- "chatChemistryScore": An integer from 0-100 representing chat chemistry. Base it on: conversation frequency, initiation balance, reply speed consistency, message balance, and longest conversation.
- "interpretationConfidence": A float from 0.0-1.0. Lower if data is sparse (< 200 messages), higher if there is rich data.

RULES:
1. Only make claims supported by the provided statistics.
2. Do not invent details not present in the data.
3. Keep the tone fun and observational, not clinical.
4. Return ONLY valid JSON, no markdown, no preamble.`;
}
