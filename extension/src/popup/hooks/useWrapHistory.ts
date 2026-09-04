import { useState, useEffect, useCallback } from 'react';
import { getDeviceId } from '../../shared/device';
import { wrapApi } from '../services/wrapApi';
import type { WrapHistoryItem } from '../../shared/wrappedTypes';

export function useWrapHistory() {
  const [wraps, setWraps] = useState<WrapHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const deviceId = getDeviceId();
      const data = await wrapApi.getDeviceWraps(deviceId);
      if (data.success) {
        setWraps(data.wraps);
      } else {
        throw new Error('Failed to load history');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { wraps, loading, error, refresh: fetchHistory };
}
