export function formatCurrency(value: number, decimals: number = 2): string {
  if (value === 0) return '$0';
  
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1_000_000_000) {
    return `${sign}$${(absValue / 1_000_000_000).toFixed(decimals)}B`;
  }
  if (absValue >= 1_000_000) {
    return `${sign}$${(absValue / 1_000_000).toFixed(decimals)}M`;
  }
  if (absValue >= 1_000) {
    return `${sign}$${(absValue / 1_000).toFixed(decimals)}K`;
  }
  if (absValue >= 1) {
    return `${sign}$${absValue.toFixed(decimals)}`;
  }
  
  // For very small values, show more decimal places
  return `${sign}$${absValue.toFixed(Math.max(decimals, 4))}`;
}

/**
 * Format a number as a compact value without currency symbol
 * e.g., 1234567 -> 1.23M, 1234 -> 1.23K
 */
export function formatCompactNumber(value: number, decimals: number = 1): string {
  if (value === 0) return '0';
  
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1_000_000_000) {
    return `${sign}${(absValue / 1_000_000_000).toFixed(decimals)}B`;
  }
  if (absValue >= 1_000_000) {
    return `${sign}${(absValue / 1_000_000).toFixed(decimals)}M`;
  }
  if (absValue >= 1_000) {
    return `${sign}${(absValue / 1_000).toFixed(decimals)}K`;
  }
  
  return `${sign}${absValue.toFixed(decimals)}`;
}

/**
 * Format a percentage value
 * e.g., 0.1234 -> 12.34%, -0.05 -> -5%
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  const percentage = value * 100;
  const sign = percentage > 0 ? '+' : '';
  return `${sign}${percentage.toFixed(decimals)}%`;
}

/**
 * Format token age in human readable format
 * e.g., 30 -> "30s", 90 -> "1m", 3700 -> "1h"
 */
export function formatAge(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`;
  }
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m`;
  }
  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h`;
  }
  if (seconds < 604800) {
    return `${Math.floor(seconds / 86400)}d`;
  }
  if (seconds < 2592000) {
    return `${Math.floor(seconds / 604800)}w`;
  }
  return `${Math.floor(seconds / 2592000)}mo`;
}

/**
 * Truncate an address for display
 * e.g., "0x1234567890abcdef..." -> "0x12...cdef"
 */
export function truncateAddress(address: string, startChars: number = 4, endChars: number = 4): string {
  if (address.length <= startChars + endChars + 3) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format a large number with commas
 * e.g., 1234567 -> "1,234,567"
 */
export function formatNumberWithCommas(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Format a price with appropriate decimal places
 * Adjusts decimal places based on the value magnitude
 */
export function formatPrice(value: number): string {
  if (value === 0) return '$0';
  
  const absValue = Math.abs(value);
  
  if (absValue >= 1000) {
    return formatCurrency(value, 0);
  }
  if (absValue >= 1) {
    return `$${value.toFixed(2)}`;
  }
  if (absValue >= 0.01) {
    return `$${value.toFixed(4)}`;
  }
  if (absValue >= 0.0001) {
    return `$${value.toFixed(6)}`;
  }
  
  // For very small values, use scientific notation-like subscript
  const str = value.toFixed(10);
  const match = str.match(/^0\.(0+)(\d+)/);
  if (match) {
    const zeros = match[1].length;
    const significant = match[2].slice(0, 4);
    return `$0.0${zeros > 1 ? `₍${zeros}₎` : ''}${significant}`;
  }
  
  return `$${value.toFixed(8)}`;
}

/**
 * Format fee percentage
 * e.g., 0.025 -> "0.025"
 */
export function formatFee(value: number): string {
  return value.toFixed(3);
}

/**
 * Get color class based on percentage value
 */
export function getPercentageColorClass(value: number): string {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-zinc-400';
}

/**
 * Get background color class based on percentage value
 */
export function getPercentageBgClass(value: number): string {
  if (value > 0) return 'bg-green-500/10';
  if (value < 0) return 'text-red-500/10';
  return 'bg-zinc-500/10';
}

/**
 * Parse and validate a token address
 */
export function isValidAddress(address: string): boolean {
  // Basic validation - actual implementation would depend on the blockchain
  return /^[a-zA-Z0-9]{32,44}$/.test(address);
}


