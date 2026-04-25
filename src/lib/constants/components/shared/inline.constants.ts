// src/lib/constants/components/shared/inline.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INLINE CONSTANTS                                       ║
// ║                    Spacing and alignment tokens for Inline component      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SCALE_MULTIPLIERS, type ScaleKey } from '@/lib/constants/cosmic/dimensions';

// ─── Allowed Spacing Keys ──────────────────────────────────────────────────
/** Spacing values available to the Inline component (subset of the full scale) */
export const INLINE_SPACING_KEYS = [
  '0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16',
] as const satisfies ReadonlyArray<ScaleKey>;

export type InlineSpace = (typeof INLINE_SPACING_KEYS)[number];

// ─── Default Spacing ───────────────────────────────────────────────────────
/** Default gap between children */
export const INLINE_DEFAULT_SPACE: InlineSpace = '4';

// ─── Alignment Tokens ──────────────────────────────────────────────────────
export const INLINE_ALIGNMENTS = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  BETWEEN: 'between',
  AROUND: 'around',
  EVENLY: 'evenly',
} as const;

export type InlineAlign = (typeof INLINE_ALIGNMENTS)[keyof typeof INLINE_ALIGNMENTS];

// ─── Default Alignment ─────────────────────────────────────────────────────
export const INLINE_DEFAULT_ALIGN: InlineAlign = INLINE_ALIGNMENTS.START;

// ─── Base Classes ──────────────────────────────────────────────────────────
/** Base flex classes applied to every Inline */
export const INLINE_BASE_CLASSES = 'flex flex-row' as const;

// ─── Wrap Class ────────────────────────────────────────────────────────────
export const INLINE_WRAP_CLASS = 'flex-wrap' as const;

// ─── Space → Tailwind Gap Class Map ────────────────────────────────────────
/** Maps spacing keys to Tailwind gap utility classes */
export const INLINE_SPACE_TO_GAP_CLASS: Record<InlineSpace, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
};

// ─── Alignment → Tailwind Justify Class Map ────────────────────────────────
export const INLINE_ALIGN_TO_JUSTIFY_CLASS: Record<InlineAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};