// @/types/components/ui/button.ts
// ============================================================================
// BUTTON TYPES - PURE SHAPES ONLY
// ============================================================================

import type { BUTTON_VARIANTS } from '@/lib/constants/components/ui/variants';

// Core button variant type
export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

// Button size type
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Button state type  
export type ButtonState = 'idle' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

// Button intent type
export type ButtonIntent = 'primary' | 'secondary' | 'ghost' | 'emergency';

// Main button props interface
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  intent?: ButtonIntent;
  state?: ButtonState;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
  onFocus?: (focused: boolean) => void;
  consciousness?: {
    level?: string;
    vessel?: string;
    resonance?: number;
  };
}

// Button style configuration
export interface ButtonStyleConfig {
  background: string;
  border: string;
  text: {
    color: string;
    font: readonly string[];
    size: string;
    weight: string;
  };
  dimensions: {
    height: string;
    padding: {
      x: string;
      y: string;
    };
    borderRadius: string;
  };
  animation: any; // Would import specific animation type
  shadow: string;
}

// Button state styles
export interface ButtonStateStyles {
  hover?: Partial<ButtonStyleConfig>;
  active?: Partial<ButtonStyleConfig>;
  focus?: Partial<ButtonStyleConfig>;
  disabled?: Partial<ButtonStyleConfig>;
}

// Complete button configuration
export interface ButtonConfig {
  base: ButtonStyleConfig;
  states: ButtonStateStyles;
  consciousness: {
    level: string;
    vessel: string;
    resonance: number;
  };
}