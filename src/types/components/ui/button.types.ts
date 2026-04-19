// src/types/components/ui/button.types.ts
import type { ReactNode } from 'react';
import type { 
  ButtonVariantKey, 
  ButtonSizeKey,
  ButtonCosmicVariantKey,
} from '@/lib/constants/components/ui/button.constants';

// ============================================================================
// RE-EXPORT PRIMITIVE TYPES FROM CONSTANTS
// ============================================================================

export type ButtonVariant = ButtonVariantKey;
export type ButtonSize = ButtonSizeKey;
export type ButtonCosmicVariant = ButtonCosmicVariantKey;

// ============================================================================
// BUTTON ICON PROPS
// ============================================================================

export interface ButtonIconProps {
  /** Icon element to display */
  icon?: ReactNode;
  /** Position of the icon relative to children */
  iconPosition?: 'left' | 'right';
  /** Whether to show only the icon (hides children) */
  iconOnly?: boolean;
}

// ============================================================================
// BUTTON LOADING PROPS
// ============================================================================

export interface ButtonLoadingProps {
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Text to display while loading (overrides children) */
  loadingText?: string;
  /** Custom loading spinner element */
  loadingSpinner?: ReactNode;
}

// ============================================================================
// BUTTON GROUP PROPS
// ============================================================================

export interface ButtonGroupProps {
  /** Buttons to render inside the group */
  children: ReactNode;
  /** Orientation of the button group */
  orientation?: 'horizontal' | 'vertical';
  /** Whether buttons should be spaced evenly */
  spaced?: boolean;
  /** Whether buttons should fill the container width */
  fullWidth?: boolean;
  /** Additional className for the container */
  className?: string;
}

// ============================================================================
// MAIN BUTTON PROPS
// ============================================================================

export interface ButtonProps extends ButtonIconProps, ButtonLoadingProps {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Render as child component (polymorphic) */
  asChild?: boolean;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Additional className */
  className?: string;
  /** Button children */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
}

// ============================================================================
// ICON BUTTON PROPS (Convenience type for icon-only buttons)
// ============================================================================

export interface IconButtonProps extends Omit<ButtonProps, 'iconPosition' | 'children'> {
  /** Icon to display (required for IconButton) */
  icon: ReactNode;
  /** Accessible label for screen readers */
  'aria-label': string;
}

// ============================================================================
// COSMIC BUTTON PROPS (For consciousness-aware applications)
// ============================================================================

export interface CosmicButtonProps extends Omit<ButtonProps, 'variant'> {
  /** Cosmic variant from BUTTON_COSMIC_VARIANTS */
  cosmicVariant: ButtonCosmicVariant;
  /** User tier for consciousness adaptation */
  userTier?: 'community' | 'ally' | 'corporate' | 'council';
}