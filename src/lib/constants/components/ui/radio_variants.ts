// src/lib/constants/components/ui/radio_variants.ts
import { cva } from "class-variance-authority";

export const radioVariants = cva(
  "appearance-none rounded-full transition-all duration-200 checked:bg-quantum-purple checked:border-quantum-purple focus-visible:ring-2 focus-visible:ring-quantum-purple/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "w-4 h-4 border border-white/20 bg-transparent checked:ring-2 checked:ring-quantum-purple/20",
        card: "w-full p-4 rounded-lg border-2 border-white/10 bg-transparent checked:border-quantum-purple checked:bg-quantum-purple/10",
        button: "px-4 py-2 rounded-lg border border-white/10 bg-transparent checked:bg-quantum-purple checked:text-white",
      },
      size: {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type RadioVariant = NonNullable<Parameters<typeof radioVariants>[0]>['variant'];
export type RadioSize = NonNullable<Parameters<typeof radioVariants>[0]>['size'];