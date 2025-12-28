/**
 * Popover Atom Component
 * Accessible popover using Radix UI
 */

'use client';

import React, { memo } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  showClose?: boolean;
}

export const Popover = memo(function Popover({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  open,
  onOpenChange,
  className,
  showClose = false,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={8}
          className={cn(
            'z-[100] min-w-[200px] p-4',
            'bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl',
            'animate-scale-in',
            className
          )}
        >
          {showClose && (
            <PopoverPrimitive.Close
              className={cn(
                'absolute top-2 right-2 p-1 rounded-md',
                'text-zinc-400 hover:text-white hover:bg-zinc-800',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
              )}
              aria-label="Close"
            >
              <X size={14} />
            </PopoverPrimitive.Close>
          )}
          {children}
          <PopoverPrimitive.Arrow className="fill-zinc-900" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});

Popover.displayName = 'Popover';

export default Popover;


