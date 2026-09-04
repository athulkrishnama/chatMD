import type { NormalizedMessage } from '../types/message';
import type { ConversationThread, EngagementStats } from '../types/analytics';

export function calculateEngagementStats(
  messages: NormalizedMessage[],
  threads: ConversationThread[]
): EngagementStats {
  let questionsAskedByYou = 0;
  let questionsAskedByThem = 0;
  let doubleTextsByYou = 0;
  let doubleTextsByThem = 0;
  let unansweredByYou = 0;
  let unansweredByThem = 0;
  let longestConsecutiveByYou = 0;
  let longestConsecutiveByThem = 0;

  // Questions
  for (const msg of messages) {
    if (msg.text.includes('?')) {
      if (msg.isOutgoing) questionsAskedByYou++;
      else questionsAskedByThem++;
    }
  }

  // Double texts + longest consecutive runs
  let consecutiveYou = 0;
  let consecutiveThem = 0;

  for (let i = 0; i < messages.length; i++) {
    const curr = messages[i];
    const prev = messages[i - 1];

    if (prev && curr.isOutgoing === prev.isOutgoing) {
      if (curr.isOutgoing) {
        consecutiveYou++;
        if (consecutiveYou === 1) doubleTextsByYou++; // second consecutive = double text
        longestConsecutiveByYou = Math.max(longestConsecutiveByYou, consecutiveYou + 1);
      } else {
        consecutiveThem++;
        if (consecutiveThem === 1) doubleTextsByThem++;
        longestConsecutiveByThem = Math.max(longestConsecutiveByThem, consecutiveThem + 1);
      }
    } else {
      consecutiveYou = 0;
      consecutiveThem = 0;
    }
  }

  // Unanswered messages = last message in a thread with a single sender (other never replied)
  for (const thread of threads) {
    const msgs = thread.messages;
    if (msgs.length === 0) continue;

    const lastMsg = msgs[msgs.length - 1];
    const senders = new Set(msgs.map((m) => m.isOutgoing));

    // If only one person spoke in the entire thread, it's unanswered
    if (senders.size === 1) {
      if (lastMsg.isOutgoing) unansweredByYou++;
      else unansweredByThem++;
    }
  }

  // Conversation initiation
  const conversationsStartedByYou = threads.filter((t) => t.messages[0]?.isOutgoing).length;
  const conversationsStartedByThem = threads.filter((t) => !t.messages[0]?.isOutgoing).length;

  return {
    questionsAskedByYou,
    questionsAskedByThem,
    doubleTextsByYou,
    doubleTextsByThem,
    unansweredByYou,
    unansweredByThem,
    conversationsStartedByYou,
    conversationsStartedByThem,
    longestConsecutiveByYou,
    longestConsecutiveByThem,
  };
}
