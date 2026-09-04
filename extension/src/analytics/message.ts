// ─── Raw message shape from the Chrome extension ───────────────────────────
export interface RawMessage {
  id: string;
  sender: string;        // "You" | chatName | group member name
  text: string;
  timestamp: string | null;   // e.g. "10:42 pm"
  date: string | null;        // e.g. "4/9/2026"
  type: 'text' | 'media' | 'system';
  isOutgoing: boolean;
}

// ─── Normalised form used internally by all analytics ────────────────────────
export interface NormalizedMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'media' | 'system';
  isOutgoing: boolean;
}

// ─── Payload the extension POSTs to /api/analyze ─────────────────────────────
export interface AnalyzeRequest {
  chatName: string;
  participants: string[];
  messages: RawMessage[];
}
