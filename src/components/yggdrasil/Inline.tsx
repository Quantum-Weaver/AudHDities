// src/components/yggdrasil/Inline.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INLINE COMPONENT                                       ║
// ║                    Horizontal spacing utility                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { InlineProps } from '@/types/components/yggdrasil/inline.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  INLINE_DEFAULT_SPACE,
  INLINE_DEFAULT_ALIGN,
  INLINE_BASE_CLASSES,
  INLINE_WRAP_CLASS,
  INLINE_SPACE_TO_GAP_CLASS,
  INLINE_ALIGN_TO_JUSTIFY_CLASS,
} from '@/lib/constants/components/yggdrasil/inline.constants';

// ═══════════════════════════════════════════════════════════════════════════
// INLINE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Inline — Horizontal flex container with consistent spacing.
 *
 * Wraps children in a flex row with configurable gap, alignment, and wrapping.
 * Spacing values map directly to the COSMIC 4px grid scale.
 *
 * @example
 * // Default spacing (gap-4), start-aligned, wraps on mobile
 * <Inline>
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </Inline>
 *
 * @example
 * // Tight spacing, centered, no wrap
 * <Inline space={2} align="center" wrap={false}>
 *   <Badge>Quantum</Badge>
 *   <Badge>Cosmic</Badge>
 * </Inline>
 *
 * @example
 * // Spread between, responsive wrap
 * <Inline space={6} align="between">
 *   <Logo />
 *   <Nav />
 *   <UserMenu />
 * </Inline>
 */
export function Inline({
  space = INLINE_DEFAULT_SPACE,
  align = INLINE_DEFAULT_ALIGN,
  wrap = true,
  className,
  children,
}: InlineProps) {
  return (
    <div
      className={cn(
        INLINE_BASE_CLASSES,
        INLINE_SPACE_TO_GAP_CLASS[space],
        INLINE_ALIGN_TO_JUSTIFY_CLASS[align],
        wrap && INLINE_WRAP_CLASS,
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Re-export types for convenience ───────────────────────────────────────
export type { InlineProps, InlineSpace, InlineAlign } from '@/types/components/yggdrasil/inline.types';