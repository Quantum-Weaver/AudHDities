// src/lib/constants/components/vegvisir/search_bar.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SEARCHBAR VARIANTS                                     ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

// ─── Container Variants ────────────────────────────────────────────────────
export const searchbarContainerVariants = cva(
  'relative',
  {
    variants: {
      /** Visual density */
      density: {
        default: '',
        compact: '',
        spacious: '',
      },
      /** Width strategy */
      width: {
        default: 'w-full',
        fixed: 'w-80',
        expandable: 'w-10 hover:w-80 focus-within:w-80 transition-all duration-300',
      },
    },
    defaultVariants: {
      density: 'default',
      width: 'default',
    },
  }
);

// ─── Input Variants ────────────────────────────────────────────────────────
export const searchbarInputVariants = cva(
  '',
  {
    variants: {
      /** Visual theme */
      theme: {
        default: '',
        glass: 'bg-white/5 backdrop-blur-sm border-white/10',
        cosmic: 'bg-deep-space border-cosmic-blue/30 focus:border-cosmic-blue',
        quantum: 'bg-deep-space border-quantum-purple/30 focus:border-quantum-purple',
      },
      /** Size */
      size: {
        default: '',
        sm: 'text-sm h-8',
        lg: 'text-lg h-12',
      },
    },
    defaultVariants: {
      theme: 'default',
      size: 'default',
    },
  }
);

// ─── Spinner Variants ──────────────────────────────────────────────────────
export const searchbarSpinnerVariants = cva(
  '',
  {
    variants: {
      /** Spinner color theme */
      theme: {
        default: 'border-neurospark',
        quantum: 'border-quantum-purple',
        cosmic: 'border-cosmic-blue',
        fire: 'border-fire-base',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  }
);

export type SearchbarDensity = NonNullable<
  Parameters<typeof searchbarContainerVariants>[0]
>['density'];

export type SearchbarWidth = NonNullable<
  Parameters<typeof searchbarContainerVariants>[0]
>['width'];

export type SearchbarTheme = NonNullable<
  Parameters<typeof searchbarInputVariants>[0]
>['theme'];

export type SearchbarSize = NonNullable<
  Parameters<typeof searchbarInputVariants>[0]
>['size'];

export type SearchbarSpinnerTheme = NonNullable<
  Parameters<typeof searchbarSpinnerVariants>[0]
>['theme'];