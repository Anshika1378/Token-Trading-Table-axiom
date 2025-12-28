/**
 * TokenDetailsPopover Molecule Component
 * Detailed popover view for token information
 */

'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, Badge, PriceText, ProgressBar, Tooltip } from '@/components/atoms';
import { 
  formatCurrency, 
  formatCompactNumber, 
  formatAge, 
  truncateAddress,
  formatPercentage 
} from '@/utilities/formatters';
import type { Token } from '@/types';
import { 
  Globe, 
  Twitter, 
  MessageCircle, 
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Droplet,
  Copy,
  ExternalLink
} from 'lucide-react';

interface TokenDetailsPopoverProps {
  token: Token;
  onCopyAddress?: () => void;
}

export const TokenDetailsPopover = memo(function TokenDetailsPopover({
  token,
  onCopyAddress,
}: TokenDetailsPopoverProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(token.address);
    onCopyAddress?.();
  };

  return (
    <div className="w-80 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar src={token.imageUrl} alt={token.name} size="lg" rounded="lg" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{token.name}</h3>
          <p className="text-sm text-zinc-400">{token.symbol}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-cyan-400 font-medium">
              {formatAge(token.ageInSeconds)}
            </span>
            <span className="text-xs text-zinc-500">old</span>
          </div>
        </div>
      </div>

      {/* Contract Address */}
      <div className="flex items-center justify-between p-2 bg-zinc-800/50 rounded-md">
        <span className="text-xs font-mono text-zinc-400">
          {truncateAddress(token.address, 8, 8)}
        </span>
        <div className="flex items-center gap-1">
          <Tooltip content="Copy Address">
            <button
              onClick={handleCopy}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <Copy size={12} />
            </button>
          </Tooltip>
          <Tooltip content="View on Explorer">
            <button className="p-1 text-zinc-400 hover:text-white transition-colors">
              <ExternalLink size={12} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Price Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-2 bg-zinc-800/30 rounded-md">
          <p className="text-[10px] text-zinc-500 mb-1">Market Cap</p>
          <PriceText value={token.metrics.marketCap} format="compact" size="md" />
        </div>
        <div className="p-2 bg-zinc-800/30 rounded-md">
          <p className="text-[10px] text-zinc-500 mb-1">Volume (24h)</p>
          <PriceText value={token.metrics.volume} format="compact" size="md" />
        </div>
        <div className="p-2 bg-zinc-800/30 rounded-md">
          <p className="text-[10px] text-zinc-500 mb-1">Liquidity</p>
          <PriceText value={token.metrics.liquidity} format="compact" size="md" />
        </div>
        <div className="p-2 bg-zinc-800/30 rounded-md">
          <p className="text-[10px] text-zinc-500 mb-1">Price Change</p>
          <span className={cn(
            'text-sm font-medium',
            token.metrics.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
          )}>
            {formatPercentage(token.metrics.priceChange)}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-zinc-400">
            <Users size={12} /> Holders
          </span>
          <span className="text-white">{formatCompactNumber(token.metrics.holders, 0)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-zinc-400">
            <Activity size={12} /> Transactions
          </span>
          <span className="text-white">{formatCompactNumber(token.metrics.transactions, 0)}</span>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="space-y-2">
        <p className="text-xs text-zinc-500">Risk Analysis</p>
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-zinc-400">Top Holder</span>
              <span className={cn(
                token.riskMetrics.topHolderPercentage > 0.5 ? 'text-red-400' : 'text-green-400'
              )}>
                {formatPercentage(token.riskMetrics.topHolderPercentage)}
              </span>
            </div>
            <ProgressBar 
              value={token.riskMetrics.topHolderPercentage * 100} 
              max={100}
              size="xs"
            />
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-zinc-400">Sniper</span>
              <span className={cn(
                token.riskMetrics.sniperPercentage > 0.3 ? 'text-red-400' : 'text-green-400'
              )}>
                {formatPercentage(token.riskMetrics.sniperPercentage)}
              </span>
            </div>
            <ProgressBar 
              value={token.riskMetrics.sniperPercentage * 100} 
              max={100}
              size="xs"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      {(token.socialLinks.website || token.socialLinks.twitter || token.socialLinks.telegram) && (
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
          {token.socialLinks.website && (
            <a
              href={token.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            >
              <Globe size={16} />
            </a>
          )}
          {token.socialLinks.twitter && (
            <a
              href={token.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            >
              <Twitter size={16} />
            </a>
          )}
          {token.socialLinks.telegram && (
            <a
              href={token.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            >
              <MessageCircle size={16} />
            </a>
          )}
        </div>
      )}
    </div>
  );
});

TokenDetailsPopover.displayName = 'TokenDetailsPopover';

export default TokenDetailsPopover;


