import { useEffect, useState } from 'react';
import type { CurrentChatResponse } from '../shared/types';

function App() {
  const [chatName, setChatName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [interactionState, setInteractionState] = useState<'idle' | 'preparing' | 'coming-soon'>('idle');
  const [errorState, setErrorState] = useState<'no-whatsapp' | 'no-chat' | 'error' | null>(null);

  useEffect(() => {
    // Check if we're on WhatsApp Web
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

      // Send message to content script
      chrome.tabs.sendMessage(
        activeTab.id,
        { type: 'GET_CURRENT_CHAT' },
        (response: CurrentChatResponse) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            setErrorState('error');
          } else if (response && response.chatName) {
            setChatName(response.chatName);
          } else {
            setErrorState('no-chat');
          }
          setLoading(false);
        }
      );
    });
  }, []);

  const handleCreateWrapped = () => {
    console.log('Create Wrapped clicked');
    setInteractionState('preparing');
    
    setTimeout(() => {
      setInteractionState('coming-soon');
    }, 1500);
  };

  if (loading) {
    return (
      <>
        <h1>Chat Wrapped</h1>
        <div className="status-message">Finding your conversation...</div>
      </>
    );
  }

  if (errorState === 'no-whatsapp') {
    return (
      <>
        <h1>Chat Wrapped</h1>
        <div className="status-message">Open WhatsApp Web to continue.</div>
        <button onClick={() => window.close()}>Close</button>
      </>
    );
  }

  if (errorState === 'no-chat' || errorState === 'error') {
    return (
      <>
        <h1>Chat Wrapped</h1>
        <div className="status-message">
          {errorState === 'no-chat' 
            ? 'Open a conversation first.' 
            : 'Extension disconnected. Please reload this WhatsApp tab.'}
        </div>
        <button onClick={() => {
          if (errorState === 'error') {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs[0]?.id) {
                chrome.tabs.reload(tabs[0].id);
              }
            });
          } else {
            window.location.reload();
          }
        }}>
          {errorState === 'error' ? 'Reload Tab' : 'Try Again'}
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Chat Wrapped</h1>
      
      <div className="subtitle">Let's create your</div>
      <h2>Chat Wrapped</h2>
      
      <div className="chat-name">with {chatName || 'your conversation'}</div>
      
      <p className="description">
        Turn your conversation into something worth looking at.
      </p>

      <button 
        onClick={handleCreateWrapped}
        disabled={interactionState !== 'idle'}
      >
        {interactionState === 'idle' ? "Let's Create Wrapped" : 
         interactionState === 'preparing' ? "Preparing..." : "Coming Soon!"}
      </button>

      <div className="interaction-text">
        {interactionState === 'preparing' && 'Preparing your Wrapped...'}
        {interactionState === 'coming-soon' && 'Coming soon.'}
      </div>
    </>
  );
}

export default App;
