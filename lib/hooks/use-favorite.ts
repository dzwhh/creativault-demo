'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Favorite } from '@/lib/types';

interface UseFavoriteOptions {
  userId?: string;
}

interface UseFavoriteReturn {
  isFavorited: boolean;
  loading: boolean;
  error: string | null;
  toggle: () => Promise<void>;
  favoriteCount: number;
}

const mockUserId = 'user1'; // In real app, get from auth context

export function useFavorite(
  targetType: Favorite['targetType'],
  targetId: string,
  options: UseFavoriteOptions = {}
): UseFavoriteReturn {
  const { userId = mockUserId } = options;
  
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const checkFavoriteStatus = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`/api/favorites?targetType=${targetType}&targetId=${targetId}&userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited || false);
        setFavoriteCount(data.count || 0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check favorite status');
    }
  }, [targetType, targetId, userId]);

  const toggle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Optimistic update
      const previousState = isFavorited;
      const previousCount = favoriteCount;
      setIsFavorited(!previousState);
      setFavoriteCount(previousState ? previousCount - 1 : previousCount + 1);

      const method = isFavorited ? 'DELETE' : 'POST';
      const response = await fetch('/api/favorites', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetType,
          targetId,
          userId,
        }),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        setIsFavorited(previousState);
        setFavoriteCount(previousCount);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update with server response
      setIsFavorited(data.isFavorited || false);
      setFavoriteCount(data.count || 0);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle favorite');
    } finally {
      setLoading(false);
    }
  }, [targetType, targetId, userId, isFavorited, favoriteCount]);

  useEffect(() => {
    if (targetId && targetType) {
      checkFavoriteStatus();
    }
  }, [checkFavoriteStatus, targetId, targetType]);

  return {
    isFavorited,
    loading,
    error,
    toggle,
    favoriteCount,
  };
}