'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const variantClasses = {
  default: 'bg-zinc-500',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
};

const sizeClasses = {
  xs: 'h-0.5',
  sm: 'h-1',
  md: 'h-1.5',
};

export const ProgressBar = memo(function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'xs',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Determine variant based on value if using default
  const computedVariant = (() => {
    if (variant !== 'default') return variant;
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'warning';
    if (percentage >= 25) return 'info';
    return 'danger';
  })();

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'w-full bg-zinc-800 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variantClasses[computedVariant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-zinc-400 mt-1">{Math.round(percentage)}%</span>
      )}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;


