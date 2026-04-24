// src/lib/constants/components/ui/form.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM CONSTANTS                                         ║
// ║                    Single source of truth — spacing, sizing, layout       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/index';

// ─── Spacing Keys ──────────────────────────────────────────────────────────
export const FORM_SPACING_KEYS = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type FormSpacing = (typeof FORM_SPACING_KEYS)[keyof typeof FORM_SPACING_KEYS];

// ─── Spacing Value Map ─────────────────────────────────────────────────────
/** Maps spacing keys to Tailwind gap classes */
export const FORM_SPACING_CLASSES: Record<FormSpacing, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

// ─── Layout Spacing Tokens ─────────────────────────────────────────────────
/** Spacing tokens for form structural elements */
export const FORM_SPACING = {
  container: {
    gap: SPACING_SCALE['6'],       // 24px
    padding: SPACING_SCALE['6'],   // 24px
  },
  section: {
    gap: SPACING_SCALE['4'],       // 16px
    marginBottom: SPACING_SCALE['8'], // 32px
  },
  field: {
    gap: SPACING_SCALE['2'],       // 8px
    marginBottom: SPACING_SCALE['4'], // 16px
  },
  fieldGroup: {
    gap: SPACING_SCALE['4'],       // 16px
  },
  actions: {
    gap: SPACING_SCALE['4'],       // 16px
    marginTop: SPACING_SCALE['6'], // 24px
  },
} as const;

// ─── Default Values ────────────────────────────────────────────────────────
export const FORM_DEFAULTS = {
  SPACING: 'md' as FormSpacing,
  VALIDATE_ON_SUBMIT: true,
  SHOW_REQUIRED_INDICATOR: true,
} as const;