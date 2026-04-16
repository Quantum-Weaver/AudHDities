// src/lib/constants/components/ui/checkbox_variants.ts
import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  "appearance-none transition-all duration-200 checked:bg-quantum-purple checked:border-quantum-purple focus-visible:ring-2 focus-visible:ring-quantum-purple/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "w-4 h-4 rounded border border-white/20 bg-transparent checked:bg-quantum-purple",
        rounded: "w-4 h-4 rounded-full border border-white/20 bg-transparent checked:bg-quantum-purple",
        card: "w-full p-4 rounded-lg border-2 border-white/10 bg-transparent checked:border-quantum-purple checked:bg-quantum-purple/10",
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

export type CheckboxVariant = NonNullable<Parameters<typeof checkboxVariants>[0]>['variant'];
export type CheckboxSize = NonNullable<Parameters<typeof checkboxVariants>[0]>['size'];