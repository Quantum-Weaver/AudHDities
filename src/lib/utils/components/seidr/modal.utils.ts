// src/utils/components/seidr/modal.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    MODAL UTILITIES                                        ║
// ║                    Focus trap, scroll lock, portal helpers                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { useEffect, useCallback, useState, type RefObject } from 'react';
import { MODAL_TRANSITION_DURATION } from '@/lib/constants/components/seidr/modal.constants';

// ─── Focus Trap ────────────────────────────────────────────────────────────
/**
 * Traps focus within a modal container for accessibility.
 * Handles Tab/Shift+Tab cycling between first and last focusable elements.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean
): void {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element on mount
    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [active, containerRef]);
}

// ─── Escape Key Handler ────────────────────────────────────────────────────
/**
 * Calls onClose when Escape key is pressed.
 */
export function useEscapeKey(
  onClose: () => void,
  active: boolean,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!active || !enabled) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [active, enabled, onClose]);
}

// ─── Scroll Lock ───────────────────────────────────────────────────────────
/**
 * Prevents body scroll when modal is open.
 * Restores original overflow on cleanup.
 */
export function useScrollLock(active: boolean, enabled: boolean = true): void {
  useEffect(() => {
    if (!active || !enabled) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [active, enabled]);
}

// ─── Portal Mount ──────────────────────────────────────────────────────────
/**
 * Returns true once component is mounted (for portal rendering).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
}

// ─── Modal State Hook ──────────────────────────────────────────────────────
/**
 * Hook for managing modal open/close state.
 *
 * @example
 * const { isOpen, open, close, toggle } = useModalState();
 */
export function useModalState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

// ─── Animation Duration ────────────────────────────────────────────────────
export { MODAL_TRANSITION_DURATION as modalTransitionDuration };