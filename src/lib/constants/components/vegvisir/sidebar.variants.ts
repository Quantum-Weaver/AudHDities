// src/lib/constants/components/vegvisir/sidebar.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SIDEBAR VARIANTS                                       ║
// ║                    CVA variant definitions for Sidebar                    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

// ═══════════════════════════════════════════════════════════════════════════
// PANEL VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const sidebarPanelVariants = cva(
  'fixed top-0 z-40 flex h-full flex-col transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-surface/95 border-white/10',
        glass: 'bg-white/5 backdrop-blur-md border-white/10',
        minimal: 'bg-transparent border-white/5',
      },
      position: {
        left: 'left-0 border-r',
        right: 'right-0 border-l',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'left',
    },
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// NAV ITEM VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const sidebarNavItemVariants = cva(
  [
    'group',
    'flex',
    'w-full',
    'items-center',
    'rounded-md',
    'transition-all',
    'duration-200',
  ].join(' '),
  {
    variants: {
      state: {
        default: 'hover:bg-white/10',
        active: 'bg-cyan-500/20 text-cyan-400',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// BADGE VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const sidebarBadgeVariants = cva(
  [
    'ml-auto',
    'rounded-full',
    'px-1.5',
    'py-0.5',
    'text-xs',
    'font-medium',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-cyan-500/20 text-cyan-400',
        quantum: 'bg-quantum-purple/20 text-quantum-purple',
        cosmic: 'bg-cosmic-blue/20 text-cosmic-blue',
        fire: 'bg-fire-base/20 text-fire-base',
        sanctuary: 'bg-sanctuary-green/20 text-sanctuary-green',
        warning: 'bg-hearth-gold/20 text-hearth-gold',
        error: 'bg-fire-base/20 text-fire-base',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// GROUP LABEL VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const sidebarGroupLabelVariants = cva(
  [
    'mb-2',
    'px-3',
    'text-xs',
    'font-medium',
    'uppercase',
    'tracking-wider',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'text-white/40',
        light: 'text-white/60',
        accent: 'text-cyan-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type SidebarVariant = NonNullable<
  Parameters<typeof sidebarPanelVariants>[0]
>['variant'];

export type SidebarPosition = NonNullable<
  Parameters<typeof sidebarPanelVariants>[0]
>['position'];

export type SidebarNavItemState = NonNullable<
  Parameters<typeof sidebarNavItemVariants>[0]
>['state'];

export type SidebarBadgeVariant = NonNullable<
  Parameters<typeof sidebarBadgeVariants>[0]
>['variant'];

export type SidebarGroupLabelVariant = NonNullable<
  Parameters<typeof sidebarGroupLabelVariants>[0]
>['variant'];