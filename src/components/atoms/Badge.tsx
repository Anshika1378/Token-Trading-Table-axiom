/**
 * Badge Atom Component
 * A small label component for displaying status, categories, or metrics
 */

'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { BADGE_VARIANTS } from '@/utilities/constants';
import type { BadgeProps } from '@/types';

type BadgeVariant = keyof typeof BADGE_VARIANTS;

interface ExtendedBadgeProps extends Omit<BadgeProps, 'variant'> {
  variant?: BadgeVariant;
  size?: 'xs' | 'sm' | 'md';
  icon?: React.ReactNode;
}

const sizeClasses = {
  xs: 'px-1 py-0.5 text-[10px]',
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
};

export const Badge = memo(function Badge({
  variant = 'neutral',
  size = 'sm',
  icon,
  children,
  className,
}: ExtendedBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1 font-medium rounded border',
        'transition-colors duration-150',
        BADGE_VARIANTS[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;


