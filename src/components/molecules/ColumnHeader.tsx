/**
 * ColumnHeader Molecule Component
 * Header for token category columns with sorting and filtering
 */

'use client';

import React, { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { IconButton, Tooltip, Popover } from '@/components/atoms';
import { useAppDispatch, useAppSelector, setSortConfig, setSelectedPreset } from '@/store';
import type { TokenCategory, SortConfig, SortField } from '@/types';
import { CATEGORY_LABELS } from '@/utilities/constants';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  SlidersHorizontal,
  Zap
} from 'lucide-react';

interface ColumnHeaderProps {
  category: TokenCategory;
  tokenCount?: number;
}

const sortOptions: { value: SortField; label: string; description: string }[] = [
  { value: 'age', label: 'Age', description: 'Sort by token creation time' },
  { value: 'marketCap', label: 'Market Cap', description: 'Sort by total market capitalization' },
  { value: 'volume', label: 'Volume', description: 'Sort by 24h trading volume' },
  { value: 'price', label: 'Price', description: 'Sort by current token price' },
  { value: 'priceChange', label: 'Change %', description: 'Sort by 24h price change percentage' },
  { value: 'holders', label: 'Holders', description: 'Sort by number of token holders' },
  { value: 'transactions', label: 'Transactions', description: 'Sort by transaction count' },
];

export const ColumnHeader = memo(function ColumnHeader({
  category,
  tokenCount = 0,
}: ColumnHeaderProps) {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector((state) => state.ui.tabs.sortConfigs[category]);
  const selectedPreset = useAppSelector((state) => state.ui.selectedPreset);

  const handleSortChange = useCallback((field: SortField) => {
    const newDirection = 
      sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSortConfig({ 
      category, 
      config: { field, direction: newDirection } 
    }));
  }, [dispatch, category, sortConfig]);

  const handlePresetChange = useCallback((preset: 'P1' | 'P2' | 'P3') => {
    dispatch(setSelectedPreset(preset));
  }, [dispatch]);

  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) return <ArrowUpDown size={12} className="text-zinc-500" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={12} className="text-blue-400" /> 
      : <ArrowDown size={12} className="text-blue-400" />;
  };

  return (
    <div className="flex items-center justify-between px-3 py-2.5 bg-[#0a0a0c] border-b border-zinc-800/50">
      {/* Title - Larger and bolder like original */}
      <h2 className="text-[17px] font-semibold text-white tracking-tight">
        {CATEGORY_LABELS[category]}
      </h2>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        {/* Lightning + Count */}
        <div className="flex items-center gap-1 text-zinc-400">
          <Zap size={14} className="text-yellow-500" />
          <span className="text-[13px] font-medium">{tokenCount}</span>
        </div>

        {/* Sort Menu Icon */}
        <Popover
          trigger={
            <IconButton 
              aria-label="Sort options" 
              size="sm"
              variant="ghost"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </IconButton>
          }
          side="bottom"
          align="end"
          className="min-w-[160px] p-2"
        >
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 px-2 py-1">Sort by</p>
            {sortOptions.map((option) => (
              <Tooltip key={option.value} content={option.description} side="right" delayDuration={100}>
                <button
                  onClick={() => handleSortChange(option.value)}
                  className={cn(
                    'w-full flex items-center justify-between px-2 py-1.5 rounded',
                    'text-xs text-left transition-colors',
                    sortConfig.field === option.value
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  )}
                >
                  <span>{option.label}</span>
                  {getSortIcon(option.value)}
                </button>
              </Tooltip>
            ))}
          </div>
        </Popover>

        {/* Preset Buttons */}
        <div className="flex items-center border border-zinc-700/50 rounded overflow-hidden">
          {(['P1', 'P2', 'P3'] as const).map((preset) => (
            <Tooltip key={preset} content={`Preset ${preset.slice(1)}`}>
              <button
                onClick={() => handlePresetChange(preset)}
                className={cn(
                  'px-2.5 py-1 text-[12px] font-medium transition-colors',
                  selectedPreset === preset
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-800'
                )}
              >
                {preset}
              </button>
            </Tooltip>
          ))}
        </div>

        {/* Filter Button */}
        <Tooltip content="Filters">
          <IconButton aria-label="Filters" size="sm" variant="ghost">
            <SlidersHorizontal size={16} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
});

ColumnHeader.displayName = 'ColumnHeader';

export default ColumnHeader;

