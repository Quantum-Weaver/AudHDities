// src/lib/constants/components/asgard/auth/auth.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH VARIANTS (UPDATED)                                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

import {
  AUTH_BUTTON_VARIANTS,
  AUTH_BUTTON_PADDING,
  AUTH_BUTTON_RADIUS,
  AUTH_TRANSITION_DURATION,
  AUTH_TRANSITION_EASING,
  AUTH_PAGE_PADDING,
  AUTH_PAGE_GRADIENT,
} from './auth.constants';

// ─── Auth Button ───────────────────────────────────────────────────────────
export const authButtonVariants = cva(
  [
    'flex',
    'items-center',
    'gap-2',
    `px-[${AUTH_BUTTON_PADDING.X}]`,
    `py-[${AUTH_BUTTON_PADDING.Y}]`,
    'transition-all',
    `duration-[${AUTH_TRANSITION_DURATION}ms]`,
    `ease-[${AUTH_TRANSITION_EASING}]`,
  ].join(' '),
  {
    variants: {
      variant: {
        // "hover:" prefixes removed — isHovered variant handles the interaction layer
        [AUTH_BUTTON_VARIANTS.AUTHENTICATED]: 'text-star-dust/80',
        [AUTH_BUTTON_VARIANTS.UNAUTHENTICATED]: [
          'bg-neurospark/20',
          'border',
          'border-neurospark/30',
          `rounded-[${AUTH_BUTTON_RADIUS}]`,
          'text-neurospark',
        ].join(' '),
      },
      // ─── NEW ──────────────────────────────────────────────────────────
      isHovered: {
        true: 'opacity-100 scale-110',
        false: 'opacity-80',
      },
    },
    defaultVariants: {
      variant: AUTH_BUTTON_VARIANTS.UNAUTHENTICATED,
      isHovered: false,
    },
  }
);
// ─── Auth Page Container ───────────────────────────────────────────────────
export const authPageVariants = cva(
  [
    'flex',
    'min-h-screen',
    'items-center',
    'justify-center',
    `p-[${AUTH_PAGE_PADDING}]`,
  ].join(' '),
  {
    variants: {
      variant: {
        default: AUTH_PAGE_GRADIENT,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ─── Auth Page Content Wrapper ─────────────────────────────────────────────
export const authPageContentVariants = cva(
  'w-full max-w-md'
);

// ─── Auth Page Footer Text ─────────────────────────────────────────────────
export const authPageFooterVariants = cva(
  'mt-6 text-center text-star-dust/60'
);

// ─── Auth Loading Container ────────────────────────────────────────────────
export const authLoadingVariants = cva(
  [
    'flex',
    'min-h-screen',
    'items-center',
    'justify-center',
  ].join(' ')
);

// ─── Auth Spinner ──────────────────────────────────────────────────────────
export const authSpinnerVariants = cva(
  'animate-spin text-neurospark',
  {
    variants: {
      size: {
        default: 'h-8 w-8',
        sm: 'h-4 w-4',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// ─── Auth Loading Text ─────────────────────────────────────────────────────
export const authLoadingTextVariants = cva(
  'text-star-dust/60'
);

// ─── Auth Heading ──────────────────────────────────────────────────────────
export const authHeadingVariants = cva(
  [
    'text-2xl',
    'font-bold',
    'text-star-dust',
    'mb-2',
  ].join(' ')
);

// ─── Auth Subtext ──────────────────────────────────────────────────────────
export const authSubtextVariants = cva(
  'text-star-dust/60'
);

// ─── Auth Link ─────────────────────────────────────────────────────────────
export const authLinkVariants = cva(
  [
    'text-neurospark',
    'hover:text-neurospark/80',
    'hover:underline',
    'transition-colors',
    `duration-[${AUTH_TRANSITION_DURATION}ms]`,
  ].join(' ')
);

// ─── Auth Muted Text ───────────────────────────────────────────────────────
export const authMutedTextVariants = cva(
  'text-star-dust/40 text-sm'
);

// ─── Auth Label Text ───────────────────────────────────────────────────────
export const authLabelTextVariants = cva(
  'text-sm text-star-dust/80'
);

// ─── Type exports ──────────────────────────────────────────────────────────
export type AuthButtonVariant = NonNullable<
  Parameters<typeof authButtonVariants>[0]
>['variant'];