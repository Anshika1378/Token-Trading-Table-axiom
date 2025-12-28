/**
 * Modal Atom Component
 * Accessible modal dialog using Radix UI
 */

'use client';

import React, { memo } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export const Modal = memo(function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-[100]',
            'bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-fade-in'
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            'fixed z-[100]',
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[calc(100%-2rem)]',
            sizeClasses[size],
            'bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl',
            'data-[state=open]:animate-scale-in',
            'focus-visible:outline-none',
            className
          )}
        >
          {/* Header */}
          {(title || description) && (
            <div className="px-6 py-4 border-b border-zinc-800">
              {title && (
                <DialogPrimitive.Title className="text-lg font-semibold text-white">
                  {title}
                </DialogPrimitive.Title>
              )}
              {description && (
                <DialogPrimitive.Description className="mt-1 text-sm text-zinc-400">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">{children}</div>

          {/* Close Button */}
          <DialogPrimitive.Close
            className={cn(
              'absolute top-4 right-4 p-1.5 rounded-md',
              'text-zinc-400 hover:text-white hover:bg-zinc-800',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
            )}
            aria-label="Close modal"
          >
            <X size={18} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

Modal.displayName = 'Modal';

export default Modal;


