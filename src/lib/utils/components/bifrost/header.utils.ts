// src/utils/components/bifrost/header.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HEADER UTILITIES (UPDATED)                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  HeaderVariant,
  HeaderConsciousnessLevel,
} from '@/types/components/bifrost/header.types';

import {
  HEADER_VARIANTS,
} from '@/lib/constants/components/bifrost/header.constants';

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

// ─── Hover Interaction — NEW ───────────────────────────────────────────────

export interface HeaderHoverProps {
  /** Whether the title is currently hovered */
  isHovered: boolean;
  /** Spread these onto the Link element */
  linkProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
  /** Call this to set hover state (for use in a useState or useReducer) */
  hoverHandlers: {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleFocus: () => void;
    handleBlur: () => void;
  };
}

/**
 * Creates hover interaction state and handlers for the header title.
 * Returns both the boolean state and the event handlers to wire up.
 *
 * Usage in component:
 *   const [isHovered, setIsHovered] = useState(false);
 *   const { linkProps } = useHeaderHover(setIsHovered);
 *
 *   <Link {...linkProps}>
 *     <span className={headerTitleVariants({ variant, isHovered })}>
 *
 * Or with the hoverHandlers pattern:
 *   const [isHovered, setIsHovered] = useState(false);
 *   const { hoverHandlers } = buildHeaderHoverHandlers(setIsHovered);
 */
export function buildHeaderHoverHandlers(
  setHovered: (value: boolean) => void
): Pick<HeaderHoverProps, 'hoverHandlers'> {
  return {
    hoverHandlers: {
      handleMouseEnter: () => setHovered(true),
      handleMouseLeave: () => setHovered(false),
      handleFocus: () => setHovered(true),
      handleBlur: () => setHovered(false),
    },
  };
}

/**
 * Composes the title class string including hover state.
 * This is a convenience wrapper around the CVA call.
 */
export function composeHeaderTitleClasses(params: {
  variant: HeaderVariant;
  isHovered: boolean;
  className?: string;
}): string {
  return [
    'transition-all',
    params.isHovered ? 'opacity-100 scale-110' : 'opacity-80',
    params.className,
  ]
    .filter(Boolean)
    .join(' ');
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