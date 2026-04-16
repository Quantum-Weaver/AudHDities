// src/lib/constants/components/ui/modal_variants.ts
import { cva } from "class-variance-authority";

export const modalOverlayVariants = cva(
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        drawer: "",
        sheet: "",
        fullscreen: "",
        alert: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const modalContentVariants = cva(
  "fixed z-50 bg-surface rounded-lg shadow-xl transition-all duration-200",
  {
    variants: {
      variant: {
        default: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md",
        drawer: "top-0 right-0 h-full w-80",
        sheet: "bottom-0 left-0 right-0 w-full rounded-t-xl",
        fullscreen: "inset-0 w-full h-full rounded-none",
        alert: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ModalVariant = NonNullable<Parameters<typeof modalContentVariants>[0]>['variant'];
export type ModalSize = NonNullable<Parameters<typeof modalContentVariants>[0]>['size'];