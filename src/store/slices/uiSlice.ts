/**
 * UI State Slice
 * Manages all UI-related state including tabs, modals, hover states, and WebSocket connection
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TokenCategory, SortConfig, FilterConfig, UIState } from '@/types';

const initialSortConfig: SortConfig = {
  field: 'age',
  direction: 'asc',
};

const initialFilterConfig: FilterConfig = {};

const initialState: UIState = {
  tabs: {
    activeTab: 'new-pairs',
    sortConfigs: {
      'new-pairs': { ...initialSortConfig },
      'final-stretch': { ...initialSortConfig },
      'migrated': { ...initialSortConfig },
    },
    filterConfigs: {
      'new-pairs': { ...initialFilterConfig },
      'final-stretch': { ...initialFilterConfig },
      'migrated': { ...initialFilterConfig },
    },
  },
  modal: {
    isOpen: false,
    modalType: null,
    tokenId: null,
  },
  hover: {
    hoveredTokenId: null,
    hoveredColumn: null,
  },
  isWebSocketConnected: false,
  selectedPreset: 'P1',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Tab actions
    setActiveTab: (state, action: PayloadAction<TokenCategory>) => {
      state.tabs.activeTab = action.payload;
    },

    // Sort actions
    setSortConfig: (
      state,
      action: PayloadAction<{ category: TokenCategory; config: SortConfig }>
    ) => {
      state.tabs.sortConfigs[action.payload.category] = action.payload.config;
    },

    toggleSortDirection: (state, action: PayloadAction<TokenCategory>) => {
      const category = action.payload;
      const currentDirection = state.tabs.sortConfigs[category].direction;
      state.tabs.sortConfigs[category].direction = currentDirection === 'asc' ? 'desc' : 'asc';
    },

    // Filter actions
    setFilterConfig: (
      state,
      action: PayloadAction<{ category: TokenCategory; config: FilterConfig }>
    ) => {
      state.tabs.filterConfigs[action.payload.category] = action.payload.config;
    },

    clearFilters: (state, action: PayloadAction<TokenCategory>) => {
      state.tabs.filterConfigs[action.payload] = {};
    },

    // Modal actions
    openModal: (
      state,
      action: PayloadAction<{
        modalType: 'token-details' | 'settings' | 'filter';
        tokenId?: string;
      }>
    ) => {
      state.modal.isOpen = true;
      state.modal.modalType = action.payload.modalType;
      state.modal.tokenId = action.payload.tokenId ?? null;
    },

    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.modalType = null;
      state.modal.tokenId = null;
    },

    // Hover actions
    setHoveredToken: (state, action: PayloadAction<string | null>) => {
      state.hover.hoveredTokenId = action.payload;
    },

    setHoveredColumn: (state, action: PayloadAction<string | null>) => {
      state.hover.hoveredColumn = action.payload;
    },

    // WebSocket connection status
    setWebSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isWebSocketConnected = action.payload;
    },

    // Preset selection
    setSelectedPreset: (state, action: PayloadAction<'P1' | 'P2' | 'P3'>) => {
      state.selectedPreset = action.payload;
    },

    // Reset state
    resetUIState: () => initialState,
  },
});

export const {
  setActiveTab,
  setSortConfig,
  toggleSortDirection,
  setFilterConfig,
  clearFilters,
  openModal,
  closeModal,
  setHoveredToken,
  setHoveredColumn,
  setWebSocketConnected,
  setSelectedPreset,
  resetUIState,
} = uiSlice.actions;

export default uiSlice.reducer;


