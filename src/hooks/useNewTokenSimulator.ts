/**
 * New Token Simulator Hook
 * Handles simulation of new tokens appearing in real-time
 */

'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getNewTokenSimulator, NewTokenSimulator } from '@/services/newTokenSimulator';
import { tokenQueryKeys } from './useTokens';
import type { Token, TokenCategory } from '@/types';

interface UseNewTokenSimulatorOptions {
  /** Whether to enable the simulator */
  enabled?: boolean;
  /** Interval between new tokens in milliseconds */
  intervalMs?: number;
}

/**
 * Hook to simulate new tokens appearing
 * Automatically adds them to the React Query cache
 */
export function useNewTokenSimulator(options: UseNewTokenSimulatorOptions = {}) {
  const { enabled = true, intervalMs = 5000 } = options;
  const queryClient = useQueryClient();
  const simulatorRef = useRef<NewTokenSimulator | null>(null);

  const handleNewToken = useCallback(
    (token: Token, category: TokenCategory) => {
      // Add to the 'all' query cache
      queryClient.setQueryData(
        tokenQueryKeys.all,
        (old: Record<TokenCategory, Token[]> | undefined) => {
          if (!old) return old;
          
          return {
            ...old,
            [category]: [token, ...old[category]], // Prepend new token at beginning
          };
        }
      );

      // Also update category-specific query if it exists
      queryClient.setQueryData(
        tokenQueryKeys.byCategory(category),
        (old: { tokens: Token[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            tokens: [token, ...old.tokens], // Prepend new token
          };
        }
      );
    },
    [queryClient]
  );

  useEffect(() => {
    if (!enabled) return;

    simulatorRef.current = getNewTokenSimulator(intervalMs);
    simulatorRef.current.start(handleNewToken);

    return () => {
      if (simulatorRef.current) {
        simulatorRef.current.stop();
      }
    };
  }, [enabled, intervalMs, handleNewToken]);

  const stopSimulation = useCallback(() => {
    if (simulatorRef.current) {
      simulatorRef.current.stop();
    }
  }, []);

  const startSimulation = useCallback(() => {
    if (simulatorRef.current) {
      simulatorRef.current.start(handleNewToken);
    }
  }, [handleNewToken]);

  return { stopSimulation, startSimulation };
}


