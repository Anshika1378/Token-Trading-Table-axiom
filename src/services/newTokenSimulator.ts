

import type { Token, TokenCategory } from '@/types';

// Sample token names for simulation
const TOKEN_NAMES = [
  'PEN', 'HEN', 'TEN', 'LEG', 'BEN', 'SEN', 'CEN', 'GEN', 'REN', 
  'EARTH', 'SUN', 'MARS', 'JUPITER', 'VENUS', 'PLOTO', 'MERCURY', 'SATURN', 'URANUS',
  'GME', 'TRUMP', 'ELON', 'MARS', 'MOON', 'ROCKET', 'APE', 'KONG', 'BEAR',
  'STAR', 'MONEY', 'COIN', 'BEAR', 'LION', 'PANDA', 'KOALA', 'DOLL',
  'CAT', 'DOG', 'RAT', 'BAT', 'BIRD', 'FISH', 'CRAB', 'SQUID', 'DRAGON',
  'ONEPLUS', 'APPLE', 'VIVO', 'OPPO', 'SUMSUNG', 'NOKIA', 'JIO', 'AIRTLE'
];

const SUFFIXES = ['', '2.0', 'AI', 'X', 'PRO', 'INU', 'COIN', 'TOKEN', 'SWAP', 'CHAIN'];

function generateRandomTokenName(): string {
  const name = TOKEN_NAMES[Math.floor(Math.random() * TOKEN_NAMES.length)];
  const suffix = Math.random() > 0.7 
    ? SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)] 
    : '';
  return `${name}${suffix}`;
}

function generateRandomAddress(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomColor(): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8B500', '#00CED1', '#FF69B4', '#32CD32', '#FF4500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

let tokenCounter = 1000;

export function generateNewToken(category: TokenCategory): Token {
  const id = `simulated-${++tokenCounter}`;
  const name = generateRandomTokenName();
  const symbol = name.substring(0, Math.min(6, name.length)).toUpperCase();
  const address = generateRandomAddress();
  
  // Generate random metrics
  const price = Math.random() * 0.001 + 0.00001;
  const marketCap = Math.random() * 500000 + 1000;
  const volume = Math.random() * 50000 + 100;
  const liquidity = Math.random() * 100000 + 1000;
  
  // New tokens start with 0 age
  const ageInSeconds = 0;
  
  // Risk metrics
  const topHolderPercentage = (Math.random() * 0.5 + 0.1); // 10-60%
  const devHoldingPercentage = (Math.random() * 0.3); // 0-30%
  const sniperPercentage = (Math.random() * 0.15); // 0-15%
  const bundlePercentage = (Math.random() * 0.1); // 0-10%
  
  return {
    id,
    name,
    symbol,
    address,
    category,
    imageUrl: '', // Will use avatar fallback
    createdAt: Date.now(),
    ageInSeconds,
    updatedAt: Date.now(),
    metrics: {
      price,
      priceChange: (Math.random() - 0.5) * 100,
      marketCap,
      volume,
      liquidity,
      holders: Math.floor(Math.random() * 100) + 1,
      transactions: Math.floor(Math.random() * 50) + 1,
      feePercentage: Math.random() * 0.05, // 0-5%
    },
    socialLinks: {
      website: Math.random() > 0.5 ? 'https://example.com' : undefined,
      twitter: Math.random() > 0.5 ? 'https://twitter.com/example' : undefined,
      telegram: Math.random() > 0.5 ? 'https://t.me/example' : undefined,
    },
    socialMetrics: {
      likes: Math.floor(Math.random() * 100),
      dislikes: Math.floor(Math.random() * 20),
      comments: Math.floor(Math.random() * 50),
      isBookmarked: false,
    },
    riskMetrics: {
      topHolderPercentage,
      devHoldingPercentage,
      sniperPercentage,
      bundlePercentage,
      riskScore: Math.floor(Math.random() * 100),
    },
  };
}

export type NewTokenCallback = (token: Token, category: TokenCategory) => void;

/**
 * NewTokenSimulator periodically generates new tokens
 */
export class NewTokenSimulator {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private callback: NewTokenCallback | null = null;
  private isRunning = false;
  private intervalMs: number;

  constructor(intervalMs: number = 3000) {
    this.intervalMs = intervalMs;
  }

  start(callback: NewTokenCallback): void {
    if (this.isRunning) return;

    this.callback = callback;
    this.isRunning = true;

    // Generate first token after a short delay
    setTimeout(() => {
      this.generateToken();
    }, 2000);

    this.intervalId = setInterval(() => {
      this.generateToken();
    }, this.intervalMs);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  private generateToken(): void {
    if (!this.callback) return;

    // Randomly select category (weighted towards new-pairs)
    const rand = Math.random();
    let category: TokenCategory;
    if (rand < 0.6) {
      category = 'new-pairs';
    } else if (rand < 0.85) {
      category = 'final-stretch';
    } else {
      category = 'migrated';
    }

    const token = generateNewToken(category);
    this.callback(token, category);
  }
}

// Singleton instance
let simulatorInstance: NewTokenSimulator | null = null;

export function getNewTokenSimulator(intervalMs?: number): NewTokenSimulator {
  if (!simulatorInstance) {
    simulatorInstance = new NewTokenSimulator(intervalMs);
  }
  return simulatorInstance;
}

export function resetNewTokenSimulator(): void {
  if (simulatorInstance) {
    simulatorInstance.stop();
    simulatorInstance = null;
  }
}

