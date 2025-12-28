/**
 * PriceText Atom Component
 * Displays price with flash animation on change
 */

'use client';

import React, { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPrice } from '@/utilities/formatters';
import type { PriceDirection } from '@/types';

interface PriceTextProps {
  value: number;
  direction?: PriceDirection;
  format?: 'currency' | 'price' | 'compact';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showFlash?: boolean;
  className?: string;
  prefix?: string;
}

const sizeClasses = {
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base font-semibold',
};

export const PriceText = memo(function PriceText({
  value,
  direction = 'neutral',
  format = 'currency',
  size = 'md',
  showFlash = true,
  className,
  prefix,
}: PriceTextProps) {
  const [flashClass, setFlashClass] = useState<string>('');

  // Handle flash animation on direction change
  useEffect(() => {
    if (!showFlash || direction === 'neutral') {
      setFlashClass('');
      return;
    }

    const newFlashClass = direction === 'up' ? 'animate-pulse-green' : 'animate-pulse-red';
    setFlashClass(newFlashClass);

    const timeout = setTimeout(() => {
      setFlashClass('');
    }, 500);

    return () => clearTimeout(timeout);
  }, [direction, showFlash, value]);

  // Format the value based on format type
  const formattedValue = (() => {
    switch (format) {
      case 'price':
        return formatPrice(value);
      case 'compact':
        return formatCurrency(value, 1);
      default:
        return formatCurrency(value);
    }
  })();

  // Get color class based on direction
  const colorClass = (() => {
    if (direction === 'up') return 'text-green-400';
    if (direction === 'down') return 'text-red-400';
    return 'text-white';
  })();

  return (
    <span
      className={cn(
        'font-mono tabular-nums transition-colors duration-200',
        sizeClasses[size],
        colorClass,
        flashClass,
        className
      )}
    >
      {prefix}
      {formattedValue}
    </span>
  );
});

PriceText.displayName = 'PriceText';

export default PriceText;


