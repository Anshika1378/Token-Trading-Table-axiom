/**
 * Redux Store Configuration
 * Combines all slices and exports typed hooks
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import uiReducer from './slices/uiSlice';
import priceReducer from './slices/priceSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    price: priceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['price/batchUpdatePrices'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export actions for convenience
export * from './slices/uiSlice';
export * from './slices/priceSlice';


