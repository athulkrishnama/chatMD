export interface CurrentChatResponse {
  chatName: string | null;
  error?: string;
}

export type ExtensionMessage = 
  | { type: 'GET_CURRENT_CHAT' };
