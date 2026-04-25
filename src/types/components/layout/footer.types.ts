// src/types/components/layout/footer.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FOOTER TYPES                                           ║
// ║                    All type definitions for the Footer component          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { FooterVariant, FooterSize } from '@/lib/constants/components/layout/footer.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { FooterVariant, FooterSize };

// ─── Link Definition ───────────────────────────────────────────────────────
export interface FooterLink {
  href: string;
  label: string;
}

// ─── Footer Props ──────────────────────────────────────────────────────────
export interface FooterProps {
  /** Visual variant */
  variant?: FooterVariant;
  /** Padding size */
  size?: FooterSize;
  /** Custom copyright text (overrides default) */
  copyright?: string;
  /** Custom links (overrides defaults) */
  links?: FooterLink[];
  /** Additional CSS classes */
  className?: string;
}