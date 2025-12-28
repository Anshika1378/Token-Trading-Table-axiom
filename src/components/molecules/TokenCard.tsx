/**
 * TokenCard Molecule Component
 * Pixel-perfect replica of Axiom Trade Pulse token card
 */

'use client';

import React, { memo, useCallback, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, getAvatarGradient } from '@/components/atoms';
import { 
  formatCompactNumber, 
  formatAge, 
  truncateAddress,
} from '@/utilities/formatters';
import type { Token, PriceDirection } from '@/types';
import { 
  Globe, 
  Search, 
  Users, 
  Copy,
  Crosshair,
  Target,
  Grid3X3,
  CircleDot,
  Wallet,
  BarChart3,
  MessageSquare,
  FolderOpen,
} from 'lucide-react';

interface TokenCardProps {
  token: Token;
  isHovered: boolean;
  onHover: (tokenId: string | null) => void;
  onClick: (tokenId: string) => void;
  priceDirection?: PriceDirection;
  index?: number;
}

const NEW_TOKEN_THRESHOLD = 3000;

// Status indicator color based on risk score
function getStatusColor(riskScore: number): string {
  if (riskScore >= 70) return 'bg-red-500';
  if (riskScore >= 40) return 'bg-yellow-500';
  return 'bg-green-500';
}

// Badge styling - matches Axiom's pill-shaped badges with borders
function getBadgeStyles(value: number, type: 'holder' | 'dev' | 'sniper' | 'bundle' | 'age'): { 
  container: string; 
  icon: string; 
  text: string;
} {
  const base = 'bg-zinc-900/80 border border-zinc-700/50';
  
  if (type === 'age') {
    return {
      container: base,
      icon: 'text-yellow-500',
      text: 'text-zinc-300'
    };
  }
  
  if (type === 'holder') {
    if (value >= 40) return { container: base, icon: 'text-red-500', text: 'text-red-500' };
    if (value >= 20) return { container: base, icon: 'text-yellow-500', text: 'text-yellow-500' };
    return { container: base, icon: 'text-green-500', text: 'text-green-500' };
  }
  
  if (type === 'dev') {
    if (value >= 10) return { container: base, icon: 'text-yellow-500', text: 'text-zinc-300' };
    return { container: base, icon: 'text-green-500', text: 'text-green-500' };
  }
  
  if (type === 'sniper') {
    if (value >= 10) return { container: base, icon: 'text-red-500', text: 'text-red-500' };
    if (value > 0) return { container: base, icon: 'text-yellow-500', text: 'text-yellow-500' };
    return { container: base, icon: 'text-green-500', text: 'text-green-500' };
  }
  
  if (type === 'bundle') {
    if (value >= 50) return { container: base, icon: 'text-red-500', text: 'text-red-500' };
    if (value >= 20) return { container: base, icon: 'text-yellow-500', text: 'text-yellow-500' };
    return { container: base, icon: 'text-green-500', text: 'text-green-500' };
  }
  
  return { container: base, icon: 'text-zinc-400', text: 'text-zinc-400' };
}

// Format time duration like "1y", "6mo", "2d", "3h", "5m", "0s"
function formatDuration(seconds: number): string {
  if (seconds >= 86400 * 365) return `${Math.floor(seconds / (86400 * 365))}y`;
  if (seconds >= 86400 * 30) return `${Math.floor(seconds / (86400 * 30))}mo`;
  if (seconds >= 86400) return `${Math.floor(seconds / 86400)}d`;
  if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h`;
  if (seconds >= 60) return `${Math.floor(seconds / 60)}m`;
  return `${seconds}s`;
}

export const TokenCard = memo(function TokenCard({
  token,
  isHovered,
  onHover,
  onClick,
  priceDirection = 'neutral',
  index = 0,
}: TokenCardProps) {
  const [isNewToken, setIsNewToken] = useState(false);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    const timeSinceCreation = Date.now() - token.createdAt;
    if (timeSinceCreation < NEW_TOKEN_THRESHOLD) {
      setIsNewToken(true);
      const timeout = setTimeout(() => setIsNewToken(false), NEW_TOKEN_THRESHOLD);
      return () => clearTimeout(timeout);
    }
  }, [token.createdAt]);

  const handleMouseEnter = useCallback(() => onHover(token.id), [onHover, token.id]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);
  const handleClick = useCallback(() => onClick(token.id), [onClick, token.id]);
  
  const handleCopyAddress = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [token.address]);

  // Format market cap/volume with $ prefix
  const formatPrice = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(value >= 10000 ? 0 : 2)}K`;
    return `$${value.toFixed(0)}`;
  };

  const holderPct = Math.round(token.riskMetrics.topHolderPercentage * 100);
  const devPct = Math.round(token.riskMetrics.devHoldingPercentage * 100);
  const sniperPct = Math.round(token.riskMetrics.sniperPercentage * 100);
  const bundlePct = Math.round(token.riskMetrics.bundlePercentage * 100);

  return (
    <div
      className={cn(
        'relative px-3 py-3 cursor-pointer',
        'hover:bg-zinc-900/60 transition-colors duration-75',
        isHovered && 'bg-zinc-900/60',
        isNewToken && 'animate-pulse-green'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="flex gap-3">
        {/* Left: Avatar with status indicator and contract address below */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Avatar */}
          <div className="relative">
            <div className="w-[72px] h-[72px] rounded-xl overflow-hidden">
              {token.imageUrl ? (
                <img 
                  src={token.imageUrl} 
                  alt={token.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={cn(
                  'w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br',
                  getAvatarGradient(token.name + token.symbol)
                )}>
                  <span className="drop-shadow-md">{token.symbol.substring(0, 2)}</span>
                </div>
              )}
            </div>
            {/* Status badge - bottom right like original */}
            <div 
              className={cn(
                'absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#0a0a0c] flex items-center justify-center',
                getStatusColor(token.riskMetrics.riskScore)
              )}
            >
              <Wallet size={10} className="text-white" />
            </div>
          </div>
          {/* Contract address below avatar */}
          <div className="mt-1.5 text-[11px] text-zinc-500 font-mono">
            {truncateAddress(token.address, 4, 4)}
          </div>
        </div>

        {/* Middle: Main content */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Symbol + Name + Copy */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-bold text-white text-[15px]">
              {token.symbol}
            </span>
            <span className="text-zinc-400 text-[14px] truncate">
              {token.name}
            </span>
            <button
              onClick={handleCopyAddress}
              className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Copy address"
            >
              <Copy size={12} />
            </button>
          </div>

          {/* Row 2: Age + Icons + Metrics */}
          <div className="flex items-center gap-2 mb-2 text-[13px]">
            <span className="text-cyan-400 font-medium">
              {formatAge(token.ageInSeconds)}
            </span>
            {/* Icons */}
            <div className="flex items-center gap-0.5 text-zinc-500">
              <button className="p-0.5 hover:text-zinc-300 transition-colors">
                <Globe size={14} />
              </button>
              <button className="p-0.5 hover:text-zinc-300 transition-colors">
                <Wallet size={14} />
              </button>
              <button className="p-0.5 hover:text-zinc-300 transition-colors">
                <Search size={14} />
              </button>
            </div>
            {/* Metrics */}
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="flex items-center gap-0.5">
                <Users size={13} />
                {token.metrics.holders}
              </span>
              <span className="flex items-center gap-0.5">
                <BarChart3 size={13} />
                {token.socialMetrics.likes}
              </span>
              <span className="flex items-center gap-0.5">
                <MessageSquare size={13} />
                {token.socialMetrics.dislikes}
              </span>
              <span className="flex items-center gap-0.5">
                <FolderOpen size={13} />
                {token.socialMetrics.likes}/{token.metrics.transactions}
              </span>
            </div>
          </div>

          {/* Row 3: Risk badges - Pill-shaped like original Axiom - single row */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {/* Holder % badge */}
            {(() => {
              const styles = getBadgeStyles(holderPct, 'holder');
              return (
                <Tooltip content={`Top Holder: ${holderPct}% of supply`} side="bottom">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap cursor-help',
                    styles.container
                  )}>
                    <Users size={10} className={styles.icon} />
                    <span className={styles.text}>{holderPct}%</span>
                  </span>
                </Tooltip>
              );
            })()}
            
            {/* Dev Sold + Age badge */}
            {(() => {
              const styles = getBadgeStyles(devPct, 'dev');
              return (
                <Tooltip content={`Dev Sold: ${devPct}% • Age: ${formatDuration(token.ageInSeconds)}`} side="bottom">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap cursor-help',
                    styles.container
                  )}>
                    <Target size={10} className={styles.icon} />
                    <span className="text-zinc-500">DS</span>
                    <span className="text-zinc-300">{formatDuration(token.ageInSeconds)}</span>
                  </span>
                </Tooltip>
              );
            })()}
            
            {/* Sniper % badge */}
            {(() => {
              const styles = getBadgeStyles(sniperPct, 'sniper');
              return (
                <Tooltip content={`Sniper Bots: ${sniperPct}% of holders`} side="bottom">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap cursor-help',
                    styles.container
                  )}>
                    <Crosshair size={10} className={styles.icon} />
                    <span className={styles.text}>{sniperPct}%</span>
                  </span>
                </Tooltip>
              );
            })()}
            
            {/* Insiders % badge */}
            {(() => {
              const insidersPct = Math.round((token.riskMetrics.topHolderPercentage + token.riskMetrics.devHoldingPercentage) * 50);
              const styles = getBadgeStyles(insidersPct, 'bundle');
              return (
                <Tooltip content={`Insiders: ${insidersPct}% combined holdings`} side="bottom">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap cursor-help',
                    styles.container
                  )}>
                    <CircleDot size={10} className={styles.icon} />
                    <span className={styles.text}>{insidersPct}%</span>
                  </span>
                </Tooltip>
              );
            })()}
            
            {/* Bundle % badge */}
            {(() => {
              const styles = getBadgeStyles(bundlePct, 'bundle');
              return (
                <Tooltip content={`Bundle Buyers: ${bundlePct}% of transactions`} side="bottom">
                  <span className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap cursor-help',
                    styles.container
                  )}>
                    <Grid3X3 size={10} className={styles.icon} />
                    <span className={styles.text}>{bundlePct}%</span>
                  </span>
                </Tooltip>
              );
            })()}
          </div>
        </div>

        {/* Right side: Prices */}
        <div className="flex-shrink-0 text-right" style={{ minWidth: '95px' }}>
          {/* Market Cap */}
          <div className="flex items-center justify-end gap-1.5 mb-0.5">
            <span className="text-zinc-500 text-[11px]">MC</span>
            <span className={cn(
              'text-[16px] font-bold',
              priceDirection === 'up' ? 'text-green-400' : 
              priceDirection === 'down' ? 'text-red-400' : 'text-green-400'
            )}>
              {formatPrice(token.metrics.marketCap)}
            </span>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-end gap-1.5 mb-1">
            <span className="text-zinc-500 text-[11px]">V</span>
            <span className="text-white text-[14px] font-medium">
              {formatPrice(token.metrics.volume)}
            </span>
          </div>

          {/* Fee + TX */}
          <div className="flex items-center justify-end gap-2 text-[11px] mb-1">
            <span className="text-zinc-500">
              F <span className="text-zinc-300">≡</span> <span className="text-zinc-400">{(token.metrics.feePercentage * 100).toFixed(2)}</span>
            </span>
            <span className="text-zinc-500">
              TX <span className="text-green-400 font-medium">{token.metrics.transactions}</span>
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden ml-auto">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((token.metrics.feePercentage * 100) / 5 * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';

export default TokenCard;
