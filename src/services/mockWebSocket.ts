
import type { Token, PriceUpdate, PriceDirection, TokenCategory } from '@/types';
import { WEBSOCKET_CONFIG } from '@/utilities/constants';

type PriceUpdateCallback = (updates: PriceUpdate[]) => void;
type ConnectionCallback = (connected: boolean) => void;
type NewTokenCallback = (token: Token) => void;

interface MockWebSocketOptions {
  onPriceUpdate: PriceUpdateCallback;
  onConnectionChange: ConnectionCallback;
  onNewToken?: NewTokenCallback;
  updateInterval?: number;
}

/**
 * MockWebSocketService simulates a WebSocket connection
 * that streams price updates at regular intervals
 */
export class MockWebSocketService {
  private tokens: Map<string, Token> = new Map();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private isConnected: boolean = false;
  private options: MockWebSocketOptions;
  private updateInterval: number;

  constructor(options: MockWebSocketOptions) {
    this.options = options;
    this.updateInterval = options.updateInterval ?? WEBSOCKET_CONFIG.PRICE_UPDATE_INTERVAL;
  }

  /**
   * Update the callbacks (useful when React components re-render)
   */
  updateCallbacks(options: Partial<MockWebSocketOptions>): void {
    if (options.onPriceUpdate) {
      this.options.onPriceUpdate = options.onPriceUpdate;
    }
    if (options.onConnectionChange) {
      this.options.onConnectionChange = options.onConnectionChange;
    }
    if (options.onNewToken) {
      this.options.onNewToken = options.onNewToken;
    }
  }

  /**
   * Connect to the mock WebSocket
   */
  connect(): void {
    if (this.isConnected) return;

    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      this.options.onConnectionChange(true);
      this.startPriceUpdates();
    }, 500);
  }

  /**
   * Disconnect from the mock WebSocket
   */
  disconnect(): void {
    if (!this.isConnected) return;

    this.stopPriceUpdates();
    this.isConnected = false;
    this.options.onConnectionChange(false);
  }

  /**
   * Register tokens to receive price updates
   */
  registerTokens(tokens: Token[]): void {
    tokens.forEach((token) => {
      this.tokens.set(token.id, token);
    });
  }

  /**
   * Unregister a token from price updates
   */
  unregisterToken(tokenId: string): void {
    this.tokens.delete(tokenId);
  }

  /**
   * Clear all registered tokens
   */
  clearTokens(): void {
    this.tokens.clear();
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  /**
   * Start streaming price updates
   */
  private startPriceUpdates(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.generatePriceUpdates();
    }, this.updateInterval);
  }

  /**
   * Stop streaming price updates
   */
  private stopPriceUpdates(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Generate and emit price updates for registered tokens
   */
  private generatePriceUpdates(): void {
    const updates: PriceUpdate[] = [];
    const tokensArray = Array.from(this.tokens.values());

    // Update ~20-40% of tokens each cycle for realistic simulation
    const updateCount = Math.floor(tokensArray.length * (0.2 + Math.random() * 0.2));
    const tokensToUpdate = this.shuffleArray(tokensArray).slice(0, updateCount);

    tokensToUpdate.forEach((token) => {
      const update = this.generateSingleUpdate(token);
      if (update) {
        updates.push(update);
        // Update the stored token with new values
        this.updateStoredToken(token.id, update);
      }
    });

    if (updates.length > 0) {
      this.options.onPriceUpdate(updates);
    }
  }

  /**
   * Generate a single price update for a token
   */
  private generateSingleUpdate(token: Token): PriceUpdate | null {
    // Random price change between -8% and +12% (slight upward bias for meme coins)
    const changePercent = (Math.random() - 0.4) * 0.2;
    
    // Small chance of larger movement
    const volatilityBoost = Math.random() > 0.95 ? (Math.random() - 0.5) * 0.5 : 0;
    const totalChange = changePercent + volatilityBoost;

    const newPrice = Math.max(0.0000001, token.metrics.price * (1 + totalChange));
    const newMarketCap = Math.max(100, token.metrics.marketCap * (1 + totalChange));
    
    // Volume changes independently
    const volumeChange = (Math.random() - 0.3) * 0.1;
    const newVolume = Math.max(0, token.metrics.volume * (1 + volumeChange));

    // Determine price direction
    let direction: PriceDirection = 'neutral';
    if (newPrice > token.metrics.price * 1.001) {
      direction = 'up';
    } else if (newPrice < token.metrics.price * 0.999) {
      direction = 'down';
    }

    return {
      tokenId: token.id,
      oldPrice: token.metrics.price,
      newPrice,
      oldMarketCap: token.metrics.marketCap,
      newMarketCap,
      oldVolume: token.metrics.volume,
      newVolume,
      direction,
      timestamp: Date.now(),
    };
  }

  /**
   * Update the stored token with new values from update
   */
  private updateStoredToken(tokenId: string, update: PriceUpdate): void {
    const token = this.tokens.get(tokenId);
    if (!token) return;

    this.tokens.set(tokenId, {
      ...token,
      metrics: {
        ...token.metrics,
        price: update.newPrice,
        marketCap: update.newMarketCap,
        volume: update.newVolume,
      },
      ageInSeconds: token.ageInSeconds + Math.floor(this.updateInterval / 1000),
      updatedAt: update.timestamp,
    });
  }

  /**
   * Shuffle array for random token selection
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// Singleton instance for the application
let mockWebSocketInstance: MockWebSocketService | null = null;

/**
 * Get or create the mock WebSocket service instance
 * If instance exists, updates callbacks to ensure they're current
 */
export function getMockWebSocketService(options: MockWebSocketOptions): MockWebSocketService {
  if (!mockWebSocketInstance) {
    mockWebSocketInstance = new MockWebSocketService(options);
  } else {
    // Update callbacks to ensure they're current
    mockWebSocketInstance.updateCallbacks(options);
  }
  return mockWebSocketInstance;
}

/**
 * Reset the mock WebSocket service (useful for testing)
 */
export function resetMockWebSocketService(): void {
  if (mockWebSocketInstance) {
    mockWebSocketInstance.disconnect();
    mockWebSocketInstance = null;
  }
}

