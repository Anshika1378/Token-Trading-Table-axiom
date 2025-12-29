/**
 * TokenColumn Organism Component
 * A column displaying tokens for a specific category
 * Contains header, token list, and handles loading/error states
 */

'use client';

import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ColumnHeader, TokenCard, TokenCardSkeletonList } from '@/components/molecules';
import { Modal } from '@/components/atoms';
import { TokenDetailsPopover } from '@/components/molecules';
import { useAppDispatch, useAppSelector, setHoveredToken, openModal, closeModal } from '@/store';
import { useSortedTokens, useWebSocket, usePriceDirection, useAutoHideScrollbar } from '@/hooks';
import type { Token, TokenCategory, LoadingType } from '@/types';

type ColumnPosition = 'left' | 'middle' | 'right';

interface TokenColumnProps {
  category: TokenCategory;
  tokens: Token[];
  isLoading: boolean;
  loadingType?: LoadingType;
  error?: string | null;
  /** Position in the layout for border styling */
  position?: ColumnPosition;
  /** Whether to show the column header */
  showHeader?: boolean;
  /** Callback when display mode toggle is clicked */
  onDisplayModeToggle?: () => void;
}

// Inner component for individual token with price direction
const TokenCardWithPrice = memo(function TokenCardWithPrice({
  token,
  isHovered,
  onHover,
  onClick,
  index,
}: {
  token: Token;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  index: number;
}) {
  const priceDirection = usePriceDirection(token.id);
  
  return (
    <TokenCard
      token={token}
      isHovered={isHovered}
      onHover={onHover}
      onClick={onClick}
      priceDirection={priceDirection}
      index={index}
    />
  );
});

export const TokenColumn = memo(function TokenColumn({
  category,
  tokens,
  isLoading,
  loadingType = 'shimmer',
  error,
  position = 'middle',
  showHeader = true,
  onDisplayModeToggle,
}: TokenColumnProps) {
  const dispatch = useAppDispatch();
  const hoveredTokenId = useAppSelector((state) => state.ui.hover.hoveredTokenId);
  const sortConfig = useAppSelector((state) => state.ui.tabs.sortConfigs[category]);
  const modalState = useAppSelector((state) => state.ui.modal);
  
  const { registerTokens } = useWebSocket();
  
  // Auto-hide scrollbar ref
  const scrollRef = useAutoHideScrollbar<HTMLDivElement>({ hideDelay: 1000 });

  const borderClasses = cn(
    'border-zinc-800/70',
    // Right border for left and middle columns (creates vertical separator)
    (position === 'left' || position === 'middle') && 'border-r'
  );

  // Sort tokens based on current sort config
  const sortedTokens = useSortedTokens(tokens, sortConfig);

  // Register tokens for WebSocket updates
  useEffect(() => {
    if (tokens.length > 0) {
      registerTokens(tokens);
    }
  }, [tokens, registerTokens]);

  // Handlers
  const handleHover = useCallback((tokenId: string | null) => {
    dispatch(setHoveredToken(tokenId));
  }, [dispatch]);

  const handleClick = useCallback((tokenId: string) => {
    dispatch(openModal({ modalType: 'token-details', tokenId }));
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  // Get selected token for modal
  const selectedToken = useMemo(() => {
    if (!modalState.isOpen || !modalState.tokenId) return null;
    return tokens.find((t) => t.id === modalState.tokenId);
  }, [modalState, tokens]);

  // Render loading state
  if (isLoading) {
    return (
      <div className={cn('flex flex-col h-full bg-[#0a0a0c] overflow-hidden', borderClasses)}>
        {showHeader && <ColumnHeader category={category} tokenCount={0} />}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
          <TokenCardSkeletonList 
            count={5} 
            variant={loadingType === 'shimmer' ? 'shimmer' : 'skeleton'} 
          />
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={cn('flex flex-col h-full bg-[#0a0a0c] overflow-hidden', borderClasses)}>
        {showHeader && <ColumnHeader category={category} tokenCount={0} />}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-red-400 text-sm mb-2">Failed to load tokens</p>
            <p className="text-zinc-500 text-xs">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Render empty state
  if (sortedTokens.length === 0) {
    return (
      <div className={cn('flex flex-col h-full bg-[#0a0a0c] overflow-hidden', borderClasses)}>
        {showHeader && <ColumnHeader category={category} tokenCount={0} />}
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-zinc-500 text-sm">No tokens found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full bg-[#0a0a0c] overflow-hidden', borderClasses)}>
      {showHeader && <ColumnHeader category={category} tokenCount={sortedTokens.length} />}
      
      {/* Token List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-2 py-2 space-y-2 scrollbar-auto-hide"
        role="list"
        aria-label={`${category} tokens`}
      >
        {sortedTokens.map((token, index) => (
          <TokenCardWithPrice
            key={token.id}
            token={token}
            isHovered={hoveredTokenId === token.id}
            onHover={handleHover}
            onClick={handleClick}
            index={index}
          />
        ))}
      </div>

      {/* Token Details Modal */}
      {selectedToken && (
        <Modal
          isOpen={modalState.isOpen && modalState.modalType === 'token-details'}
          onClose={handleCloseModal}
          title={`${selectedToken.name} Details`}
          size="md"
        >
          <TokenDetailsPopover token={selectedToken} />
        </Modal>
      )}
    </div>
  );
});

TokenColumn.displayName = 'TokenColumn';

export default TokenColumn;

