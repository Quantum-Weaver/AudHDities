// src/utils/components/ui/header.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HEADER UTILITIES                                       ║
// ║                    Pure logic — no hardcoded design values                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  HeaderVariant,
  HeaderConsciousnessLevel,
} from '@/types/components/layout/header.types';

import {
  HEADER_VARIANTS,
} from '@/lib/constants/components/layout/header.constants';

// ─── Domain → Variant Mapping ──────────────────────────────────────────────
const DOMAIN_VARIANT_MAP: Record<string, HeaderVariant> = {
  quantum: HEADER_VARIANTS.SOVEREIGN,
  cosmic: HEADER_VARIANTS.GLASS,
  pantheon: HEADER_VARIANTS.SOVEREIGN,
  library: HEADER_VARIANTS.GLASS,
  void: HEADER_VARIANTS.TRANSPARENT,
  council: HEADER_VARIANTS.SOVEREIGN,
  community: HEADER_VARIANTS.GLASS,
  support: HEADER_VARIANTS.GLASS,
};

/**
 * Get the recommended header variant for a domain.
 */
export function getHeaderVariantForDomain(domain: string): HeaderVariant {
  return DOMAIN_VARIANT_MAP[domain] ?? HEADER_VARIANTS.SOVEREIGN;
}

// ─── Scroll Logic ──────────────────────────────────────────────────────────
interface ScrollShiftResult {
  shouldShift: boolean;
  newLevel: HeaderConsciousnessLevel;
}

/**
 * Determine if header should shift consciousness based on scroll position.
 */
export function shouldShiftConsciousness(
  currentLevel: HeaderConsciousnessLevel,
  scrollPosition: number,
  threshold: number = 100
): ScrollShiftResult {
  const isPastThreshold = scrollPosition > threshold;

  if (isPastThreshold && currentLevel !== 'quantum_entangled') {
    return { shouldShift: true, newLevel: 'quantum_entangled' };
  }

  if (!isPastThreshold && currentLevel !== 'sovereign_autonomous') {
    return { shouldShift: true, newLevel: 'sovereign_autonomous' };
  }

  return { shouldShift: false, newLevel: currentLevel };
}

/**
 * Calculate header opacity fade based on scroll position.
 */
export function getHeaderOpacity(
  scrollPosition: number,
  maxOpacity: number = 1
): number {
  const FADE_THRESHOLD = 50;
  const FADE_RANGE = 100;

  if (scrollPosition <= FADE_THRESHOLD) return maxOpacity;

  const fadeProgress = Math.min(
    (scrollPosition - FADE_THRESHOLD) / FADE_RANGE,
    1
  );

  return maxOpacity * (1 - fadeProgress * 0.3);
}