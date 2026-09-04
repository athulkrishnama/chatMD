import { useState, useEffect } from 'react';
import type { RelationshipProfile, WrappedInsight } from '../../shared/wrappedTypes';

const API_BASE = 'http://localhost:3000';

export type WrapStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'idle';

export interface WrapState {
  status: WrapStatus;
  chatName?: string;
  profile?: RelationshipProfile;
  wrapped?: WrappedInsight;
  error?: string;
}

export function useWrapStatus(wrapId: string | null) {
  const [state, setState] = useState<WrapState>({ status: 'idle' });

  useEffect(() => {
    if (!wrapId) {
      setState({ status: 'idle' });
      return;
    }

    let isMounted = true;
    let timeoutId: number;

    const poll = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/wraps/${wrapId}`);
        if (!res.ok) throw new Error('Failed to fetch status');
        
        const data = await res.json();
        
        if (!isMounted) return;

        if (data.status === 'completed') {
          setState({
            status: 'completed',
            chatName: data.data.chatName,
            profile: data.data.analytics,
            wrapped: data.data.relationship,
          });
          return; // Stop polling
        }

        if (data.status === 'failed') {
          setState({ status: 'failed', error: data.error });
          return; // Stop polling
        }

        setState({ status: data.status });

        // Continue polling if still pending/processing
        timeoutId = window.setTimeout(poll, 2000);
      } catch (err) {
        if (!isMounted) return;
        console.error('Polling error:', err);
        // Retry polling even on network error
        timeoutId = window.setTimeout(poll, 3000);
      }
    };

    poll();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [wrapId]);

  return state;
}

