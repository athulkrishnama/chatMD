import type { ExtensionMessage, CurrentChatResponse } from '../shared/types';

function getCurrentChatName(): string | null {
  try {
    // Attempt to find the chat name in the main chat header
    // WhatsApp Web DOM changes frequently, so we try a few common patterns
    const mainArea = document.getElementById('main');
    if (!mainArea) return null;

    const header = mainArea.querySelector('header');
    if (!header) return null;

    // The chat name is usually in a span with dir="auto" inside the header
    const nameSpans = header.querySelectorAll('span[dir="auto"]');
    
    // Usually the first or second such span contains the name
    for (const span of Array.from(nameSpans)) {
      const text = span.textContent?.trim();
      if (text) {
        return text;
      }
    }

    return null;
  } catch (error) {
    console.error('Error detecting WhatsApp chat name:', error);
    return null;
  }
}

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender: chrome.runtime.MessageSender, sendResponse: (response: CurrentChatResponse) => void) => {
    if (message.type === 'GET_CURRENT_CHAT') {
      const chatName = getCurrentChatName();
      sendResponse({ chatName });
    }
    return true; // Keep the message channel open for async response if needed
  }
);

console.log('Chat Wrapped content script loaded.');
