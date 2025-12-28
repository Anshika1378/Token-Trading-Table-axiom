/**
 * TokenCardSkeleton Molecule Component
 * Loading placeholder for TokenCard with shimmer effect
 */

'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton, SkeletonAvatar } from '@/components/atoms';

interface TokenCardSkeletonProps {
  variant?: 'skeleton' | 'shimmer';
  index?: number;
}

export const TokenCardSkeleton = memo(function TokenCardSkeleton({
  variant = 'shimmer',
  index = 0,
}: TokenCardSkeletonProps) {
  const isShimmer = variant === 'shimmer';

  return (
    <div
      className={cn(
        'p-3 rounded-lg',
        'bg-[#141418] border border-zinc-800/50',
        // Progressive delay for staggered loading effect
        'animate-fade-in opacity-0',
        `animate-delay-${Math.min(index + 1, 8)}`
      )}
      style={{ animationFillMode: 'forwards' }}
      aria-hidden="true"
    >
      {/* Main Content Row */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <SkeletonAvatar size="lg" className={isShimmer ? 'animate-shimmer' : ''} />

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          {/* Name Row */}
          <div className="flex items-center gap-2 mb-2">
            <Skeleton 
              width={80} 
              height={14} 
              rounded="sm"
              variant={variant}
            />
            <Skeleton 
              width={40} 
              height={12} 
              rounded="sm"
              variant={variant}
            />
          </div>

          {/* Age and Links Row */}
          <div className="flex items-center gap-2 mb-2">
            <Skeleton 
              width={24} 
              height={12} 
              rounded="sm"
              variant={variant}
            />
            <div className="flex items-center gap-1">
              <Skeleton width={16} height={16} rounded="sm" variant={variant} />
              <Skeleton width={16} height={16} rounded="sm" variant={variant} />
              <Skeleton width={16} height={16} rounded="sm" variant={variant} />
            </div>
          </div>

          {/* Metrics Row */}
          <div className="flex items-center gap-3">
            <Skeleton width={32} height={12} rounded="sm" variant={variant} />
            <Skeleton width={24} height={12} rounded="sm" variant={variant} />
            <Skeleton width={24} height={12} rounded="sm" variant={variant} />
            <Skeleton width={24} height={12} rounded="sm" variant={variant} />
          </div>
        </div>

        {/* Price Column */}
        <div className="text-right flex-shrink-0">
          <div className="flex items-center justify-end gap-1 mb-1">
            <Skeleton width={12} height={10} rounded="sm" variant={variant} />
            <Skeleton width={48} height={14} rounded="sm" variant={variant} />
          </div>
          <div className="flex items-center justify-end gap-1 mb-2">
            <Skeleton width={8} height={10} rounded="sm" variant={variant} />
            <Skeleton width={36} height={12} rounded="sm" variant={variant} />
          </div>
          <div className="flex items-center justify-end gap-2">
            <Skeleton width={36} height={10} rounded="sm" variant={variant} />
            <Skeleton width={40} height={10} rounded="sm" variant={variant} />
          </div>
          <div className="mt-1.5 ml-auto">
            <Skeleton width={64} height={4} rounded="full" variant={variant} />
          </div>
        </div>
      </div>

      {/* Contract Address Row */}
      <div className="mt-2">
        <Skeleton width={72} height={10} rounded="sm" variant={variant} />
      </div>

      {/* Risk Metrics Row */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Skeleton width={40} height={18} rounded="sm" variant={variant} />
        <Skeleton width={32} height={18} rounded="sm" variant={variant} />
        <Skeleton width={28} height={18} rounded="sm" variant={variant} />
        <Skeleton width={36} height={18} rounded="sm" variant={variant} />
        <Skeleton width={36} height={18} rounded="sm" variant={variant} />
      </div>
    </div>
  );
});

TokenCardSkeleton.displayName = 'TokenCardSkeleton';

/**
 * Multiple skeleton cards for loading state
 */
export const TokenCardSkeletonList = memo(function TokenCardSkeletonList({
  count = 5,
  variant = 'shimmer',
}: {
  count?: number;
  variant?: 'skeleton' | 'shimmer';
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <TokenCardSkeleton key={index} variant={variant} index={index} />
      ))}
    </div>
  );
});

TokenCardSkeletonList.displayName = 'TokenCardSkeletonList';

export default TokenCardSkeleton;


