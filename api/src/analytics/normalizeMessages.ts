import type { RawMessage, NormalizedMessage } from '../types/message';

/**
 * Parses WhatsApp date + time strings into a proper Date object.
 * Handles formats like: "4/9/2026" + "10:42 pm" | "10:42 PM" | "22:42"
 */
function parseWhatsAppDateTime(
  dateStr: string | null,
  timeStr: string | null,
  fallback: Date
): Date {
  if (!dateStr && !timeStr) return fallback;

  // Parse date portion
  let day = fallback.getDate();
  let month = fallback.getMonth(); // 0-indexed
  let year = fallback.getFullYear();

  if (dateStr) {
    // Format: "D/M/YYYY" or "DD/MM/YYYY"
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1;
      year = parseInt(parts[2], 10);
    }
  }

  // Parse time portion
  let hours = fallback.getHours();
  let minutes = fallback.getMinutes();

  if (timeStr) {
    const cleaned = timeStr.trim().toLowerCase();
    const is12hr = cleaned.includes('am') || cleaned.includes('pm');

    if (is12hr) {
      const [timePart, period] = cleaned.split(/\s*(am|pm)/);
      const [h, m] = timePart.split(':').map(Number);
      hours = h % 12 + (period === 'pm' ? 12 : 0);
      minutes = m || 0;
    } else {
      const [h, m] = cleaned.split(':').map(Number);
      hours = h || 0;
      minutes = m || 0;
    }
  }

  const result = new Date(year, month, day, hours, minutes, 0, 0);
  return isNaN(result.getTime()) ? fallback : result;
}

/**
 * Normalize raw messages from the Chrome extension:
 * - Combine date + timestamp strings into a proper Date
 * - Filter out system messages
 * - Deduplicate by id
 * - Sort chronologically
 */
export function normalizeMessages(raw: RawMessage[]): NormalizedMessage[] {
  const seen = new Set<string>();
  const result: NormalizedMessage[] = [];
  const fallbackDate = new Date();

  for (const msg of raw) {
    // Skip system messages
    if (msg.type === 'system') continue;

    // Deduplicate
    if (msg.id && seen.has(msg.id)) continue;
    if (msg.id) seen.add(msg.id);

    // Skip obviously empty messages
    if (!msg.text || msg.text === '[Unsupported or empty message]') continue;

    const timestamp = parseWhatsAppDateTime(msg.date, msg.timestamp, fallbackDate);

    result.push({
      id: msg.id,
      sender: msg.sender,
      text: msg.text,
      timestamp,
      type: msg.type,
      isOutgoing: msg.isOutgoing,
    });
  }

  // Sort chronologically
  result.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  return result;
}
