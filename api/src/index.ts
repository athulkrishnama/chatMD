import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import type { AnalyzeResponse } from './types/relationship';
import type { AnalyzeRequest } from './types/message';
import { normalizeMessages } from './analytics/normalizeMessages';
import { groupIntoConversations } from './analytics/conversationDetector';
import { calculateMessageStats } from './analytics/messageStats';
import { calculateReplyTime } from './analytics/replyTime';
import { calculateActivityStats } from './analytics/activityStats';
import { calculateWordStats } from './analytics/wordStats';
import { calculateEmojiStats } from './analytics/emojiStats';
import { calculateEngagementStats } from './analytics/engagementStats';
import { calculateStreakStats } from './analytics/streakStats';
import { generateRelationshipProfile } from './analytics/generateRelationshipProfile';
import { analyzeRelationship } from './ai/analyzeRelationship';

dotenv.config();

// Extend AnalyzeRequest for the request body (includes chatName)
type AnalyzeBody = AnalyzeRequest;

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'ChatWrapped API is running' });
});

// ─── Debug: analytics only, no AI call ───────────────────────────────────────
app.post('/api/analyze/debug', (req: Request, res: Response) => {
  try {
    const { chatName, messages } = req.body as AnalyzeBody;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array' });
    }

    const normalized = normalizeMessages(messages);
    const threads = groupIntoConversations(normalized);
    const msgStats = calculateMessageStats(normalized, chatName);
    const replyStats = calculateReplyTime(normalized);
    const activityStats = calculateActivityStats(normalized);
    const wordStats = calculateWordStats(normalized);
    const emojiStats = calculateEmojiStats(normalized);
    const engagementStats = calculateEngagementStats(normalized, threads);
    const streakStats = calculateStreakStats(normalized);

    const profile = generateRelationshipProfile({
      chatName, msgStats, replyStats, activityStats,
      wordStats, emojiStats, engagementStats, streakStats, threads,
    });

    res.json({ success: true, profile, normalizedCount: normalized.length, threadCount: threads.length });
  } catch (error) {
    console.error('[ChatWrapped] Debug error:', error);
    res.status(500).json({ error: 'Analytics failed', details: String(error) });
  }
});

// ─── Full pipeline: analytics + AI ───────────────────────────────────────────
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { chatName, messages } = req.body as AnalyzeBody;

    if (!chatName || typeof chatName !== 'string') {
      return res.status(400).json({ error: 'chatName is required' });
    }
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required and cannot be empty' });
    }

    console.log(`[ChatWrapped] Analyzing chat: "${chatName}" (${messages.length} raw messages)`);

    // Stage 1: Normalize
    const normalized = normalizeMessages(messages);
    console.log(`[ChatWrapped] Normalized: ${normalized.length} messages`);

    // Stage 2: Conversations
    const threads = groupIntoConversations(normalized);
    console.log(`[ChatWrapped] Detected ${threads.length} conversation threads`);

    // Stage 3: Analytics (run in parallel)
    const [msgStats, replyStats, activityStats, wordStats, emojiStats, engagementStats, streakStats] = await Promise.all([
      Promise.resolve(calculateMessageStats(normalized, chatName)),
      Promise.resolve(calculateReplyTime(normalized)),
      Promise.resolve(calculateActivityStats(normalized)),
      Promise.resolve(calculateWordStats(normalized)),
      Promise.resolve(calculateEmojiStats(normalized)),
      Promise.resolve(calculateEngagementStats(normalized, threads)),
      Promise.resolve(calculateStreakStats(normalized)),
    ]);

    // Stage 4: Compact profile
    const profile = generateRelationshipProfile({
      chatName, msgStats, replyStats, activityStats,
      wordStats, emojiStats, engagementStats, streakStats, threads,
    });

    // Stage 5: AI interpretation
    console.log('[ChatWrapped] Sending profile to Gemini...');
    const wrapped = await analyzeRelationship(profile);

    console.log(`[ChatWrapped] Done. Type: ${wrapped.relationshipType}, Score: ${wrapped.chatChemistryScore}`);

    const response: AnalyzeResponse = {
      success: true,
      chatName,
      profile,
      wrapped,
    };

    res.json(response);
  } catch (error) {
    console.error('[ChatWrapped] Error in /api/analyze:', error);
    res.status(500).json({ success: false, error: 'Analysis failed', details: String(error) });
  }
});

app.listen(port, () => {
  console.log(`⚡️[ChatWrapped API]: Running at http://localhost:${port}`);
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn('⚠️  OPENROUTER_API_KEY not set. AI analysis will fail. Add it to api/.env');
  }
});
