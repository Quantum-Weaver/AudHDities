/* src/lib/constants/components/layout/navigation.variants.ts */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION VARIANTS                                    ║
// ║                    CVA definitions referencing COSMIC tokens              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

import {
  NAVIGATION_VARIANTS,
  NAV_ITEM_STATES,
  NAV_BAR_HEIGHT,
  NAV_ITEM_PADDING,
  NAV_MOBILE_ITEM_PADDING,
  NAV_ITEM_GAP,
  NAV_ITEM_RADIUS,
  NAV_TRANSITION_DURATION,
  NAV_TRANSITION_EASING,
} from './navigation.constants';

// ─── Nav Container ─────────────────────────────────────────────────────────
export const navContainerVariants = cva(
  'hidden md:block',
  {
    variants: {
      variant: {
        [NAVIGATION_VARIANTS.DESKTOP]: '',
        [NAVIGATION_VARIANTS.MOBILE]: 'md:hidden',
      },
    },
    defaultVariants: {
      variant: NAVIGATION_VARIANTS.DESKTOP,
    },
  }
);

// ─── Nav Bar ───────────────────────────────────────────────────────────────
export const navBarVariants = cva(
  [
    'flex',
    'items-center',
    'justify-between',
    `h-[${NAV_BAR_HEIGHT}]`,
  ].join(' '),
  {
    variants: {
      variant: {
        [NAVIGATION_VARIANTS.DESKTOP]: '',
        [NAVIGATION_VARIANTS.MOBILE]: '',
      },
    },
    defaultVariants: {
      variant: NAVIGATION_VARIANTS.DESKTOP,
    },
  }
);

// ─── Brand Text ────────────────────────────────────────────────────────────
export const navBrandVariants = cva(
  [
    'font-bold',
    'bg-gradient-to-r',
    'from-neurospark',
    'to-quantum-purple',
    'bg-clip-text',
    'text-transparent',
    'flex-shrink-0',
  ].join(' '),
  {
    variants: {
      size: {
        desktop: 'text-lg',
        mobile: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'desktop',
    },
  }
);

// ─── Nav Link ──────────────────────────────────────────────────────────────
export const navLinkVariants = cva(
  [
    'flex',
    'items-center',
    `gap-[${NAV_ITEM_GAP}]`,
    `rounded-[${NAV_ITEM_RADIUS}]`,
    'text-sm',
    'font-medium',
    'transition-all',
    `duration-[${NAV_TRANSITION_DURATION}ms]`,
    `ease-[${NAV_TRANSITION_EASING}]`,
  ].join(' '),
  {
    variants: {
      state: {
        [NAV_ITEM_STATES.DEFAULT]: 'text-white/60 hover:text-white hover:bg-white/5',
        [NAV_ITEM_STATES.ACTIVE]: 'bg-neurospark/20 text-neurospark',
        [NAV_ITEM_STATES.HOVER]: 'text-white bg-white/5',
      },
      variant: {
        [NAVIGATION_VARIANTS.DESKTOP]: `px-[${NAV_ITEM_PADDING.X}] py-[${NAV_ITEM_PADDING.Y}]`,
        [NAVIGATION_VARIANTS.MOBILE]: `px-[${NAV_MOBILE_ITEM_PADDING.X}] py-[${NAV_MOBILE_ITEM_PADDING.Y}]`,
      },
    },
    defaultVariants: {
      state: NAV_ITEM_STATES.DEFAULT,
      variant: NAVIGATION_VARIANTS.DESKTOP,
    },
  }
);

// ─── Mobile Menu Container ─────────────────────────────────────────────────
export const navMobileMenuVariants = cva(
  [
    'absolute',
    'top-14',
    'left-0',
    'right-0',
    'bg-deep-space/95',
    'backdrop-blur-lg',
    'border-b',
    'border-white/10',
    'z-50',
    'shadow-lg',
  ].join(' '),
  {
    variants: {
      isOpen: {
        true: 'block',
        false: 'hidden',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

// ─── Mobile Menu Toggle Button ─────────────────────────────────────────────
export const navMobileToggleVariants = cva(
  [
    'p-2',
    `rounded-[${NAV_ITEM_RADIUS}]`,
    'text-white/60',
    'hover:text-white',
    'hover:bg-white/5',
    'transition-all',
    `duration-[${NAV_TRANSITION_DURATION}ms]`,
  ].join(' ')
);

// ─── Divider ───────────────────────────────────────────────────────────────
export const navDividerVariants = cva(
  'h-px bg-white/10 my-2'
);

// ─── Type exports ──────────────────────────────────────────────────────────
export type NavVariantProp = NonNullable<
  Parameters<typeof navContainerVariants>[0]
>['variant'];

export type NavItemStateProp = NonNullable<
  Parameters<typeof navLinkVariants>[0]
>['state'];