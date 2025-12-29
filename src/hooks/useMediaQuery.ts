

'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for responsive design with SSR support
 * @param query - CSS media query string (e.g., '(min-width: 1024px)')
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with a function to safely check on client
  const getMatches = useCallback((q: string): boolean => {
    // Prevent SSR issues by checking for window
    if (typeof window !== 'undefined') {
      return window.matchMedia(q).matches;
    }
    return false;
  }, []);

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));
  
  // Track if component has mounted (for SSR hydration)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set correct value after mount
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query, getMatches]);

  // Return false during SSR/hydration to match server render
  // This prevents hydration mismatch errors
  if (!mounted) {
    return false;
  }

  return matches;
}

// Convenience hook for desktop breakpoint (>= 1024px)
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

// Convenience hook for tablet breakpoint (>= 768px)
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px)');
}

// Convenience hook for mobile (< 768px)
export function useIsMobile(): boolean {
  return !useMediaQuery('(min-width: 768px)');
}


