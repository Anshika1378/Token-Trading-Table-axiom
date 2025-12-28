/**
 * Price Stream Slice
 * Manages real-time price updates from the WebSocket stream
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PriceUpdate, PriceDirection } from '@/types';

interface PriceState {
  /** Map of token ID to latest price update */
  updates: Record<string, PriceUpdate>;
  /** Map of token ID to price direction for flash animation */
  directions: Record<string, PriceDirection>;
  /** Last update timestamp */
  lastUpdateTimestamp: number;
  /** Total number of updates received */
  updateCount: number;
}

const initialState: PriceState = {
  updates: {},
  directions: {},
  lastUpdateTimestamp: 0,
  updateCount: 0,
};

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    // Single price update
    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      const update = action.payload;
      state.updates[update.tokenId] = update;
      state.directions[update.tokenId] = update.direction;
      state.lastUpdateTimestamp = update.timestamp;
      state.updateCount += 1;
    },

    // Batch price updates for performance
    batchUpdatePrices: (state, action: PayloadAction<PriceUpdate[]>) => {
      const updates = action.payload;
      const timestamp = Date.now();

      updates.forEach((update) => {
        state.updates[update.tokenId] = update;
        state.directions[update.tokenId] = update.direction;
      });

      state.lastUpdateTimestamp = timestamp;
      state.updateCount += updates.length;
    },

    // Clear direction after flash animation completes
    clearPriceDirection: (state, action: PayloadAction<string>) => {
      const tokenId = action.payload;
      if (state.directions[tokenId]) {
        state.directions[tokenId] = 'neutral';
      }
    },

    // Clear all directions (batch operation)
    clearAllDirections: (state) => {
      Object.keys(state.directions).forEach((tokenId) => {
        state.directions[tokenId] = 'neutral';
      });
    },

    // Clear updates for a specific token (e.g., when token is removed)
    clearTokenUpdate: (state, action: PayloadAction<string>) => {
      const tokenId = action.payload;
      delete state.updates[tokenId];
      delete state.directions[tokenId];
    },

    // Reset all price state
    resetPriceState: () => initialState,
  },
});

export const {
  updatePrice,
  batchUpdatePrices,
  clearPriceDirection,
  clearAllDirections,
  clearTokenUpdate,
  resetPriceState,
} = priceSlice.actions;

// Selectors
export const selectPriceUpdate = (state: { price: PriceState }, tokenId: string) =>
  state.price.updates[tokenId];

export const selectPriceDirection = (state: { price: PriceState }, tokenId: string) =>
  state.price.directions[tokenId] ?? 'neutral';

export const selectLastUpdateTimestamp = (state: { price: PriceState }) =>
  state.price.lastUpdateTimestamp;

export default priceSlice.reducer;


