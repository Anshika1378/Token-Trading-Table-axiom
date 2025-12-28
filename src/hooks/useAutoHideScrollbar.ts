/**
 * useAutoHideScrollbar Hook
 * Shows scrollbar only while scrolling, hides after delay
 * Matches Axiom Trade's scrollbar behavior
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseAutoHideScrollbarOptions {
  /** Delay in ms before hiding scrollbar after scroll stops */
  hideDelay?: number;
  /** Class to add when scrolling */
  scrollingClass?: string;
}

/**
 * Hook that returns a ref to attach to a scrollable element.
 * Adds a class while scrolling and removes it after a delay.
 */
export function useAutoHideScrollbar<T extends HTMLElement>(
  options: UseAutoHideScrollbarOptions = {}
) {
  const { hideDelay = 1000, scrollingClass = 'is-scrolling' } = options;
  const elementRef = useRef<T>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add scrolling class
    element.classList.add(scrollingClass);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timeout to remove class after delay
    timeoutRef.current = setTimeout(() => {
      element.classList.remove(scrollingClass);
    }, hideDelay);
  }, [hideDelay, scrollingClass]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  return elementRef;
}

export default useAutoHideScrollbar;

