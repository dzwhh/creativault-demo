'use client';

import { useCallback } from 'react';
import type { TrackEvent } from '@/lib/types';

interface UseTrackEventOptions {
  enableConsoleLog?: boolean;
  enableAnalytics?: boolean;
}

export function useTrackEvent(options: UseTrackEventOptions = {}) {
  const { enableConsoleLog = true, enableAnalytics = false } = options;

  const trackEvent = useCallback(
    (name: string, properties?: Record<string, any>) => {
      const event: TrackEvent = {
        name,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        },
        timestamp: new Date().toISOString(),
      };

      // Console logging for development
      if (enableConsoleLog && process.env.NODE_ENV === 'development') {
        console.log('📊 Track Event:', event);
      }

      // Google Analytics (placeholder)
      if (enableAnalytics && typeof window !== 'undefined') {
        // @ts-ignore
        if (window.gtag) {
          // @ts-ignore
          window.gtag('event', name, properties);
        }
      }

      // Mixpanel (placeholder)
      if (enableAnalytics && typeof window !== 'undefined') {
        // @ts-ignore
        if (window.mixpanel) {
          // @ts-ignore
          window.mixpanel.track(name, properties);
        }
      }

      // Custom analytics endpoint (for future use)
      if (enableAnalytics) {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }).catch((error) => {
          console.error('Failed to track event:', error);
        });
      }
    },
    [enableConsoleLog, enableAnalytics]
  );

  // Convenient tracking methods
  const trackPageView = useCallback(
    (page: string, properties?: Record<string, any>) => {
      trackEvent('page_view', { page, ...properties });
    },
    [trackEvent]
  );

  const trackClick = useCallback(
    (element: string, properties?: Record<string, any>) => {
      trackEvent('click', { element, ...properties });
    },
    [trackEvent]
  );

  const trackSearch = useCallback(
    (query: string, properties?: Record<string, any>) => {
      trackEvent('search', { query, ...properties });
    },
    [trackEvent]
  );

  const trackConversion = useCallback(
    (action: string, value?: number, properties?: Record<string, any>) => {
      trackEvent('conversion', { action, value, ...properties });
    },
    [trackEvent]
  );

  const trackAgentTask = useCallback(
    (taskType: string, taskId: string, status: string, properties?: Record<string, any>) => {
      trackEvent('agent_task', { taskType, taskId, status, ...properties });
    },
    [trackEvent]
  );

  const trackFavorite = useCallback(
    (action: 'add' | 'remove', targetType: string, targetId: string, properties?: Record<string, any>) => {
      trackEvent('favorite', { action, targetType, targetId, ...properties });
    },
    [trackEvent]
  );

  return {
    trackEvent,
    trackPageView,
    trackClick,
    trackSearch,
    trackConversion,
    trackAgentTask,
    trackFavorite,
  };
}