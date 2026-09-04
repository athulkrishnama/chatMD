export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string | null;
  date: string | null;
  type: "text" | "media" | "system";
  isOutgoing: boolean;
}

export interface ChatConversation {
  chatName: string;
  participants: string[];
  messages: ChatMessage[];
}

export interface CurrentChatResponse {
  success: boolean;
  data?: ChatConversation;
  chatName?: string | null;
  error?: string;
}

export type ExtensionMessage = 
  | { type: 'GET_CURRENT_CONVERSATION' }
  | { type: 'GET_CURRENT_CHAT' };
