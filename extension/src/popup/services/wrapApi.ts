import type { WrapHistoryResponse } from '../../shared/wrappedTypes';

const API_BASE = 'http://localhost:3000';

export const wrapApi = {
  async getDeviceWraps(deviceId: string): Promise<WrapHistoryResponse> {
    const res = await fetch(`${API_BASE}/api/wraps/device/${deviceId}`);
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  },

  async createWrap(creatorName: string, deviceId: string, chatName: string, analytics: any) {
    const res = await fetch(`${API_BASE}/api/wraps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creatorName, deviceId, chatName, analytics }),
    });
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    return res.json();
  }
};
