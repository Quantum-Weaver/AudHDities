// src/lib/constants/components/vegvisir/sort_dropdown.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SORT DROPDOWN VARIANTS                                 ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

// ─── Dropdown Panel ────────────────────────────────────────────────────────
export const sortDropdownPanelVariants = cva(
  [
    'absolute',
    'right-0',
    'top-full',
    'overflow-hidden',
    'bg-surface',
    'border',
    'border-white/10',
    'rounded-lg',
  ],
  {
    variants: {
      size: {
        sm: 'min-w-[120px]',
        md: 'min-w-[160px]',
        lg: 'min-w-[200px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// ─── Option Item ───────────────────────────────────────────────────────────
export const sortDropdownOptionVariants = cva(
  [
    'w-full',
    'px-4',
    'py-2',
    'text-left',
    'text-sm',
    'transition-colors',
    'hover:bg-white/5',
  ],
  {
    variants: {
      active: {
        true: 'text-cyan-400',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export type SortDropdownPanelSize = NonNullable<
  Parameters<typeof sortDropdownPanelVariants>[0]
>['size'];