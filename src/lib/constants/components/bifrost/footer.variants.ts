// src/lib/constants/components/bifrost/footer.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FOOTER VARIANTS                                        ║
// ║                    CVA variant definitions for Footer                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';

export const footerVariants = cva(
  [
    'w-full',
    'mt-auto',
    'border-t',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-deep-space/40 backdrop-blur-lg border-white/5',
        solid: 'bg-deep-space border-white/10',
        transparent: 'bg-transparent border-transparent',
        sanctuary: 'bg-deep-space/60 backdrop-blur-xl border-sanctuary-green/20',
        cosmic: 'bg-deep-space/50 backdrop-blur-lg border-cosmic-blue/20',
      },
      size: {
        sm: 'py-4',
        md: 'py-8',
        lg: 'py-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type FooterVariant = NonNullable<
  Parameters<typeof footerVariants>[0]
>['variant'];

export type FooterSize = NonNullable<
  Parameters<typeof footerVariants>[0]
>['size'];