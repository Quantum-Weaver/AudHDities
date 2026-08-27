// src/lib/constants/components/asgard/domains/hestia/home/home.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HOME PAGE VARIANTS                                     ║
// ║                    Raw values — no CVA, no logic                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { cva } from 'class-variance-authority';
import { HOME_TRANSITION } from './home.constants';

export const homeHeroSectionVariants = cva(
  'min-h-screen flex-wrap inline-flex items-center justify-center'
);

// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const homeHeroWrapperVariants = cva(
  'relative w-full py-20 px-6'
);

export const homeHeroBgVariants = cva(
  'absolute inset-0 bg-gradient-to-br from-deep-space via-deep-space/95 to-deep-space/90'
);

// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const homeOrbVariants = cva(
  'absolute rounded-full blur-3xl animate-pulse w-96 h-96',
  {
    variants: {
      color: {
        cyan: 'bg-neurospark/5',
        purple: 'bg-quantum-purple/5',
      },
      position: {
        topLeft: 'top-1/4 left-1/4',
        bottomRight: 'bottom-1/4 right-1/4',
      },
    },
    defaultVariants: { color: 'cyan', position: 'topLeft' },
  }
);

export const homeContentVariants = cva(
  'relative z-10 container flex-cols mx-auto text-center'
);

export const homeBadgeVariants = cva(
  [
    'inline-flex items-center gap-2',
    'bg-white/5 backdrop-blur-sm',
    'px-4 py-2',
    // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
    'rounded-full',
    'mb-8 border border-white/10',
  ].join(' ')
);

export const homeBadgeIconVariants = cva('text-neurospark');
export const homeBadgeTextVariants = cva('text-sm text-star-dust/70');

export const homeHeadingVariants = cva(
  'text-5xl md:text-7xl font-bold text-star-dust mb-6 leading-tight'
);

export const homeHeadingHighlightVariants = cva(
  'bg-gradient-to-r from-neurospark via-quantum-purple to-fire-base bg-clip-text text-neurospark/70'
);

export const homeSubtitleVariants = cva(
  'text-xl text-star-dust/70 mx-auto mb-12'
);

export const homeCtaContainerVariants = cva(
  'flex flex-wrap gap-4 justify-center mb-16'
);

export const homeCtaIconVariants = cva(
  'ml-2 group-hover:translate-x-1 transition-transform'
);

export const homeTrustMarkersVariants = cva(
  'flex flex-wrap gap-6 justify-center text-sm text-star-dust/40'
);