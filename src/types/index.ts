/**
 * Token Discovery Table - Type Definitions
 * Comprehensive type definitions for the Axiom Trade Pulse clone
 */

// ============================================
// Token Types
// ============================================

export type TokenCategory = 'new-pairs' | 'final-stretch' | 'migrated';

export interface TokenSocialLinks {
  twitter?: string;
  telegram?: string;
  website?: string;
  discord?: string;
}

export interface TokenMetrics {
  /** Market capitalization in USD */
  marketCap: number;
  /** 24h trading volume in USD */
  volume: number;
  /** Current price in USD */
  price: number;
  /** Price change percentage (can be positive or negative) */
  priceChange: number;
  /** Number of holders */
  holders: number;
  /** Number of transactions */
  transactions: number;
  /** Liquidity in USD */
  liquidity: number;
  /** Fee percentage */
  feePercentage: number;
}

export interface TokenSocialMetrics {
  /** Number of likes/upvotes */
  likes: number;
  /** Number of dislikes/downvotes */
  dislikes: number;
  /** Number of comments */
  comments: number;
  /** Is bookmarked by current user */
  isBookmarked: boolean;
}

export interface TokenRiskMetrics {
  /** Holder distribution percentage - top holder % */
  topHolderPercentage: number;
  /** Dev/insider holding percentage */
  devHoldingPercentage: number;
  /** Sniper/bot percentage */
  sniperPercentage: number;
  /** Bundle percentage */
  bundlePercentage: number;
  /** Risk score 0-100 */
  riskScore: number;
}

export interface Token {
  /** Unique token identifier */
  id: string;
  /** Token contract address */
  address: string;
  /** Token name */
  name: string;
  /** Token symbol/ticker */
  symbol: string;
  /** Token avatar/logo URL */
  imageUrl: string;
  /** Token age in seconds since creation */
  ageInSeconds: number;
  /** Token category */
  category: TokenCategory;
  /** Token metrics */
  metrics: TokenMetrics;
  /** Social metrics */
  socialMetrics: TokenSocialMetrics;
  /** Risk metrics */
  riskMetrics: TokenRiskMetrics;
  /** Social links */
  socialLinks: TokenSocialLinks;
  /** Creation timestamp */
  createdAt: number;
  /** Last update timestamp */
  updatedAt: number;
}

// ============================================
// Price Update Types
// ============================================

export type PriceDirection = 'up' | 'down' | 'neutral';

export interface PriceUpdate {
  tokenId: string;
  oldPrice: number;
  newPrice: number;
  oldMarketCap: number;
  newMarketCap: number;
  oldVolume: number;
  newVolume: number;
  direction: PriceDirection;
  timestamp: number;
}

export interface WebSocketMessage {
  type: 'price_update' | 'new_token' | 'token_removed' | 'connection_status';
  payload: PriceUpdate | Token | { tokenId: string } | { status: 'connected' | 'disconnected' };
}

// ============================================
// UI State Types
// ============================================

export type SortField = 
  | 'age' 
  | 'marketCap' 
  | 'volume' 
  | 'price' 
  | 'priceChange' 
  | 'holders' 
  | 'transactions'
  | 'liquidity';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  maxVolume?: number;
  minHolders?: number;
  maxHolders?: number;
  minAge?: number;
  maxAge?: number;
}

export interface TabState {
  activeTab: TokenCategory;
  sortConfigs: Record<TokenCategory, SortConfig>;
  filterConfigs: Record<TokenCategory, FilterConfig>;
}

export interface ModalState {
  isOpen: boolean;
  modalType: 'token-details' | 'settings' | 'filter' | null;
  tokenId: string | null;
}

export interface HoverState {
  hoveredTokenId: string | null;
  hoveredColumn: string | null;
}

export interface UIState {
  tabs: TabState;
  modal: ModalState;
  hover: HoverState;
  isWebSocketConnected: boolean;
  selectedPreset: 'P1' | 'P2' | 'P3';
}

// ============================================
// Loading States
// ============================================

export type LoadingType = 'skeleton' | 'shimmer' | 'progressive';

export interface LoadingState {
  isLoading: boolean;
  loadingType: LoadingType;
  loadedCount: number;
  totalCount: number;
  error: string | null;
}

// ============================================
// API Response Types
// ============================================

export interface TokenListResponse {
  tokens: Token[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ============================================
// Component Prop Types
// ============================================

export interface TokenCardProps {
  token: Token;
  isHovered: boolean;
  onHover: (tokenId: string | null) => void;
  onClick: (tokenId: string) => void;
  priceDirection?: PriceDirection;
}

export interface TokenTableProps {
  category: TokenCategory;
  tokens: Token[];
  isLoading: boolean;
  loadingType: LoadingType;
  error: string | null;
}

export interface PriceCellProps {
  price: number;
  previousPrice?: number;
  direction?: PriceDirection;
  showFlash?: boolean;
}

export interface BadgeProps {
  variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'pink' | 'purple' | 'orange';
  children: React.ReactNode;
  className?: string;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

// ============================================
// Utility Types
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ValueOf<T> = T[keyof T];

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Re-export for convenience
export type { ReactNode } from 'react';


