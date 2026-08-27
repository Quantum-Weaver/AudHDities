/* src/lib/constants/components/bifrost/header.variants.ts */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HEADER VARIANTS                                        ║
// ║                    CVA definitions referencing COSMIC tokens              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

import {
  HEADER_VARIANTS,
  HEADER_DENSITIES,
  HEADER_HEIGHT,
} from './header.constants';

// ─── Container Variants ────────────────────────────────────────────────────
export const headerVariants = cva(
  [
    'sticky',
    'top-0',
    'w-full',
    'z-40',
    'border-b',
    'flex',
    'flex-cols',
    'items-center',
    'justify-center'
  ].join(' '),
  {
    variants: {
      variant: {
        [HEADER_VARIANTS.SOVEREIGN]: [
          'bg-deep-space/80',
          'backdrop-blur-xl',
          'border-white/5',
        ].join(' '),
        [HEADER_VARIANTS.TRANSPARENT]: [
          'bg-transparent',
          'backdrop-blur-none',
          'border-transparent',
        ].join(' '),
        [HEADER_VARIANTS.GLASS]: [
          'bg-surface/60',
          'backdrop-blur-2xl',
          'border-white/10',
        ].join(' '),
      },
      density: {
        [HEADER_DENSITIES.DEFAULT]: ``,
        [HEADER_DENSITIES.COMPACT]: '',
        [HEADER_DENSITIES.SPACIOUS]: '',
      },
    },
    defaultVariants: {
      variant: HEADER_VARIANTS.SOVEREIGN,
      density: HEADER_DENSITIES.DEFAULT,
    },
  }
);

// ─── Content Variants ──────────────────────────────────────────────────────
export const headerContentVariants = cva(
  [
    'container',
    'mx-auto',
    'flex',
    'flex-cols',
    'items-center',
    'justify-center',
  ].join(' '),
  {
    variants: {
      variant: {
        // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
        [HEADER_VARIANTS.SOVEREIGN]: 'px-6',
        [HEADER_VARIANTS.TRANSPARENT]: 'px-6',
        [HEADER_VARIANTS.GLASS]: 'px-7',
      },
    },
    defaultVariants: {
      variant: HEADER_VARIANTS.SOVEREIGN,
    },
  }
);

// ─── Title Variants ────────────────────────────────────────────────────────
export const headerTitleVariants = cva(
  [
    'transition-all',
    // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
    'duration-300',
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
  ].join(' '),
  {
    variants: {
      variant: {
        [HEADER_VARIANTS.SOVEREIGN]: 'text-xl text-star-dust',
        [HEADER_VARIANTS.TRANSPARENT]: 'text-xl text-star-dust',
        [HEADER_VARIANTS.GLASS]: 'text-lg text-star-dust/90',
      },
      isHovered: {
        true: 'opacity-100 scale-110',
        false: 'opacity-80',
      },
    },
    defaultVariants: {
      variant: HEADER_VARIANTS.SOVEREIGN,
      isHovered: false,
    },
  }
);

// ─── Subtitle Variants ─────────────────────────────────────────────────────
export const headerSubtitleVariants = cva(
  'text-xs transition-opacity',
  {
    variants: {
      variant: {
        [HEADER_VARIANTS.SOVEREIGN]: 'text-star-dust/70',
        [HEADER_VARIANTS.TRANSPARENT]: 'text-star-dust/50',
        [HEADER_VARIANTS.GLASS]: 'text-star-dust/60',
      },
    },
    defaultVariants: {
      variant: HEADER_VARIANTS.SOVEREIGN,
    },
  }
);

// ─── Type exports ──────────────────────────────────────────────────────────
export type HeaderVariantProp = NonNullable<
  Parameters<typeof headerVariants>[0]
>['variant'];

export type HeaderDensityProp = NonNullable<
  Parameters<typeof headerVariants>[0]
>['density'];