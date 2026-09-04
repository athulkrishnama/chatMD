import type { NormalizedMessage } from '../types/message';
import type { ConversationThread } from '../types/analytics';

const CONVERSATION_GAP_MINUTES = 60;

/**
 * Splits a sorted message array into conversation threads.
 * A new conversation starts when there's a gap > 60 minutes between messages.
 */
export function groupIntoConversations(messages: NormalizedMessage[]): ConversationThread[] {
  if (messages.length === 0) return [];

  const threads: ConversationThread[] = [];
  let currentThread: NormalizedMessage[] = [messages[0]];

  for (let i = 1; i < messages.length; i++) {
    const prev = messages[i - 1];
    const curr = messages[i];
    const gapMinutes = (curr.timestamp.getTime() - prev.timestamp.getTime()) / 60000;

    if (gapMinutes > CONVERSATION_GAP_MINUTES) {
      // Flush current thread
      threads.push(buildThread(currentThread));
      currentThread = [curr];
    } else {
      currentThread.push(curr);
    }
  }

  // Flush last thread
  if (currentThread.length > 0) {
    threads.push(buildThread(currentThread));
  }

  return threads;
}

function buildThread(messages: NormalizedMessage[]): ConversationThread {
  const startTime = messages[0].timestamp;
  const endTime = messages[messages.length - 1].timestamp;
  const durationMinutes = (endTime.getTime() - startTime.getTime()) / 60000;

  return {
    startTime,
    endTime,
    durationMinutes: Math.round(durationMinutes),
    messages,
    startedBy: messages[0].sender,
    messageCount: messages.length,
  };
}
