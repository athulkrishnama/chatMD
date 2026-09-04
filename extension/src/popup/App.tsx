import { useEffect, useState } from 'react';
import type { CurrentChatResponse, ChatConversation } from '../shared/types';
import {
  Button,
  StatusView,
  WelcomeView,
  ConversationView,
} from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<'no-whatsapp' | 'no-chat' | 'error' | null>(null);
  const [interactionState, setInteractionState] = useState<'idle' | 'parsing' | 'done'>('idle');
  const [conversation, setConversation] = useState<ChatConversation | null>(null);
  const [detectedChatName, setDetectedChatName] = useState<string | null>(null);

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

      // Try detecting the currently opened chat name for the hero card
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
        (response: CurrentChatResponse) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            setErrorState('error');
          } else if (response && response.success && response.data) {
            console.log('[ChatWrapped] Loaded conversation data:', response.data);
            setConversation(response.data);
            setInteractionState('done');
          } else {
            setErrorState('no-chat');
          }
        }
      );
    });
  };

  const handleReloadTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  };

  // 1. Loading State
  if (loading) {
    return <StatusView message="Connecting to WhatsApp..." />;
  }

  // 2. Not on WhatsApp Web
  if (errorState === 'no-whatsapp') {
    return (
      <StatusView
        message="Open WhatsApp Web and select a conversation first."
        actionButton={<Button onClick={() => window.close()}>Close</Button>}
      />
    );
  }

  // 3. No Chat open or Content Script Disconnected
  if (errorState === 'no-chat' || errorState === 'error') {
    const isDisconnected = errorState === 'error';
    const message = isDisconnected
      ? 'Extension disconnected. Please reload this WhatsApp tab.'
      : 'Please open a conversation first.';

    return (
      <StatusView
        message={message}
        actionButton={
          <Button onClick={isDisconnected ? handleReloadTab : () => window.location.reload()}>
            {isDisconnected ? 'Reload Tab' : 'Try Again'}
          </Button>
        }
      />
    );
  }

  // 4. Conversation Results Screen
  if (interactionState === 'done' && conversation) {
    return (
      <ConversationView
        conversation={conversation}
        onBack={() => setInteractionState('idle')}
      />
    );
  }

  // 5. Default Welcome Screen (matches user mockup)
  return (
    <WelcomeView
      chatName={detectedChatName || 'Rahul'}
      onStart={handleCreateWrapped}
      isParsing={interactionState === 'parsing'}
    />
  );
}

export default App;
