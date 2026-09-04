import { useEffect, useState } from 'react';
import type { CurrentChatResponse } from '../shared/types';
import type { AnalyzeApiResponse } from '../shared/wrappedTypes';
import {
  Button,
  StatusView,
  WelcomeView,
  WrappedView,
} from './components';

const API_BASE = 'http://localhost:3000';

type InteractionState = 'idle' | 'parsing' | 'analyzing' | 'done' | 'backend_error';

function App() {
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<'no-whatsapp' | 'no-chat' | 'error' | null>(null);
  const [interactionState, setInteractionState] = useState<InteractionState>('idle');
  const [detectedChatName, setDetectedChatName] = useState<string | null>(null);
  const [wrappedData, setWrappedData] = useState<AnalyzeApiResponse | null>(null);

  // Check connection to WhatsApp Web tab on mount and detect current chat name
  useEffect(() => {
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
  }, []);

  const handleCreateWrapped = () => {
    setInteractionState('parsing');

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTab = tabs[0];
      if (!activeTab || !activeTab.id) {
        setErrorState('error');
        return;
      }

      chrome.tabs.sendMessage(
        activeTab.id,
        { type: 'GET_CURRENT_CONVERSATION' },
        async (response: CurrentChatResponse) => {
          if (chrome.runtime.lastError || !response?.success || !response.data) {
            setErrorState(chrome.runtime.lastError ? 'error' : 'no-chat');
            return;
          }

          // Phase 2: Send to backend for analytics + AI
          setInteractionState('analyzing');

          try {
            const apiResponse = await fetch(`${API_BASE}/api/analyze`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chatName: response.data.chatName,
                participants: response.data.participants,
                messages: response.data.messages,
              }),
            });

            if (!apiResponse.ok) {
              throw new Error(`Backend error: ${apiResponse.status}`);
            }

            const result: AnalyzeApiResponse = await apiResponse.json();

            if (!result.success) {
              throw new Error(result.error ?? 'Unknown backend error');
            }

            setWrappedData(result);
            setInteractionState('done');
          } catch (err) {
            console.error('[ChatWrapped] Backend call failed:', err);
            setInteractionState('backend_error');
          }
        }
      );
    });
  };

  const handleReloadTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) chrome.tabs.reload(tabs[0].id);
    });
  };

  const handleReset = () => {
    setInteractionState('idle');
    setWrappedData(null);
    setErrorState(null);
  };

  // ── Render logic ──────────────────────────────────────────────────────────

  if (loading) return <StatusView message="Connecting to WhatsApp..." />;

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
          ? 'Extension disconnected. Please reload this WhatsApp tab.'
          : 'Please open a conversation first.'}
        actionButton={
          <Button onClick={isDisconnected ? handleReloadTab : handleReset}>
            {isDisconnected ? 'Reload Tab' : 'Try Again'}
          </Button>
        }
      />
    );
  }

  if (interactionState === 'backend_error') {
    return (
      <StatusView
        message="Could not reach the backend. Make sure the API server is running at localhost:3000."
        actionButton={<Button onClick={handleReset}>Try Again</Button>}
      />
    );
  }

  if (interactionState === 'parsing') {
    return <StatusView message="Scanning messages... (this may take a moment)" />;
  }

  if (interactionState === 'analyzing') {
    return <StatusView message="Analyzing your chat with AI..." />;
  }

  if (interactionState === 'done' && wrappedData) {
    return <WrappedView data={wrappedData} onBack={handleReset} />;
  }

  // Default: Welcome screen
  return (
    <WelcomeView
      chatName={detectedChatName || 'your friend'}
      onStart={handleCreateWrapped}
      isParsing={false}
    />
  );
}

export default App;
