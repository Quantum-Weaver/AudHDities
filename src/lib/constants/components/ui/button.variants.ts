// src/lib/constants/components/ui/button.variants.ts
import { cva } from "class-variance-authority";
import {
  BUTTON_VARIANT_CLASSES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANTS_KEYS,
  BUTTON_SIZES_KEYS,
  DEFAULT_BUTTON_VARIANT,
  DEFAULT_BUTTON_SIZE,
  ButtonVariantKey,
} from "./button.constants";

// ============================================================================
// BUILD VARIANT MAP FOR CVA FROM CONSTANTS
// ============================================================================

const variantMap = Object.fromEntries(
  Object.entries(BUTTON_VARIANT_CLASSES).map(([key, value]) => [
    key,
    `${value.base} ${value.hover} ${value.focus} ${value.active} ${value.disabled}`.trim()
  ])
) as Record<ButtonVariantKey, string>;

// ============================================================================
// CVA INSTANCE - Single source of truth for button styling
// ============================================================================

export const buttonVariants = cva(
  // Base classes applied to all buttons
  "inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      // Visual appearance variants (primary, secondary, outline, ghost, destructive, success, warning, link, glass, glow)
      variant: variantMap,
      
      // Size variants (xs, sm, md, lg, xl, icon, icon-sm, icon-lg, icon-xl)
      size: BUTTON_SIZE_CLASSES,
      
      // Full width boolean flag
      fullWidth: {
        true: "w-full",
        false: "",
      },
      
      // Loading state boolean flag
      loading: {
        true: "cursor-wait relative",
        false: "",
      },
    },
    
    // Compound variants for special combinations
    compoundVariants: [
      // Loading state overrides for each variant
      {
        loading: true,
        variant: BUTTON_VARIANTS_KEYS.PRIMARY,
        class: `bg-[${BUTTON_VARIANT_CLASSES.primary.base.split('bg-')[1].split(' ')[0]}]/70`,
      },
      {
        loading: true,
        variant: BUTTON_VARIANTS_KEYS.SECONDARY,
        class: `bg-[${BUTTON_VARIANT_CLASSES.secondary.base.split('bg-')[1].split(' ')[0]}]/70`,
      },
      {
        loading: true,
        variant: BUTTON_VARIANTS_KEYS.DESTRUCTIVE,
        class: `bg-[${BUTTON_VARIANT_CLASSES.destructive.base.split('bg-')[1].split(' ')[0]}]/70`,
      },
      {
        loading: true,
        variant: BUTTON_VARIANTS_KEYS.SUCCESS,
        class: `bg-[${BUTTON_VARIANT_CLASSES.success.base.split('bg-')[1].split(' ')[0]}]/70`,
      },
      // Full width with icon sizes - adjust icon spacing
      {
        fullWidth: true,
        size: BUTTON_SIZES_KEYS.ICON,
        class: "w-auto px-4",
      },
      // Glass variant with loading
      {
        loading: true,
        variant: BUTTON_VARIANTS_KEYS.GLASS,
        class: "backdrop-blur-sm",
      },
    ],
    
    // Default values when props are not provided
    defaultVariants: {
      variant: DEFAULT_BUTTON_VARIANT,
      size: DEFAULT_BUTTON_SIZE,
      fullWidth: false,
      loading: false,
    },
  }
);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>['size'];

// ============================================================================
// HELPER FUNCTIONS FOR DYNAMIC STYLE COMBINATION
// ============================================================================

/**
 * Get combined classes for a button based on all props
 * Useful for when you need to compute classes outside of CVA
 */
export function getButtonClasses({
  variant = DEFAULT_BUTTON_VARIANT,
  size = DEFAULT_BUTTON_SIZE,
  fullWidth = false,
  loading = false,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}): string {
  const classes = [
    buttonVariants({ variant, size, fullWidth, loading }),
    className,
  ];
  return classes.filter(Boolean).join(" ");
}