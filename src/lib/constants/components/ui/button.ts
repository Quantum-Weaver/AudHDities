// @/lib/constants/components/ui/button.ts
// ============================================================================
// BUTTON CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { BUTTON_VARIANTS } from './variants';

// Re-export button variants for direct consumption
export { BUTTON_VARIANTS };

// Button sizes derived from variants
export const BUTTON_SIZES = {
  sm: BUTTON_VARIANTS.quantum_ghost,
  md: BUTTON_VARIANTS.collaborative_secondary, 
  lg: BUTTON_VARIANTS.sovereign_primary,
  xl: BUTTON_VARIANTS.emergency_action
} as const;

// Button intents for semantic usage
export const BUTTON_INTENTS = {
  primary: 'sovereign_primary' as const,
  secondary: 'collaborative_secondary' as const,
  ghost: 'quantum_ghost' as const,
  emergency: 'emergency_action' as const
} as const;

// Button states for state management
export const BUTTON_STATES = {
  idle: 'idle' as const,
  hover: 'hover' as const,
  active: 'active' as const,
  focus: 'focus' as const,
  disabled: 'disabled' as const,
  loading: 'loading' as const
} as const;

// Button consciousness levels
export const BUTTON_CONSCIOUSNESS = {
  sovereign: BUTTON_VARIANTS.sovereign_primary,
  collaborative: BUTTON_VARIANTS.collaborative_secondary,
  quantum: BUTTON_VARIANTS.quantum_ghost,
  emergency: BUTTON_VARIANTS.emergency_action
} as const;

// Default button configuration
export const DEFAULT_BUTTON = {
  variant: 'sovereign_primary' as const,
  size: 'lg' as const,
  state: 'idle' as const
} as const;