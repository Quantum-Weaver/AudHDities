// lib/constants/components/ui/forms.ts
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { DURATIONS } from '@/lib/constants/cosmic/motion';

export const FORM_CONFIG = {
  // Input Variants
  VARIANTS: {
    default: 'default',
    quantum: 'quantum',
    cosmic: 'cosmic',
    minimal: 'minimal'
  },
  
  // Input Sizes
  SIZES: {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  },
  
  // Validation States
  STATES: {
    default: QUANTUM_COLORS.starDust,
    valid: QUANTUM_COLORS.success,
    error: QUANTUM_COLORS.error,
    warning: QUANTUM_COLORS.warning
  },
  
  // Animation Config
  ANIMATION: {
    focus: DURATIONS.fast,
    validation: DURATIONS.normal,
    transition: DURATIONS.fast
  }
} as const;
