import { useEffect, useState } from 'react';
import type { CurrentChatResponse } from '../shared/types';
import {
  Button,
  StatusView,
  WelcomeView,
  WrappedView,
} from './components';
import { useWrapStatus } from './hooks/useWrapStatus';

import { normalizeMessages } from '../analytics/normalizeMessages';
import { groupIntoConversations } from '../analytics/conversationDetector';
import { calculateMessageStats } from '../analytics/messageStats';
import { calculateReplyTime } from '../analytics/replyTime';
import { calculateActivityStats } from '../analytics/activityStats';
import { calculateWordStats } from '../analytics/wordStats';
import { calculateEmojiStats } from '../analytics/emojiStats';
import { calculateEngagementStats } from '../analytics/engagementStats';
import { calculateStreakStats } from '../analytics/streakStats';
import { generateRelationshipProfile } from '../analytics/generateRelationshipProfile';

const API_BASE = 'http://localhost:3000';

function App() {
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<'no-whatsapp' | 'no-chat' | 'error' | null>(null);
  const [detectedChatName, setDetectedChatName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  const [activeWrapId, setActiveWrapId] = useState<string | null>(() => localStorage.getItem('activeWrapId'));
  const wrapState = useWrapStatus(activeWrapId);

  // Check connection to WhatsApp Web tab on mount
  useEffect(() => {
    if (activeWrapId) {
      setLoading(false);
      return; // Skip checking chat if we are already resuming a Wrap
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTab = tabs[0];

      if (!activeTab || !activeTab.id || !activeTab.url) {
        setErrorState('error');
        setLoading(false);
        return;
      }

      if (!activeTab.url.includes('web.whatsapp.com')) {
        setErrorState('no-whatsapp');
        setLoading(false);
        return;
      }

      chrome.tabs.sendMessage(
        activeTab.id,
        { type: 'GET_CURRENT_CHAT' },
        (response: CurrentChatResponse) => {
          if (!chrome.runtime.lastError && response?.chatName) {
            setDetectedChatName(response.chatName);
          }
          setLoading(false);
        }
      );
    });
  }, [activeWrapId]);

  const handleCreateWrapped = () => {
    setIsParsing(true);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTab = tabs[0];
      if (!activeTab || !activeTab.id) {
        setErrorState('error');
        setIsParsing(false);
        return;
      }

      chrome.tabs.sendMessage(
        activeTab.id,
        { type: 'GET_CURRENT_CONVERSATION' },
        async (response: CurrentChatResponse) => {
          if (chrome.runtime.lastError || !response?.success || !response.data) {
            setErrorState(chrome.runtime.lastError ? 'error' : 'no-chat');
            setIsParsing(false);
            return;
          }

          try {
            const { chatName, messages } = response.data;
            
            // ─── Frontend Analytics Calculation ───
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

            // ─── POST to Backend ───
            const apiResponse = await fetch(`${API_BASE}/api/wraps`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chatName,
                analytics: profile,
              }),
            });

            if (!apiResponse.ok) {
              throw new Error(`Backend error: ${apiResponse.status}`);
            }

            const result = await apiResponse.json();

            if (result.success && result.wrapId) {
              localStorage.setItem('activeWrapId', result.wrapId);
              setActiveWrapId(result.wrapId);
            } else {
              throw new Error('Failed to start Wrap job');
            }
          } catch (err) {
            console.error('[ChatWrapped] Creation failed:', err);
            setErrorState('error');
          } finally {
            setIsParsing(false);
          }
        }
      );
    });
  };

  const handleReset = () => {
    localStorage.removeItem('activeWrapId');
    setActiveWrapId(null);
    setErrorState(null);
    setLoading(true);
    // Setting loading to true will trigger the useEffect to remount/re-check the page
    window.location.reload(); 
  };

  const handleReloadTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    });
  };

  // ── Render logic ──────────────────────────────────────────────────────────

  if (loading) return <StatusView message="Connecting to WhatsApp..." />;

  // ── Async Polling States ──
  if (wrapState.status === 'pending') {
    return <StatusView message="Your Wrapped is being prepared..." />;
  }

  if (wrapState.status === 'processing') {
    return <StatusView message="Almost there... Putting your Wrapped together." />;
  }

  if (wrapState.status === 'failed') {
    return (
      <StatusView
        message={`Something went wrong: ${wrapState.error || 'Unable to generate analysis'}`}
        actionButton={<Button onClick={handleReset}>Try Again</Button>}
      />
    );
  }

  if (wrapState.status === 'completed' && wrapState.profile && wrapState.wrapped && wrapState.chatName) {
    return (
      <WrappedView 
        data={{
          success: true,
          chatName: wrapState.chatName,
          profile: wrapState.profile,
          wrapped: wrapState.wrapped
        }}
        onBack={handleReset} 
      />
    );
  }

  // ── Error States ──
  if (errorState === 'no-whatsapp') {
    return (
      <StatusView
        message="Open WhatsApp Web and select a conversation first."
        actionButton={<Button onClick={() => window.close()}>Close</Button>}
      />
    );
  }

  if (errorState === 'no-chat' || errorState === 'error') {
    const isDisconnected = errorState === 'error';
    return (
      <StatusView
        message={isDisconnected
          ? 'Extension disconnected or backend unreachable. Please try again.'
          : 'Please open a conversation first.'}
        actionButton={
          <Button onClick={isDisconnected ? handleReloadTab : handleReset}>
            {isDisconnected ? 'Reload Tab' : 'Try Again'}
          </Button>
        }
      />
    );
  }

  // ── Default State ──
  return (
    <WelcomeView
      chatName={detectedChatName || 'your friend'}
      onStart={handleCreateWrapped}
      isParsing={isParsing}
    />
  );
}

export default App;
