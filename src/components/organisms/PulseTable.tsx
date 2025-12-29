'use client';

import React, { memo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { TokenColumn } from './TokenColumn';
import { useAllTokens, useNewTokenSimulator, useIsDesktop } from '@/hooks';
import { useAppDispatch, setActiveTab } from '@/store';
import type { LoadingType, TokenCategory } from '@/types';
import { CATEGORY_LABELS } from '@/utilities/constants';
import { SlidersHorizontal } from 'lucide-react';

interface PulseTableProps {
  className?: string;
  loadingType?: LoadingType;
  enableNewTokens?: boolean;
  newTokenInterval?: number;
}

const categories: TokenCategory[] = ['new-pairs', 'final-stretch', 'migrated'];

export const PulseTable = memo(function PulseTable({
  className,
  loadingType = 'shimmer',
  enableNewTokens = true,
  newTokenInterval = 5000,
}: PulseTableProps) {
  const { data, isLoading, error } = useAllTokens();
  const dispatch = useAppDispatch();
  const isDesktop = useIsDesktop();
  
  // Tab state for mobile/tablet view
  const [activeTab, setActiveTabState] = useState<TokenCategory>('new-pairs');

  useNewTokenSimulator({
    enabled: enableNewTokens,
    intervalMs: newTokenInterval,
  });

  const newPairs = data?.['new-pairs'] ?? [];
  const finalStretch = data?.['final-stretch'] ?? [];
  const migrated = data?.['migrated'] ?? [];

  const getTokensByCategory = (category: TokenCategory) => {
    switch (category) {
      case 'new-pairs': return newPairs;
      case 'final-stretch': return finalStretch;
      case 'migrated': return migrated;
    }
  };

  const handleTabChange = useCallback((tab: TokenCategory) => {
    setActiveTabState(tab);
    dispatch(setActiveTab(tab));
  }, [dispatch]);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* MOBILE/TABLET VIEW (< 1024px): Tab mode */}
      {!isDesktop && (
        <div className="flex flex-col h-full">
          {/* Tabs Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/70 bg-[#0a0a0c]">
            <div className="flex">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleTabChange(category)}
                  className={cn(
                    'px-4 sm:px-6 py-3 text-sm font-medium transition-colors relative',
                    activeTab === category ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  {CATEGORY_LABELS[category]}
                  {activeTab === category && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-2 sm:px-4">
              <button className="p-1.5 text-zinc-500 hover:text-white transition-colors">
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Single Column Token List */}
          <div className="flex-1 overflow-hidden">
            <TokenColumn
              category={activeTab}
              tokens={getTokensByCategory(activeTab)}
              isLoading={isLoading}
              loadingType={loadingType}
              error={error?.message}
              position="middle"
              showHeader={false}
            />
          </div>
        </div>
      )}

      {/* DESKTOP VIEW (>= 1024px): 3-column layout */}
      {isDesktop && (
        <div className="flex-1 grid grid-cols-3 overflow-hidden">
          <TokenColumn
            category="new-pairs"
            tokens={newPairs}
            isLoading={isLoading}
            loadingType={loadingType}
            error={error?.message}
            position="left"
            showHeader={true}
          />
          <TokenColumn
            category="final-stretch"
            tokens={finalStretch}
            isLoading={isLoading}
            loadingType={loadingType}
            error={error?.message}
            position="middle"
            showHeader={true}
          />
          <TokenColumn
            category="migrated"
            tokens={migrated}
            isLoading={isLoading}
            loadingType={loadingType}
            error={error?.message}
            position="right"
            showHeader={true}
          />
        </div>
      )}
    </div>
  );
});

PulseTable.displayName = 'PulseTable';

export default PulseTable;

