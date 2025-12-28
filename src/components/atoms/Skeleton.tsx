/**
 * Skeleton Atom Component
 * Loading placeholder with shimmer effect
 */

'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  variant?: 'default' | 'shimmer';
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export const Skeleton = memo(function Skeleton({
  variant = 'shimmer',
  width,
  height,
  rounded = 'md',
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'bg-zinc-800',
        roundedClasses[rounded],
        variant === 'shimmer' && 'animate-shimmer',
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
});

Skeleton.displayName = 'Skeleton';

/**
 * SkeletonText - for text placeholders
 */
export const SkeletonText = memo(function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={12}
          width={i === lines - 1 && lines > 1 ? '75%' : '100%'}
          rounded="sm"
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = 'SkeletonText';

/**
 * SkeletonAvatar - for avatar placeholders
 */
export const SkeletonAvatar = memo(function SkeletonAvatar({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  return (
    <Skeleton
      width={sizeMap[size]}
      height={sizeMap[size]}
      rounded="lg"
      className={className}
    />
  );
});

SkeletonAvatar.displayName = 'SkeletonAvatar';

export default Skeleton;


