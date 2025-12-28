/**
 * WebSocket Hook
 * Manages WebSocket connection and price updates
 */

'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setWebSocketConnected, batchUpdatePrices, clearPriceDirection } from '@/store';
import { getMockWebSocketService, MockWebSocketService } from '@/services/mockWebSocket';
import { useUpdateTokenCache } from './useTokens';
import type { Token, PriceUpdate, PriceDirection } from '@/types';
import { UI_CONFIG } from '@/utilities/constants';

interface UseWebSocketOptions {
  /** Whether to auto-connect on mount */
  autoConnect?: boolean;
  /** Update interval in milliseconds */
  updateInterval?: number;
  /** Whether to increment token ages */
  incrementAges?: boolean;
  /** Age increment interval in milliseconds */
  ageIncrementInterval?: number;
}

/**
 * Hook to manage WebSocket connection for real-time price updates
 */
export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { 
    autoConnect = true, 
    updateInterval = 1500,
    incrementAges = true,
    ageIncrementInterval = 1000,
  } = options;
  const dispatch = useAppDispatch();
  const { updateTokenMetrics, incrementAllTokenAges } = useUpdateTokenCache();
  const serviceRef = useRef<MockWebSocketService | null>(null);
  const clearTimeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const ageIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const updateTokenMetricsRef = useRef(updateTokenMetrics);
  const incrementAllTokenAgesRef = useRef(incrementAllTokenAges);

  // Keep refs updated
  useEffect(() => {
    updateTokenMetricsRef.current = updateTokenMetrics;
    incrementAllTokenAgesRef.current = incrementAllTokenAges;
  }, [updateTokenMetrics, incrementAllTokenAges]);

  // Age increment interval - updates all token ages every second
  useEffect(() => {
    if (!incrementAges) return;

    ageIntervalRef.current = setInterval(() => {
      incrementAllTokenAgesRef.current(1);
    }, ageIncrementInterval);

    return () => {
      if (ageIntervalRef.current) {
        clearInterval(ageIntervalRef.current);
      }
    };
  }, [incrementAges, ageIncrementInterval]);

  // Handle price updates from WebSocket
  const handlePriceUpdate = useCallback(
    (updates: PriceUpdate[]) => {
      // Dispatch batch update to Redux store for flash animations
      dispatch(batchUpdatePrices(updates));

      // Update React Query cache for each token
      updates.forEach((update) => {
        updateTokenMetricsRef.current(update.tokenId, {
          price: update.newPrice,
          marketCap: update.newMarketCap,
          volume: update.newVolume,
        });

        // Clear any existing timeout for this token
        const existingTimeout = clearTimeoutsRef.current.get(update.tokenId);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }

        // Set timeout to clear the price direction (flash effect)
        const timeout = setTimeout(() => {
          dispatch(clearPriceDirection(update.tokenId));
          clearTimeoutsRef.current.delete(update.tokenId);
        }, UI_CONFIG.PRICE_FLASH_DURATION);

        clearTimeoutsRef.current.set(update.tokenId, timeout);
      });
    },
    [dispatch]
  );

  // Handle connection status changes
  const handleConnectionChange = useCallback(
    (connected: boolean) => {
      dispatch(setWebSocketConnected(connected));
    },
    [dispatch]
  );

  // Initialize WebSocket service - only once
  useEffect(() => {
    // Create or get service with current callbacks
    serviceRef.current = getMockWebSocketService({
      onPriceUpdate: handlePriceUpdate,
      onConnectionChange: handleConnectionChange,
      updateInterval,
    });

    if (autoConnect && !serviceRef.current.getConnectionStatus()) {
      serviceRef.current.connect();
    }

    return () => {
      // Clear all pending timeouts on unmount
      clearTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      clearTimeoutsRef.current.clear();
    };
  }, [autoConnect, updateInterval, handlePriceUpdate, handleConnectionChange]);

  // Keep callbacks updated when they change
  useEffect(() => {
    if (serviceRef.current) {
      serviceRef.current.updateCallbacks({
        onPriceUpdate: handlePriceUpdate,
        onConnectionChange: handleConnectionChange,
      });
    }
  }, [handlePriceUpdate, handleConnectionChange]);

  // Register tokens for updates
  const registerTokens = useCallback((tokens: Token[]) => {
    if (serviceRef.current) {
      serviceRef.current.registerTokens(tokens);
    }
  }, []);

  // Unregister a token
  const unregisterToken = useCallback((tokenId: string) => {
    if (serviceRef.current) {
      serviceRef.current.unregisterToken(tokenId);
    }
  }, []);

  // Manual connect
  const connect = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.connect();
    }
  }, []);

  // Manual disconnect
  const disconnect = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.disconnect();
    }
  }, []);

  return {
    registerTokens,
    unregisterToken,
    connect,
    disconnect,
  };
}

/**
 * Hook to get the current price direction for a token
 * Used for flash animation
 */
export function usePriceDirection(tokenId: string): PriceDirection {
  return useAppSelector((state) => state.price.directions[tokenId] ?? 'neutral');
}
