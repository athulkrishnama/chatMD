import type { ExtensionMessage, CurrentChatResponse, ChatMessage, ChatConversation } from '../shared/types';

const EXCLUDED_HEADER_WORDS = [
  'profile',
  'contact',
  'group info',
  'business details',
  'search',
  'menu',
  'online',
  'last seen',
  'typing',
  'click here',
];

function isCurrentChatGroup(): boolean {
  try {
    const mainArea = document.getElementById('main');
    if (!mainArea) return false;

    const header = mainArea.querySelector('header');
    if (!header) return false;

    const headerText = header.textContent?.toLowerCase() || '';
    if (headerText.includes('group info') || headerText.includes('click here for group info')) {
      return true;
    }

    const spans = header.querySelectorAll('span');
    for (const span of Array.from(spans)) {
      const text = span.textContent?.trim() || '';
      if (text.includes(',') && text.split(',').length >= 2) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

function getCurrentChatName(): string {
  try {
    const mainArea = document.getElementById('main');
    if (!mainArea) return 'Unknown Chat';

    const header = mainArea.querySelector('header');
    if (!header) return 'Unknown Chat';

    const candidateSpans = header.querySelectorAll('span[title], span[dir="auto"], span.selectable-text');
    for (const el of Array.from(candidateSpans)) {
      if (el.tagName.toLowerCase() === 'title' || el.closest('button')) continue;

      const text = el.getAttribute('title')?.trim() || el.textContent?.trim() || '';
      if (!text || text.length === 0) continue;

      const lower = text.toLowerCase();
      const isExcluded = EXCLUDED_HEADER_WORDS.some((word) => lower.includes(word));
      if (!isExcluded) {
        return text;
      }
    }

    return 'Unknown Chat';
  } catch (error) {
    console.error('[ChatWrapped] Error detecting chat name:', error);
    return 'Unknown Chat';
  }
}

function extractDateFromDivider(rawText: string): string | null {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  const now = new Date();
  if (lower === 'today') {
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  }
  if (lower === 'yesterday') {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return `${yesterday.getDate()}/${yesterday.getMonth() + 1}/${yesterday.getFullYear()}`;
  }

  // Check if it's a day of the week (within last 7 days)
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayIndex = days.indexOf(lower);
  if (dayIndex !== -1) {
    const currentDay = now.getDay();
    let diff = currentDay - dayIndex;
    if (diff <= 0) diff += 7;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() - diff);
    return `${targetDate.getDate()}/${targetDate.getMonth() + 1}/${targetDate.getFullYear()}`;
  }

  // Check if it's already a formatted date like 30/8/2026 or 30/08/2026
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(text)) {
    return text;
  }

  // Try parsing Date (e.g. "30 August 2026" or "August 30, 2026")
  const parsed = Date.parse(text);
  if (!isNaN(parsed) && parsed > 0) {
    const d = new Date(parsed);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  return null;
}

function extractTimestampAndSender(
  element: Element,
  _chatName: string
): { timestamp: string | null; date: string | null; sender: string } {
  let timestamp: string | null = null;
  let date: string | null = null;
  let sender = '';

  // 1. Primary: data-pre-plain-text="[10:04 pm, 30/8/2026] Athul Krishna M A: "
  const copyableDiv = element.querySelector('[data-pre-plain-text]');
  if (copyableDiv) {
    const preText = copyableDiv.getAttribute('data-pre-plain-text') || '';
    const bracketMatch = preText.match(/\[([^,]+),\s*([^\]]+)\]/);
    if (bracketMatch) {
      timestamp = bracketMatch[1].trim();
      date = bracketMatch[2].trim();
    }

    const senderMatch = preText.match(/\]\s*([^:]+):/);
    if (senderMatch && senderMatch[1]) {
      sender = senderMatch[1].trim();
    }
  }

  // 2. Secondary: span[aria-label] (e.g. <span aria-label="Mithun:"></span>)
  if (!sender) {
    const ariaLabelEl = element.querySelector('span[aria-label]');
    if (ariaLabelEl) {
      const label = ariaLabelEl.getAttribute('aria-label') || '';
      if (label.endsWith(':')) {
        sender = label.slice(0, -1).trim();
      }
    }
  }

  // 3. Third: author badge for group messages
  if (!sender) {
    const authorSpan = element.querySelector(
      '[data-testid="author"], [data-testid="author-name"], span[style*="color"][dir="auto"]'
    );
    if (authorSpan?.textContent?.trim()) {
      sender = authorSpan.textContent.trim();
    }
  }

  // 4. Outgoing check by delivery marks or tail
  const isOutgoing =
    element.querySelector(
      '[data-testid="tail-out"], [data-icon="tail-out"], [data-testid="msg-check"], [data-testid="msg-dblcheck"], [data-icon*="check"], [data-icon="msg-time"]'
    ) !== null;

  if (isOutgoing && !sender) {
    sender = 'You';
  }

  // Fallback for timestamp
  if (!timestamp) {
    const metaSpan = element.querySelector('[data-testid="msg-meta"] span');
    if (metaSpan?.textContent) {
      timestamp = metaSpan.textContent.trim();
    } else {
      const timeRegex = /\d{1,2}:\d{2}\s?(AM|PM|am|pm)?/i;
      const allSpans = element.querySelectorAll('span');
      for (const s of Array.from(allSpans)) {
        const text = s.textContent?.trim() || '';
        if (timeRegex.test(text)) {
          const match = text.match(timeRegex);
          if (match) {
            timestamp = match[0];
            break;
          }
        }
      }
    }
  }

  return { timestamp, date, sender };
}

async function scrapeAllMessages(chatName: string): Promise<ChatMessage[]> {
  const mainArea = document.getElementById('main');
  if (!mainArea) return [];

  const scrollContainer = mainArea.querySelector('div[role="region"], div[data-testid="conversation-panel-messages"]') as HTMLElement;
  if (!scrollContainer) {
    console.error('[ChatWrapped] Scroll container not found.');
    return [];
  }

  const isGroup = isCurrentChatGroup();
  
  const messageMap = new Map<string, ChatMessage>();
  const learnedSelfNames = new Set<string>(['you']);
  let activeDate: string | null = null;

  const parseCurrentView = () => {
    const allRows = mainArea.querySelectorAll(
      'div[data-testid^="conv-msg-"], div[data-id], div[role="row"]'
    );

    Array.from(allRows).forEach((element, index) => {
      try {
        const selectableSpan = element.querySelector('[data-testid="selectable-text"], span.selectable-text');
        const copyableText = element.querySelector('.copyable-text');
        const hasMedia = element.querySelector('img, video, audio');

        if (!selectableSpan && !copyableText && !hasMedia) {
          const dateSpan = element.querySelector('[data-testid="date-caption"], span[dir="auto"]');
          if (dateSpan?.textContent) {
            const parsedDividerDate = extractDateFromDivider(dateSpan.textContent);
            if (parsedDividerDate) activeDate = parsedDividerDate;
          }
          return;
        }

        const dataId = element.getAttribute('data-id') || element.getAttribute('data-testid')?.replace('conv-msg-', '') || '';
        
        let text = '';
        if (selectableSpan) {
          text = selectableSpan.textContent?.trim() || '';
        } else if (copyableText) {
          text = copyableText.textContent?.trim() || '';
        }

        let type: 'text' | 'media' | 'system' = 'text';
        if (!text && hasMedia) {
          type = 'media';
          const isImg = element.querySelector('img');
          const isVideo = element.querySelector('video');
          const isAudio = element.querySelector('audio');
          text = isImg ? '[Image]' : isVideo ? '[Video]' : isAudio ? '[Audio]' : '[Media]';
        }

        if (!text) text = '[Unsupported or empty message]';

        const { timestamp, date: rawDate, sender } = extractTimestampAndSender(element, chatName);
        if (rawDate) activeDate = rawDate;
        const finalDate = rawDate || activeDate;

        const hasTailOut = element.querySelector('[data-testid="tail-out"], [data-icon="tail-out"]') !== null;
        const hasDeliveryChecks = element.querySelector('[data-testid="msg-check"], [data-testid="msg-dblcheck"], [data-icon*="check"], [data-icon="msg-time"]') !== null;
        const isExplicitOutgoing = hasTailOut || hasDeliveryChecks || sender.toLowerCase() === 'you';

        let isOutgoing = isExplicitOutgoing;
        if (!isGroup && chatName && chatName !== 'Unknown Chat') {
          if (sender && sender.toLowerCase() !== chatName.toLowerCase()) {
            isOutgoing = true;
          }
        }

        if (isOutgoing && sender && sender.toLowerCase() !== 'you' && !sender.toLowerCase().includes('profile')) {
          learnedSelfNames.add(sender.toLowerCase());
        }

        const id = dataId || `${index}_${timestamp || 'notime'}_${text.slice(0, 10)}`;

        if (!messageMap.has(id)) {
          messageMap.set(id, {
            id, sender, text, timestamp, date: finalDate, type, isOutgoing
          });
        }
      } catch (e) {
        console.warn('[ChatWrapped] Error parsing message element:', e);
      }
    });
  };

  let previousScrollTop = scrollContainer.scrollTop;
  let unchangedCount = 0;
  const MAX_UNCHANGED = 3;
  const MAX_SCROLLS = 40;
  let scrolls = 0;

  console.log('[ChatWrapped] Starting message scrape loop...');
  
  while (unchangedCount < MAX_UNCHANGED && scrolls < MAX_SCROLLS) {
    parseCurrentView();

    const scrollAmount = scrollContainer.clientHeight || 800;
    scrollContainer.scrollTop -= scrollAmount;
    scrolls++;

    await new Promise((resolve) => setTimeout(resolve, 600));

    if (scrollContainer.scrollTop === previousScrollTop || scrollContainer.scrollTop === 0) {
      unchangedCount++;
    } else {
      unchangedCount = 0;
      previousScrollTop = scrollContainer.scrollTop;
    }
  }

  parseCurrentView();
  console.log(`[ChatWrapped] Scraped ${messageMap.size} messages in ${scrolls} scrolls.`);
  
  // Try to scroll back to bottom
  scrollContainer.scrollTop = scrollContainer.scrollHeight;

  const rawList = Array.from(messageMap.values());
  let fallbackDate: string | null = null;
  for (const m of rawList) {
    if (m.date) { fallbackDate = m.date; break; }
  }

  const uniqueMessages = new Map<string, ChatMessage>();
  rawList.forEach((msg) => {
    let finalSender = msg.sender;
    let finalOutgoing = msg.isOutgoing;
    const finalDate = msg.date || fallbackDate;
    const lowerSender = finalSender.toLowerCase();

    if (learnedSelfNames.has(lowerSender) || lowerSender === 'you') {
      finalSender = 'You';
      finalOutgoing = true;
    } else if (!isGroup && chatName && chatName !== 'Unknown Chat') {
      if (lowerSender !== chatName.toLowerCase()) {
        finalSender = 'You';
        finalOutgoing = true;
      }
    }

    if (!finalSender || finalSender.toLowerCase().includes('profile') || finalSender.toLowerCase().includes('details')) {
      finalSender = finalOutgoing ? 'You' : (isGroup ? 'Participant' : chatName);
    }

    if (!uniqueMessages.has(msg.id)) {
      uniqueMessages.set(msg.id, {
        id: msg.id, sender: finalSender, text: msg.text, timestamp: msg.timestamp, date: finalDate, type: msg.type, isOutgoing: finalOutgoing
      });
    }
  });

  return Array.from(uniqueMessages.values());
}

async function getCurrentConversation(): Promise<ChatConversation | null> {
  const mainArea = document.getElementById('main');
  if (!mainArea) return null;

  const chatName = getCurrentChatName();
  if (chatName === 'Unknown Chat') return null;

  const messages = await scrapeAllMessages(chatName);

  const participantsSet = new Set<string>();
  participantsSet.add('You');
  if (chatName !== 'Unknown Chat') participantsSet.add(chatName);

  messages.forEach((m) => {
    if (m.sender && !m.sender.toLowerCase().includes('profile')) {
      participantsSet.add(m.sender);
    }
  });

  return {
    chatName,
    participants: Array.from(participantsSet),
    messages,
  };
}

chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: CurrentChatResponse) => void
  ) => {
    if (message.type === 'GET_CURRENT_CHAT') {
      try {
        const chatName = getCurrentChatName();
        sendResponse({
          success: chatName !== 'Unknown Chat',
          chatName: chatName !== 'Unknown Chat' ? chatName : null,
        });
      } catch (e) {
        sendResponse({ success: false, chatName: null });
      }
      return true;
    }

    if (message.type === 'GET_CURRENT_CONVERSATION') {
      getCurrentConversation().then((conversation) => {
        if (conversation) {
          console.log('[ChatWrapped] Loaded conversation data:', conversation);
          sendResponse({ success: true, data: conversation });
        } else {
          sendResponse({
            success: false,
            error: 'Unable to read the current conversation. Please open a chat.',
          });
        }
      }).catch((e) => {
        console.error('[ChatWrapped] Error reading conversation:', e);
        sendResponse({ success: false, error: 'Failed to read conversation.' });
      });
      return true; // Indicate async response
    }
    
    return true;
  }
);

console.log('[ChatWrapped] Content script loaded successfully.');
