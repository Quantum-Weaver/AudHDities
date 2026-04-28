// src/lib/constants/components/runes/badge.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BADGE VARIANTS                                         ║
// ║                    CVA variant definitions — no hardcoded values          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  BADGE_BASE_CLASSES,
  BADGE_FONT_WEIGHT,
  BADGE_SIZES,
  BADGE_SIZE_VALUES,
  BadgeSize,
} from '../runes/badge.constants';
import {
  QUANTUM_COLORS,
  STATUS_COLORS,
  MOOD_COLORS,
  ENERGY_COLORS,
} from '@/lib/constants/cosmic/index';

// ─── Complete Variant Map (16 variants matching component) ─────────────────
const BADGE_VARIANT_STYLES = {
  default: {
    bg: 'bg-white/10',
    text: 'text-white/80',
    border: '',
  },
  primary: {
    bg: `bg-[${QUANTUM_COLORS['neurospark']}]/20`,
    text: `text-[${QUANTUM_COLORS['neurospark']}]`,
    border: `border border-[${QUANTUM_COLORS['neurospark']}]/30`,
  },
  success: {
    bg: `bg-[${STATUS_COLORS.complete}]/20`,
    text: `text-[${STATUS_COLORS.complete}]`,
    border: `border border-[${STATUS_COLORS.complete}]/30`,
  },
  warning: {
    bg: `bg-[${STATUS_COLORS.inDevelopment}]/20`,
    text: `text-[${STATUS_COLORS.inDevelopment}]`,
    border: `border border-[${STATUS_COLORS.inDevelopment}]/30`,
  },
  error: {
    bg: `bg-[${STATUS_COLORS.critical}]/20`,
    text: `text-[${STATUS_COLORS.critical}]`,
    border: `border border-[${STATUS_COLORS.critical}]/30`,
  },
  info: {
    bg: `bg-[${STATUS_COLORS.foundationLaid}]/20`,
    text: `text-[${STATUS_COLORS.foundationLaid}]`,
    border: `border border-[${STATUS_COLORS.foundationLaid}]/30`,
  },
  quantum: {
    bg: `bg-[${QUANTUM_COLORS['quantum.purple']}]/20`,
    text: `text-[${QUANTUM_COLORS['quantum.purple']}]`,
    border: `border border-[${QUANTUM_COLORS['quantum.purple']}]/30`,
  },
  cosmic: {
    bg: `bg-[${QUANTUM_COLORS['cosmic.blue']}]/20`,
    text: `text-[${QUANTUM_COLORS['cosmic.blue']}]`,
    border: `border border-[${QUANTUM_COLORS['cosmic.blue']}]/30`,
  },
  fire: {
    bg: `bg-[${QUANTUM_COLORS['fire.base']}]/20`,
    text: `text-[${QUANTUM_COLORS['fire.base']}]`,
    border: `border border-[${QUANTUM_COLORS['fire.base']}]/30`,
  },
  sanctuary: {
    bg: `bg-[${QUANTUM_COLORS['sanctuary.green']}]/20`,
    text: `text-[${QUANTUM_COLORS['sanctuary.green']}]`,
    border: `border border-[${QUANTUM_COLORS['sanctuary.green']}]/30`,
  },
  purple: {
    bg: `bg-[${MOOD_COLORS.mystical}]/20`,
    text: `text-[${MOOD_COLORS.mystical}]`,
    border: `border border-[${MOOD_COLORS.mystical}]/30`,
  },
  cyan: {
    bg: `bg-[${QUANTUM_COLORS['neurospark']}]/20`,
    text: `text-[${QUANTUM_COLORS['neurospark']}]`,
    border: `border border-[${QUANTUM_COLORS['neurospark']}]/30`,
  },
  pink: {
    bg: `bg-[${QUANTUM_COLORS['entity.curator']}]/20`,
    text: `text-[${QUANTUM_COLORS['entity.curator']}]`,
    border: `border border-[${QUANTUM_COLORS['entity.curator']}]/30`,
  },
  green: {
    bg: `bg-[${STATUS_COLORS.complete}]/20`,
    text: `text-[${STATUS_COLORS.complete}]`,
    border: `border border-[${STATUS_COLORS.complete}]/30`,
  },
  indigo: {
    bg: `bg-[${ENERGY_COLORS.quantum}]/20`,
    text: `text-[${ENERGY_COLORS.quantum}]`,
    border: `border border-[${ENERGY_COLORS.quantum}]/30`,
  },
  outline: {
    bg: 'bg-transparent',
    text: 'text-star-dust',
    border: 'border border-white/20',
  },
  ghost: {
    bg: 'bg-transparent',
    text: 'text-white/60',
    border: '',
  },
} as const;

// ─── Size Map ──────────────────────────────────────────────────────────────
const BADGE_SIZE_STYLES = {
  SM: [BADGE_SIZES.SM.paddingX, BADGE_SIZES.SM.paddingY, BADGE_SIZES.SM.fontSize],
  MD: [BADGE_SIZES.MD.paddingX, BADGE_SIZES.MD.paddingY, BADGE_SIZES.MD.fontSize],
  LG: [BADGE_SIZES.LG.paddingX, BADGE_SIZES.LG.paddingY, BADGE_SIZES.LG.fontSize],
} as const;

// ─── CVA Definition ────────────────────────────────────────────────────────
export const badgeVariants = cva(
  [...BADGE_BASE_CLASSES, BADGE_FONT_WEIGHT].join(' '),
  {
    variants: {
      variant: Object.fromEntries(
        (Object.keys(BADGE_VARIANT_STYLES) as BadgeVariantKey[]).map((key) => {
          const style = BADGE_VARIANT_STYLES[key];
          const classes = [style.bg, style.text, style.border]
            .filter(Boolean)
            .join(' ');
          return [key, classes];
        })
      ) as Record<BadgeVariantKey, string>,
    size: Object.fromEntries(
      (Object.keys(BADGE_SIZE_STYLES) as Array<keyof typeof BADGE_SIZE_STYLES>).map((key) => [
        BADGE_SIZE_VALUES[key],  // 'sm', 'md', 'lg' — the lowercase value
        BADGE_SIZE_STYLES[key].join(' '),  // the actual Tailwind classes
      ])
    ) as Record<BadgeSize, string>,
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ─── Hover overrides for interactive variants ──────────────────────────────
/** Hover styles applied when badge is interactive (ghost variant) */
export const BADGE_HOVER_OVERRIDES: Partial<Record<BadgeVariantKey, string>> = {
  ghost: 'hover:bg-white/5 hover:text-white',
  outline: 'hover:bg-white/5',
  indigo: 'hover:bg-indigo-500/30',
};

// ─── Types ─────────────────────────────────────────────────────────────────
type BadgeVariantKey = keyof typeof BADGE_VARIANT_STYLES;
type BadgeSizeKey = typeof BADGE_SIZE_VALUES;
export type { BadgeSize } from '../runes/badge.constants'
export type BadgeVariant = BadgeVariantKey;