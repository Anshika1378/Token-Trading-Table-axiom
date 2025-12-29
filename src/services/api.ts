
import type { Token, TokenCategory, TokenListResponse } from '@/types';
import { generateMockTokens } from '@/utilities/mockData';
import { UI_CONFIG } from '@/utilities/constants';

// Simulated API delay
const SIMULATED_DELAY = 800;

/**
 * Simulate API delay for realistic loading states
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch tokens for a specific category
 */
export async function fetchTokensByCategory(
  category: TokenCategory,
  page: number = 1,
  pageSize: number = UI_CONFIG.TOKENS_PER_PAGE
): Promise<TokenListResponse> {
  // Simulate network delay
  await delay(SIMULATED_DELAY);

  // Simulate occasional errors for testing error handling
  if (Math.random() < 0.02) {
    throw new Error('Network error: Failed to fetch tokens');
  }

  const allTokens = generateMockTokens(category, pageSize * 3);
  const startIndex = (page - 1) * pageSize;
  const tokens = allTokens.slice(startIndex, startIndex + pageSize);

  return {
    tokens,
    total: allTokens.length,
    page,
    pageSize,
    hasMore: startIndex + pageSize < allTokens.length,
  };
}

/**
 * Fetch a single token by ID
 */
export async function fetchTokenById(tokenId: string): Promise<Token | null> {
  await delay(SIMULATED_DELAY / 2);

  // In a real app, this would fetch from the API
  // For mock purposes, generate a token with the given ID pattern
  const [category] = tokenId.split('-') as [TokenCategory];
  const token = generateMockTokens(category || 'new-pairs', 1)[0];
  
  return {
    ...token,
    id: tokenId,
  };
}

/**
 * Fetch all tokens for all categories
 */
export async function fetchAllTokens(): Promise<Record<TokenCategory, Token[]>> {
  await delay(SIMULATED_DELAY);

  return {
    'new-pairs': generateMockTokens('new-pairs', 10),
    'final-stretch': generateMockTokens('final-stretch', 10),
    'migrated': generateMockTokens('migrated', 10),
  };
}

/**
 * Progressive fetch - returns tokens one by one
 * Used for progressive loading animation
 */
export async function* fetchTokensProgressively(
  category: TokenCategory,
  count: number = 10
): AsyncGenerator<Token, void, unknown> {
  const tokens = generateMockTokens(category, count);
  
  for (const token of tokens) {
    await delay(UI_CONFIG.PROGRESSIVE_LOAD_DELAY);
    yield token;
  }
}

/**
 * Search tokens by name or symbol
 */
export async function searchTokens(
  query: string,
  category?: TokenCategory
): Promise<Token[]> {
  await delay(SIMULATED_DELAY / 2);

  const categories: TokenCategory[] = category 
    ? [category] 
    : ['new-pairs', 'final-stretch', 'migrated'];

  const allTokens = categories.flatMap((cat) => generateMockTokens(cat, 20));
  const normalizedQuery = query.toLowerCase();

  return allTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(normalizedQuery) ||
      token.symbol.toLowerCase().includes(normalizedQuery) ||
      token.address.toLowerCase().includes(normalizedQuery)
  );
}


