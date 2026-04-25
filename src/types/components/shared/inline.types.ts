// src/types/components/shared/inline.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INLINE TYPES                                           ║
// ║                    Type definitions for the Inline component              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  InlineSpace,
  InlineAlign,
} from '@/lib/constants/components/yggdrasil/inline.constants';

// ─── Re-exports from constants ─────────────────────────────────────────────
export type { InlineSpace, InlineAlign };

// ─── Component Props ───────────────────────────────────────────────────────
export interface InlineProps {
  /** Space between children (maps to Tailwind gap scale) */
  space?: InlineSpace;
  /** Horizontal alignment of children */
  align?: InlineAlign;
  /** Whether children should wrap on smaller screens */
  wrap?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Child elements */
  children: React.ReactNode;
}