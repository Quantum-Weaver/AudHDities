// src/components/yggdrasil/Inline.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INLINE COMPONENT                                       ║
// ║                    Horizontal spacing utility                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React, { Children } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  InlineProps,
  InlineSpace,
  InlineAlign,
} from '@/types/components/yggdrasil/inline.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import { inlineVariants } from '@/lib/constants/components/yggdrasil/inline.variants';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  INLINE_DEFAULT_SPACE,
  INLINE_DEFAULT_ALIGN,
} from '@/lib/constants/components/yggdrasil/inline.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getResponsiveVariant,
} from '@/lib/utils/components/yggdrasil/inline.utils';

// ═══════════════════════════════════════════════════════════════════════════
// INLINE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Inline — Horizontal flex container with consistent spacing.
 *
 * Wraps children in a flex row with configurable gap, alignment, wrapping,
 * and responsive stacking behavior. Spacing values map directly to the
 * COSMIC 4px grid scale.
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
 * <Inline space="2" align="center" wrap={false}>
 *   <Badge>Quantum</Badge>
 *   <Badge>Cosmic</Badge>
 * </Inline>
 *
 * @example
 * // Spread between, auto-responsive stacking
 * <Inline space="6" align="between" responsive="stackOnMobile">
 *   <Logo />
 *   <Nav />
 *   <UserMenu />
 * </Inline>
 *
 * @example
 * // Auto-detect responsive behavior from child count
 * <Inline space="4" align="start" responsive="auto" wrap>
 *   <StatCard />
 *   <StatCard />
 *   <StatCard />
 *   <StatCard />
 * </Inline>
 */
export function Inline({
  space = INLINE_DEFAULT_SPACE,
  align = INLINE_DEFAULT_ALIGN,
  wrap = true,
  responsive = 'none',
  className,
  children,
}: InlineProps) {
  const resolvedResponsive =
    responsive === 'auto'
      ? getResponsiveVariant(Children.count(children))
      : responsive;

  return (
    <div
      className={cn(
        inlineVariants({
          space,
          align,
          wrap: wrap ? true : false,
          responsive: resolvedResponsive,
        }),
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Re-export types for convenience ───────────────────────────────────────
export type {
  InlineProps,
  InlineSpace,
  InlineAlign,
} from '@/types/components/yggdrasil/inline.types';