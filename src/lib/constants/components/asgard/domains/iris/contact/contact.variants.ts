// src/lib/constants/components/asgard/domains/iris/contact/contact.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTACT PAGE VARIANTS                                  ║
// ║                    CVA definitions referencing COSMIC tokens              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

import {
  CONTACT_DIMENSIONS,
  CONTACT_SUCCESS_DIMENSIONS,
} from './contact.constants';

// ─── Hero Section ──────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactHeroSectionVariants = cva(
  [
    'relative',
    'py-20',
    'overflow-hidden',
  ].join(' ')
);

export const contactHeroOverlayVariants = cva(
  [
    'absolute',
    'inset-0',
    'bg-gradient-to-br',
    'from-neurospark/5',
    'via-quantum-purple/5',
    'to-fire-base/5',
  ].join(' ')
);

// ─── Hero Orbs ─────────────────────────────────────────────────────────────
export const contactOrbVariants = cva(
  'absolute rounded-full blur-3xl animate-pulse',
  {
    variants: {
      // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
      color: {
        cyan: 'bg-neurospark/5 w-72 h-72',
        purple: 'bg-quantum-purple/5 w-96 h-96',
      },
      position: {
        topLeft: 'top-1/4 left-1/4',
        bottomRight: 'bottom-1/4 right-1/4',
      },
    },
    defaultVariants: {
      color: 'cyan',
      position: 'topLeft',
    },
  }
);

// ─── Hero Content ──────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactHeroContentVariants = cva(
  [
    'relative',
    'z-10',
    'container',
    'max-w-4xl',
    'mx-auto',
    'px-6',
    'text-center',
  ].join(' ')
);

// ─── Badge ─────────────────────────────────────────────────────────────────
export const contactBadgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'gap-2',
    'bg-white/10',
    'backdrop-blur-sm',
    'px-4',
    'py-2',
    // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
    'rounded-full',
    'mb-6',
    'border',
    'border-white/20',
  ].join(' ')
);

export const contactBadgeIconVariants = cva(
  'text-neurospark'
);

export const contactBadgeTextVariants = cva(
  'text-sm text-star-dust/80'
);

// ─── Heading ───────────────────────────────────────────────────────────────
export const contactHeadingVariants = cva(
  [
    'text-4xl',
    'md:text-6xl',
    'font-bold',
    'text-star-dust',
    'mb-6',
  ].join(' ')
);

export const contactSubtitleVariants = cva(
  [
    'text-xl',
    'text-star-dust/70',
    'max-w-2xl',
    'mx-auto',
  ].join(' ')
);

// ─── Page Container ────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactPageContainerVariants = cva(
  [
    'container',
    'max-w-6xl',
    'mx-auto',
    'px-6',
    'pb-20',
  ].join(' ')
);

// ─── Grid ──────────────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactGridVariants = cva(
  [
    'grid',
    'lg:grid-cols-3',
    'gap-8',
  ].join(' ')
);

// ─── Info Stack ────────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactInfoStackVariants = cva(
  'space-y-6'
);

// ─── Info Card ─────────────────────────────────────────────────────────────
export const contactInfoCardVariants = cva(
  [
    'p-6',
    'text-center',
    'transition-all',
    // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
    'duration-300',
    'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'group',
  ].join(' '),
  {
    variants: {
      accent: {
        cyan: 'hover:border-neurospark/30',
        purple: 'hover:border-quantum-purple/30',
        green: 'hover:border-sanctuary-green/30',
      },
    },
    defaultVariants: {
      accent: 'cyan',
    },
  }
);

// ─── Icon Container ────────────────────────────────────────────────────────
export const contactIconContainerVariants = cva(
  [
    CONTACT_DIMENSIONS.ICON_CONTAINER_SIZE,
    // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
    'rounded-xl',
    'flex',
    'items-center',
    'justify-center',
    'mx-auto',
    'mb-4',
    'group-hover:scale-110',
    'transition-transform',
  ].join(' '),
  {
    variants: {
      accent: {
        cyan: 'bg-neurospark/20',
        purple: 'bg-quantum-purple/20',
        green: 'bg-sanctuary-green/20',
      },
    },
    defaultVariants: {
      accent: 'cyan',
    },
  }
);

// ─── Icon ──────────────────────────────────────────────────────────────────
export const contactIconVariants = cva(
  '',
  {
    variants: {
      accent: {
        cyan: 'text-neurospark',
        purple: 'text-quantum-purple',
        green: 'text-sanctuary-green',
      },
    },
    defaultVariants: {
      accent: 'cyan',
    },
  }
);

// ─── Info Card Heading ─────────────────────────────────────────────────────
export const contactInfoHeadingVariants = cva(
  'text-star-dust font-bold mb-2'
);

// ─── Info Card Body ────────────────────────────────────────────────────────
export const contactInfoBodyVariants = cva(
  'text-sm text-star-dust/60'
);

// ─── Info Card Caption ─────────────────────────────────────────────────────
export const contactInfoCaptionVariants = cva(
  'text-xs text-star-dust/40 mt-2'
);

// ─── Link ──────────────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactLinkVariants = cva(
  [
    'text-neurospark',
    'hover:underline',
    'transition-colors',
    'duration-300',
  ].join(' ')
);

// ─── Email Link ────────────────────────────────────────────────────────────
export const contactEmailLinkVariants = cva(
  [
    'text-sm',
    'text-neurospark',
    'hover:underline',
    'break-all',
  ].join(' ')
);

// ─── Application Note ──────────────────────────────────────────────────────
export const contactAppNoteVariants = cva(
  [
    'bg-gradient-to-br',
    'from-neurospark/10',
    'to-quantum-purple/10',
    'border',
    'border-neurospark/20',
    // literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
    'rounded-xl',
    'p-5',
    'text-center',
  ].join(' ')
);

export const contactAppNoteIconVariants = cva(
  'text-fire-base mx-auto mb-2'
);

export const contactAppNoteTextVariants = cva(
  'text-sm text-star-dust/70'
);

export const contactAppNoteTitleVariants = cva(
  'text-neurospark font-bold'
);

// ─── Alternative Contact ───────────────────────────────────────────────────
export const contactAltContactVariants = cva(
  'text-center'
);

export const contactAltContactTextVariants = cva(
  'text-xs text-star-dust/30'
);

// ─── Form Container ────────────────────────────────────────────────────────
export const contactFormContainerVariants = cva(
  'lg:col-span-2'
);

// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactFormCardVariants = cva(
  [
    'p-6',
    'md:p-8',
  ].join(' ')
);

export const contactFormHeaderVariants = cva(
  'flex items-center gap-2 mb-6'
);

export const contactFormHeadingVariants = cva(
  'text-2xl font-bold text-star-dust'
);

export const contactFormIconVariants = cva(
  'text-neurospark'
);

// ─── Form Field ────────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactFormSpacingVariants = cva(
  'space-y-5'
);

export const contactFormLabelVariants = cva(
  'block text-sm font-medium text-star-dust mb-1'
);

export const contactFormRequiredVariants = cva(
  'text-error'
);

export const contactFormErrorTextVariants = cva(
  'text-xs text-error mt-1'
);

// ─── Error Alert ───────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactErrorAlertVariants = cva(
  [
    'p-3',
    'bg-error/10',
    'border',
    'border-error/30',
    'rounded-lg',
    'flex',
    'items-start',
    'gap-2',
  ].join(' ')
);

export const contactErrorIconVariants = cva(
  'text-error flex-shrink-0 mt-0.5'
);

export const contactErrorTextVariants = cva(
  'text-error text-sm'
);

// ─── Success State ─────────────────────────────────────────────────────────
// literal on purpose — Tailwind reads classes from source; a template here emitted nothing (2026-08-27)
export const contactSuccessContainerVariants = cva(
  [
    'text-center',
    'py-8',
  ].join(' ')
);

export const contactSuccessIconContainerVariants = cva(
  [
    CONTACT_SUCCESS_DIMENSIONS.ICON_CONTAINER,
    'bg-sanctuary-green/20',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'mx-auto',
    'mb-4',
  ].join(' ')
);

export const contactSuccessIconVariants = cva(
  'text-sanctuary-green'
);

export const contactSuccessHeadingVariants = cva(
  'text-xl font-bold text-star-dust mb-2'
);

export const contactSuccessBodyVariants = cva(
  'text-star-dust/60'
);

// ─── Type exports ──────────────────────────────────────────────────────────
export type ContactInfoCardAccent = NonNullable<
  Parameters<typeof contactInfoCardVariants>[0]
>['accent'];

export type ContactIconAccent = NonNullable<
  Parameters<typeof contactIconContainerVariants>[0]
>['accent'];