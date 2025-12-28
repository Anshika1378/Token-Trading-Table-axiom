/**
 * Home Page - Pulse Token Discovery
 * Main entry point for the application
 */

'use client';

import { Header, Toolbar, PulseTable, ErrorBoundary } from '@/components/organisms';
import { useWebSocket } from '@/hooks';
import { useEffect } from 'react';

export default function Home() {
  // Initialize WebSocket connection
  const { connect } = useWebSocket({ autoConnect: true });

  useEffect(() => {
    // Ensure connection is established
    connect();
  }, [connect]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <Header />

      {/* Toolbar */}
      <Toolbar />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <ErrorBoundary>
          <PulseTable className="h-full" loadingType="shimmer" />
        </ErrorBoundary>
      </main>

      {/* Footer Status Bar */}
      <footer className="flex items-center justify-between px-4 py-2 bg-[#0a0a0c] border-t border-zinc-800/50">
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>© 2024 Axiom Pulse Clone</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Built with Next.js 14</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">BTC</span>
          <span className="text-white">$98.4K</span>
          <span className="text-zinc-500 mx-2">|</span>
          <span className="text-zinc-500">ETH</span>
          <span className="text-white">$3,421</span>
          <span className="text-zinc-500 mx-2">|</span>
          <span className="text-zinc-500">SOL</span>
          <span className="text-white">$189.23</span>
        </div>
      </footer>
    </div>
  );
}
