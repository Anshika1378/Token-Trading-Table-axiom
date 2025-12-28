/**
 * Token Data Hook
 * Manages token data fetching with React Query
 */

'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import type { Token, TokenCategory, SortConfig } from '@/types';
import { fetchTokensByCategory, fetchAllTokens } from '@/services/api';
import { useAppSelector } from '@/store';

// Query keys
export const tokenQueryKeys = {
  all: ['tokens'] as const,
  byCategory: (category: TokenCategory) => ['tokens', category] as const,
  byId: (id: string) => ['tokens', 'detail', id] as const,
};

/**
 * Hook to fetch tokens for a specific category
 */
export function useTokensByCategory(category: TokenCategory) {
  return useQuery({
    queryKey: tokenQueryKeys.byCategory(category),
    queryFn: () => fetchTokensByCategory(category),
    staleTime: 30000, // Consider data stale after 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

/**
 * Hook to fetch all tokens for all categories
 */
export function useAllTokens() {
  return useQuery({
    queryKey: tokenQueryKeys.all,
    queryFn: fetchAllTokens,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

/**
 * Hook to get sorted and filtered tokens
 */
export function useSortedTokens(tokens: Token[], sortConfig: SortConfig): Token[] {
  return useMemo(() => {
    if (!tokens.length) return [];

    const sorted = [...tokens].sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case 'age':
          comparison = a.ageInSeconds - b.ageInSeconds;
          break;
        case 'marketCap':
          comparison = a.metrics.marketCap - b.metrics.marketCap;
          break;
        case 'volume':
          comparison = a.metrics.volume - b.metrics.volume;
          break;
        case 'price':
          comparison = a.metrics.price - b.metrics.price;
          break;
        case 'priceChange':
          comparison = a.metrics.priceChange - b.metrics.priceChange;
          break;
        case 'holders':
          comparison = a.metrics.holders - b.metrics.holders;
          break;
        case 'transactions':
          comparison = a.metrics.transactions - b.metrics.transactions;
          break;
        case 'liquidity':
          comparison = a.metrics.liquidity - b.metrics.liquidity;
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [tokens, sortConfig.field, sortConfig.direction]);
}

/**
 * Hook to invalidate and refetch token data
 */
export function useRefetchTokens() {
  const queryClient = useQueryClient();

  const refetchCategory = useCallback(
    (category: TokenCategory) => {
      queryClient.invalidateQueries({ queryKey: tokenQueryKeys.byCategory(category) });
    },
    [queryClient]
  );

  const refetchAll = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: tokenQueryKeys.all });
  }, [queryClient]);

  return { refetchCategory, refetchAll };
}

/**
 * Hook to update token data in cache (for real-time updates)
 */
export function useUpdateTokenCache() {
  const queryClient = useQueryClient();

  const updateToken = useCallback(
    (tokenId: string, updates: Partial<Token>) => {
      // Update in all category queries
      (['new-pairs', 'final-stretch', 'migrated'] as TokenCategory[]).forEach((category) => {
        queryClient.setQueryData(
          tokenQueryKeys.byCategory(category),
          (old: { tokens: Token[] } | undefined) => {
            if (!old) return old;
            return {
              ...old,
              tokens: old.tokens.map((token) =>
                token.id === tokenId ? { ...token, ...updates } : token
              ),
            };
          }
        );
      });

      // Update in all tokens query
      queryClient.setQueryData(
        tokenQueryKeys.all,
        (old: Record<TokenCategory, Token[]> | undefined) => {
          if (!old) return old;
          const updated: Record<TokenCategory, Token[]> = { ...old };
          (Object.keys(updated) as TokenCategory[]).forEach((category) => {
            updated[category] = updated[category].map((token) =>
              token.id === tokenId ? { ...token, ...updates } : token
            );
          });
          return updated;
        }
      );
    },
    [queryClient]
  );

  const updateTokenMetrics = useCallback(
    (
      tokenId: string,
      metrics: Partial<Token['metrics']>,
      ageIncrement: number = 0
    ) => {
      // Update the main 'all' query (used by useAllTokens)
      queryClient.setQueryData(
        tokenQueryKeys.all,
        (old: Record<TokenCategory, Token[]> | undefined) => {
          if (!old) return old;
          const updated = { ...old };
          (Object.keys(updated) as TokenCategory[]).forEach((category) => {
            updated[category] = updated[category].map((token) =>
              token.id === tokenId
                ? { 
                    ...token, 
                    metrics: { ...token.metrics, ...metrics }, 
                    ageInSeconds: token.ageInSeconds + ageIncrement,
                    updatedAt: Date.now() 
                  }
                : token
            );
          });
          return updated;
        }
      );

      // Also update individual category queries if they exist
      (['new-pairs', 'final-stretch', 'migrated'] as TokenCategory[]).forEach((category) => {
        queryClient.setQueryData(
          tokenQueryKeys.byCategory(category),
          (old: { tokens: Token[] } | undefined) => {
            if (!old) return old;
            return {
              ...old,
              tokens: old.tokens.map((token) =>
                token.id === tokenId
                  ? { 
                      ...token, 
                      metrics: { ...token.metrics, ...metrics }, 
                      ageInSeconds: token.ageInSeconds + ageIncrement,
                      updatedAt: Date.now() 
                    }
                  : token
              ),
            };
          }
        );
      });
    },
    [queryClient]
  );

  /**
   * Increment age for all tokens (called periodically)
   */
  const incrementAllTokenAges = useCallback(
    (incrementSeconds: number = 1) => {
      queryClient.setQueryData(
        tokenQueryKeys.all,
        (old: Record<TokenCategory, Token[]> | undefined) => {
          if (!old) return old;
          const updated = { ...old };
          (Object.keys(updated) as TokenCategory[]).forEach((category) => {
            updated[category] = updated[category].map((token) => ({
              ...token,
              ageInSeconds: token.ageInSeconds + incrementSeconds,
            }));
          });
          return updated;
        }
      );
    },
    [queryClient]
  );

  return { updateToken, updateTokenMetrics, incrementAllTokenAges };
}

/**
 * Selector hook for getting current tab's sort config
 */
export function useCurrentSortConfig() {
  const activeTab = useAppSelector((state) => state.ui.tabs.activeTab);
  const sortConfigs = useAppSelector((state) => state.ui.tabs.sortConfigs);
  return sortConfigs[activeTab];
}

