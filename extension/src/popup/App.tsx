import { useEffect, useState } from 'react';
import type { CurrentChatResponse } from '../shared/types';
import {
  Button,
  StatusView,
  WelcomeView,
  WrappedView,
  SetupView,
  HistoryView
} from './components';
import { useWrapStatus } from './hooks/useWrapStatus';
import { useWrapHistory } from './hooks/useWrapHistory';
import { wrapApi } from './services/wrapApi';
import { getDeviceId, getCreatorName } from '../shared/device';

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

type AppState = 'initializing' | 'setup' | 'history' | 'creating' | 'viewing';

function App() {
  const [appState, setAppState] = useState<AppState>('initializing');
  
  // Creation state
  const [errorState, setErrorState] = useState<'no-whatsapp' | 'no-chat' | 'error' | null>(null);
  const [detectedChatName, setDetectedChatName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // Storage
  const [activeWrapId, setActiveWrapId] = useState<string | null>(() => localStorage.getItem('activeWrapId'));
  const wrapState = useWrapStatus(activeWrapId);
  const history = useWrapHistory();
  const creatorName = getCreatorName();

  // ── Initialization ──
  useEffect(() => {
    if (!creatorName) {
      setAppState('setup');
      return;
    }

    if (activeWrapId && (wrapState.status === 'pending' || wrapState.status === 'processing')) {
      // If we are currently processing something, prioritize viewing it
      setAppState('viewing');
      return;
    }

    // Default to history view once setup is complete
    setAppState('history');
  }, [creatorName, activeWrapId, wrapState.status]);

  // ── Handlers ──
  const handleSetupComplete = () => {
    setAppState('history');
  };

  const handleCreateNewClick = () => {
    setAppState('creating');
    
    // Check WhatsApp context immediately when entering creation flow
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTab = tabs[0];
      if (!activeTab || !activeTab.id || !activeTab.url) {
        setErrorState('error');
        return;
      }

      if (!activeTab.url.includes('web.whatsapp.com')) {
        setErrorState('no-whatsapp');
        return;
      }

      chrome.tabs.sendMessage(
        activeTab.id,
        { type: 'GET_CURRENT_CHAT' },
        (response: CurrentChatResponse) => {
          if (!chrome.runtime.lastError && response?.chatName) {
            setDetectedChatName(response.chatName);
          }
        }
      );
    });
  };

  const handleStartParsing = () => {
    setIsParsing(true);
    setErrorState(null);

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
            const currentCreator = getCreatorName() || 'Unknown';
            const currentDevice = getDeviceId();
            
            // Analytics
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

            // API POST
            const result = await wrapApi.createWrap(currentCreator, currentDevice, chatName, profile);

            if (result.success && result.wrapId) {
              localStorage.setItem('activeWrapId', result.wrapId);
              setActiveWrapId(result.wrapId);
              setAppState('viewing');
              history.refresh(); // Update history in the background
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

  const handleSelectHistoryItem = (wrapId: string) => {
    localStorage.setItem('activeWrapId', wrapId);
    setActiveWrapId(wrapId);
    setAppState('viewing');
  };

  const handleBackToHistory = () => {
    localStorage.removeItem('activeWrapId');
    setActiveWrapId(null);
    setAppState('history');
  };

  const handleReloadTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    });
  };

  // ── Render ──

  if (appState === 'initializing') {
    return <StatusView message="Loading..." />;
  }

  if (appState === 'setup') {
    return <SetupView onComplete={handleSetupComplete} />;
  }

  if (appState === 'history') {
    if (history.loading && history.wraps.length === 0) {
      return <StatusView message="Loading your history..." />;
    }
    
    if (history.error && history.wraps.length === 0) {
      return (
        <StatusView
          message="Couldn't load your Wrappeds."
          actionButton={<Button onClick={history.refresh}>Try Again</Button>}
        />
      );
    }

    return (
      <HistoryView 
        wraps={history.wraps}
        creatorName={creatorName || ''}
        onSelect={handleSelectHistoryItem}
        onCreateNew={handleCreateNewClick}
      />
    );
  }

  if (appState === 'creating') {
    if (errorState === 'no-whatsapp') {
      return (
        <StatusView
          message="Open WhatsApp Web and select a conversation first."
          actionButton={<Button onClick={() => setAppState('history')}>Back to History</Button>}
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
            <div className="flex gap-2 w-full max-w-[240px]">
              <Button onClick={() => setAppState('history')}>Cancel</Button>
              <Button onClick={isDisconnected ? handleReloadTab : handleCreateNewClick}>
                {isDisconnected ? 'Reload' : 'Retry'}
              </Button>
            </div>
          }
        />
      );
    }

    return (
      <WelcomeView
        chatName={detectedChatName || 'your friend'}
        onStart={handleStartParsing}
        isParsing={isParsing}
      />
    );
  }

  if (appState === 'viewing') {
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
          actionButton={<Button onClick={handleBackToHistory}>Back to History</Button>}
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
          onBack={handleBackToHistory} 
        />
      );
    }
    
    // Fallback if viewing state is broken
    return <StatusView message="Loading Wrapped..." />;
  }

  return null;
}

export default App;
