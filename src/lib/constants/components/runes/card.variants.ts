// src/lib/constants/components/runes/card.variants.ts
import { cva } from "class-variance-authority";
import {
  CARD_VARIANT_CLASSES,
  CARD_SIZE_CLASSES,
  CARD_PADDING_CLASSES,
  CARD_RADIUS_CLASSES,
  CARD_SHADOW_CLASSES,
  CARD_TRANSITION_CLASSES,
  CARD_TYPE_HOVER_CLASSES,
  DEFAULT_CARD_VARIANT,
  DEFAULT_CARD_SIZE,
  DEFAULT_CARD_PADDING,
  DEFAULT_CARD_RADIUS,
} from "./card.constants";

/**
 * Base interactive hover effects - applies to interactive variant and interactive prop
 * Derived from quickAnimations.hoverLift in motion.ts
 */
export const interactiveHoverClass = `cursor-pointer ${CARD_TRANSITION_CLASSES.hover} hover:scale-[1.02]`;

/**
 * Type-specific hover classes for semantic card types
 * Maps each CardType to its domain-appropriate hover effect
 */
export const getTypeHoverClass = (cardType: string): string => {
  return CARD_TYPE_HOVER_CLASSES[cardType as keyof typeof CARD_TYPE_HOVER_CLASSES] || '';
};

export const cardVariants = cva(
  // Base classes applied to all cards
  `overflow-hidden ${CARD_TRANSITION_CLASSES.normal}`,
  {
    variants: {
      // Visual appearance variants (default, interactive, glass, glow, elevated, outline, ghost)
      variant: CARD_VARIANT_CLASSES,
      
      // Size variants (none, sm, md, lg, xl, 2xl, full) - includes width, height, padding
      size: CARD_SIZE_CLASSES,
      
      // Padding override (separate from size for fine-grained control)
      padding: CARD_PADDING_CLASSES,
      
      // Border radius variants (none, sm, md, lg, xl, 2xl, 3xl, full)
      radius: CARD_RADIUS_CLASSES,
      
      // Shadow elevation variants (none, sm, md, lg, xl, 2xl)
      shadow: CARD_SHADOW_CLASSES,
      
      // Interactive boolean flag - adds hover effects
      interactive: {
        true: interactiveHoverClass,
        false: "",
      },
    },
    
    // Compound variants for special combinations
    compoundVariants: [
      // Glow variant with interactive adds enhanced hover glow
      {
        variant: "glow",
        interactive: true,
        class: `hover:shadow-[var(--glow-quantum)]`,
      },
      // Glass variant with interactive adds scale without breaking backdrop
      {
        variant: "glass",
        interactive: true,
        class: `hover:backdrop-blur-lg`,
      },
      // Elevated variant with interactive adds lift effect
      {
        variant: "elevated",
        interactive: true,
        class: `hover:-translate-y-1`,
      },
      // Default variant with interactive adds border glow
      {
        variant: "default",
        interactive: true,
        class: `hover:border-[var(--color-neurospark)]/50 hover:shadow-[var(--glow-hover)]`,
      },
    ],
    
    // Default values when props are not provided
    defaultVariants: {
      variant: DEFAULT_CARD_VARIANT,
      size: DEFAULT_CARD_SIZE,
      padding: DEFAULT_CARD_PADDING,
      radius: DEFAULT_CARD_RADIUS,
      shadow: "md",
      interactive: false,
    },
  }
);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CardVariant = NonNullable<Parameters<typeof cardVariants>[0]>['variant'];
export type CardSize = NonNullable<Parameters<typeof cardVariants>[0]>['size'];
export type CardPadding = NonNullable<Parameters<typeof cardVariants>[0]>['padding'];
export type CardRadius = NonNullable<Parameters<typeof cardVariants>[0]>['radius'];
export type CardShadow = NonNullable<Parameters<typeof cardVariants>[0]>['shadow'];

// ============================================================================
// HELPER FUNCTIONS FOR DYNAMIC STYLE COMBINATION
// ============================================================================

/**
 * Get combined classes for a card based on all props
 * Useful for when you need to compute classes outside of CVA
 */
export function getCardClasses({
  variant = DEFAULT_CARD_VARIANT,
  size = DEFAULT_CARD_SIZE,
  padding,
  radius = DEFAULT_CARD_RADIUS,
  shadow = "md",
  interactive = false,
  className = "",
}: {
  variant?: CardVariant;
  size?: CardSize;
  padding?: CardPadding;
  radius?: CardRadius;
  shadow?: CardShadow;
  interactive?: boolean;
  className?: string;
}): string {
  const classes = [
    cardVariants({ variant, size, padding, radius, shadow, interactive }),
    className,
  ];
  return classes.filter(Boolean).join(" ");
}

/**
 * Get semantic hover class for a specific card type
 * Used when cards need type-specific interactive behavior
 */
export function getSemanticHoverClass(cardType: string, isInteractive: boolean): string {
  if (!isInteractive) return "";
  const typeHover = getTypeHoverClass(cardType);
  return `${interactiveHoverClass} ${typeHover}`.trim();
}