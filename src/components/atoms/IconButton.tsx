'use client';

import React, { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isActive?: boolean;
  'aria-label': string;
}

const variantClasses = {
  default: 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700',
  ghost: 'bg-transparent hover:bg-zinc-800/50',
  outline: 'bg-transparent border border-zinc-700 hover:bg-zinc-800',
};

const sizeClasses = {
  xs: 'w-5 h-5 p-0.5',
  sm: 'w-6 h-6 p-1',
  md: 'w-8 h-8 p-1.5',
  lg: 'w-10 h-10 p-2',
};

export const IconButton = memo(
  forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    {
      variant = 'ghost',
      size = 'sm',
      isActive = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-md',
          'text-zinc-400 hover:text-white',
          'transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          isActive && 'text-blue-400 bg-blue-500/10',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  })
);

IconButton.displayName = 'IconButton';

export default IconButton;


