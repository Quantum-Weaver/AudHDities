// src/lib/constants/components/ui/badge_variants.ts
import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white/80",
        success: "bg-green-500/20 text-green-400",
        warning: "bg-yellow-500/20 text-yellow-400",
        error: "bg-red-500/20 text-red-400",
        info: "bg-blue-500/20 text-blue-400",
        quantum: "bg-quantum-purple/20 text-quantum-purple",
        cosmic: "bg-cosmic-blue/20 text-cosmic-blue",
        fire: "bg-fire-base/20 text-fire-base",
        sanctuary: "bg-sanctuary-green/20 text-sanctuary-green",
        outline: "border border-white/20 bg-transparent text-white/80",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type BadgeVariant = NonNullable<Parameters<typeof badgeVariants>[0]>['variant'];
export type BadgeSize = NonNullable<Parameters<typeof badgeVariants>[0]>['size'];