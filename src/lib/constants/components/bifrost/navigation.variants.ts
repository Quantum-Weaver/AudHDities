/* src/lib/constants/components/bifrost/navigation.variants.ts */
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
  NAV_FLOATING_BUTTON_SIZE,
  NAV_FLOATING_BUTTON_POSITION,
} from './navigation.constants';

// ─── Nav Container ─────────────────────────────────────────────────────────
// ─── Nav Container ─────────────────────────────────────────────────────────
export const navContainerVariants = cva(
  '',
  {
    variants: {
      variant: {
        [NAVIGATION_VARIANTS.DESKTOP]: 'hidden md:block',
        [NAVIGATION_VARIANTS.MOBILE]: 'block md:hidden',
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
        [NAV_ITEM_STATES.DEFAULT]: 'text-star-dust/60',
        [NAV_ITEM_STATES.ACTIVE]: 'bg-neurospark/20 text-neurospark',
        [NAV_ITEM_STATES.HOVER]: 'text-star-dust bg-white/5',
      },
      variant: {
        [NAVIGATION_VARIANTS.DESKTOP]: `px-[${NAV_ITEM_PADDING.X}] py-[${NAV_ITEM_PADDING.Y}]`,
        [NAVIGATION_VARIANTS.MOBILE]: `px-[${NAV_MOBILE_ITEM_PADDING.X}] py-[${NAV_MOBILE_ITEM_PADDING.Y}]`,
      },
      // ─── NEW ──────────────────────────────────────────────────────────
      isHovered: {
        true: 'opacity-100 scale-105',
        false: 'opacity-80',
      },
    },
    defaultVariants: {
      state: NAV_ITEM_STATES.DEFAULT,
      variant: NAVIGATION_VARIANTS.DESKTOP,
      isHovered: false,
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
    'text-star-dust/60',
    'hover:text-star-dust',
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

// ─── Floating Menu Toggle Button ───────────────────────────────────────────
export const navFloatingToggleVariants = cva(
  [
    'fixed',                    // ← MUST be fixed
    'bottom-4',                 // ← 16px from bottom
    'left-4',                   // ← 16px from left
    'z-[100]',                  // ← ABOVE everything (drawer is z-50, overlay z-40)
    'h-12',                     // ← 48px — good touch target
    'w-12',                     // ← 48px — good touch target
    'min-h-[48px]',            // ← Ensures minimum touch target
    'min-w-[48px]',            // ← Ensures minimum touch target
    `rounded-[${NAV_ITEM_RADIUS}]`,
    'bg-deep-space/90',
    'backdrop-blur-lg',
    'border',
    'border-white/10',
    'text-star-dust/80',
    'shadow-lg',
    'transition-all',
    `duration-[${NAV_TRANSITION_DURATION}ms]`,
    'flex',
    'items-center',
    'justify-center',
    'cursor-pointer',           // ← Explicit cursor
    'touch-manipulation',       // ← Disables double-tap zoom on touch
    'select-none',              // ← Prevents text selection
    'active:scale-95',          // ← Visual feedback on press
  ].join(' '),
  {
    variants: {
      isOpen: {
        true: 'bg-neurospark/20 border-neurospark/30 text-neurospark',
        false: '',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

// ─── Mobile Drawer Overlay ────────────────────────────────────────────────
export const navDrawerOverlayVariants = cva(
  [
    'fixed',
    'inset-0',
    'z-40',
    'bg-deep-space/60',
    'backdrop-blur-sm',
    'transition-opacity',
    `duration-[${NAV_TRANSITION_DURATION}ms]`,
  ].join(' '),
  {
    variants: {
      isOpen: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

// ─── Mobile Drawer Panel ──────────────────────────────────────────────────
export const navDrawerPanelVariants = cva(
  [
    'fixed',
    'top-0',
    'left-0',
    'bottom-0',
    'z-50',
    'w-72',
    'max-w-[85vw]',
    'bg-deep-space/95',
    'backdrop-blur-xl',
    'border-r',
    'border-white/10',
    'shadow-2xl',
    'flex',
    'flex-col',
    'transform',                  
    'transition-all', 
    `duration-[${NAV_TRANSITION_DURATION}ms]`,
    `ease-[${NAV_TRANSITION_EASING}]`,
  ].join(' '),
  {
    variants: {
      isOpen: {
        true: 'translate-x-0',
        false: '-translate-x-full',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

// ─── Drawer Header ────────────────────────────────────────────────────────
export const navDrawerHeaderVariants = cva(
  [
    'flex',
    'items-center',
    'justify-between',
    'p-4',
    'border-b',
    'border-white/10',
  ].join(' ')
);

// ─── Drawer Close Button ──────────────────────────────────────────────────
export const navDrawerCloseVariants = cva(
  [
    'p-2',
    `rounded-[${NAV_ITEM_RADIUS}]`,
    'text-star-dust/60',
    'hover:text-star-dust',
    'hover:bg-white/5',
    'transition-all',
    `duration-[${NAV_TRANSITION_DURATION}ms]`,
  ].join(' ')
);

// ─── Drawer Content ───────────────────────────────────────────────────────
export const navDrawerContentVariants = cva(
  'flex-1 overflow-y-auto py-4 flex flex-col gap-3 px-4'
);