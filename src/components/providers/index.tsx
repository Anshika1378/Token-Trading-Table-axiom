'use client';

import React from 'react';
import { ReduxProvider } from './ReduxProvider';
import { QueryProvider } from './QueryProvider';
import { TooltipProvider } from '@/components/atoms';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <TooltipProvider delayDuration={200}>
          {children}
        </TooltipProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}

export { ReduxProvider } from './ReduxProvider';
export { QueryProvider } from './QueryProvider';
export default Providers;


