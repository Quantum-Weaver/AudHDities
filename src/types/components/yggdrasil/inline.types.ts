// src/types/components/yggdrasil/inline.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INLINE TYPES                                           ║
// ║                    Type definitions for the Inline component              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  InlineSpace,
  InlineAlign,
} from '@/lib/constants/components/yggdrasil/inline.constants';

import type { InlineResponsiveProp } from '@/lib/constants/components/yggdrasil/inline.variants';

// ─── Re-exports from constants ─────────────────────────────────────────────
export type { InlineSpace, InlineAlign, InlineResponsiveProp };

// ─── Component Props ───────────────────────────────────────────────────────
export interface InlineProps {
  /** Space between children (maps to Tailwind gap scale, e.g., '4' = 16px) */
  space?: InlineSpace;
  /** Horizontal alignment of children */
  align?: InlineAlign;
  /** Whether children should wrap on smaller screens */
  wrap?: boolean;
  /**
   * Responsive stacking behavior.
   * - 'none': Always horizontal
   * - 'stackOnMobile': Stacks vertically below sm breakpoint
   * - 'stackOnTablet': Stacks vertically below md breakpoint
   * - 'auto': Detects based on child count
   */
  responsive?: InlineResponsiveProp | 'auto';
  /** Additional CSS classes */
  className?: string;
  /** Child elements */
  children: React.ReactNode;
}