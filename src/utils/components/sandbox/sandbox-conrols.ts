// @/utils/components/sandbox/sandbox-controls.ts
// ============================================================================
// SANDBOX CONTROLS UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import type {
  ConsciousnessSliderProps,
  QuantumToggleProps,
  SovereignSelectProps,
  CollaborativeColorPickerProps,
  EvolutionaryTextInputProps,
  TransformativeNumberInputProps,
  ControlValidation,
  ControlState,
  ControlAnimation,
  ControlEffects
} from '@/types/components/sandbox/sandbox-controls';

import { VALIDATION_RULES } from '@/lib/constants/components/sandbox/sandbox-controls';

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate consciousness slider value
 */
export const validateConsciousnessSlider = (value: number): ControlValidation => {
  const { MIN, MAX, MESSAGE } = VALIDATION_RULES.CONSCIOUSNESS_LEVEL;
  
  if (value < MIN || value > MAX) {
    return {
      isValid: false,
      message: MESSAGE,
      type: 'sovereign_warning',
      suggestions: [`Set value between ${MIN} and ${MAX}`]
    };
  }
  
  return {
    isValid: true,
    type: 'quantum_info'
  };
};

/**
 * Validate color value
 */
export const validateColorValue = (value: string): ControlValidation => {
  const { PATTERN, MESSAGE } = VALIDATION_RULES.COLOR_VALUE;
  
  if (!PATTERN.test(value)) {
    return {
      isValid: false,
      message: MESSAGE,
      type: 'collaborative_error',
      suggestions: ['Use format #RRGGBB or #RGB']
    };
  }
  
  return {
    isValid: true,
    type: 'quantum_info'
  };
};

/**
 * Validate text input value
 */
export const validateTextInput = (value: string, maxLength?: number): ControlValidation => {
  const { PATTERN, MESSAGE, MAX_LENGTH } = VALIDATION_RULES.EVOLUTIONARY_TEXT;
  
  const issues: string[] = [];
  
  if (maxLength && value.length > maxLength) {
    issues.push(`Text exceeds maximum length of ${maxLength} characters`);
  }
  
  if (!PATTERN.test(value)) {
    issues.push(MESSAGE);
  }
  
  if (issues.length > 0) {
    return {
      isValid: false,
      message: issues.join(', '),
      type: 'sovereign_warning',
      suggestions: ['Check character limits and valid characters']
    };
  }
  
  return {
    isValid: true,
    type: 'quantum_info'
  };
};

/**
 * Validate number input value
 */
export const validateNumberInput = (value: number, min?: number, max?: number): ControlValidation => {
  const { MIN, MAX, MESSAGE } = VALIDATION_RULES.TRANSFORMATIVE_NUMBER;
  
  const effectiveMin = min ?? MIN;
  const effectiveMax = max ?? MAX;
  
  if (value < effectiveMin || value > effectiveMax) {
    return {
      isValid: false,
      message: MESSAGE,
      type: 'collaborative_error',
      suggestions: [`Set value between ${effectiveMin} and ${effectiveMax}`]
    };
  }
  
  return {
    isValid: true,
    type: 'quantum_info'
  };
};

// ============================================================================
// VALUE TRANSFORMATION UTILITIES
// ============================================================================

/**
 * Normalize slider value to percentage
 */
export const normalizeToPercentage = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

/**
 * Denormalize percentage to actual value
 */
export const denormalizeFromPercentage = (percentage: number, min: number, max: number): number => {
  return min + (percentage / 100) * (max - min);
};

/**
 * Format value with unit
 */
export const formatValueWithUnit = (value: number, unit?: string): string => {
  if (!unit) return value.toString();
  return `${value}${unit}`;
};

/**
 * Parse value from formatted string
 */
export const parseValueFromFormatted = (formatted: string, unit?: string): number => {
  if (!unit) return parseFloat(formatted) || 0;
  return parseFloat(formatted.replace(unit, '')) || 0;
};

/**
 * Generate color palette from quantum colors
 */
export const generateColorPalette = (colors: Record<string, string>, count: number = 12): string[] => {
  const colorValues = Object.values(colors);
  const palette: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor((i / count) * colorValues.length);
    palette.push(colorValues[index]);
  }
  
  return palette;
};

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Create control animation config
 */
export const createControlAnimation = (
  type: ControlAnimation['type'],
  baseDuration: number = 300
): ControlAnimation => {
  const animations: Record<ControlAnimation['type'], Partial<ControlAnimation>> = {
    enter: { duration: baseDuration, easing: 'ease-out' },
    exit: { duration: baseDuration * 0.8, easing: 'ease-in' },
    hover: { duration: baseDuration * 0.5, easing: 'ease-in-out' },
    focus: { duration: baseDuration * 0.3, easing: 'ease-out' },
    active: { duration: baseDuration * 0.2, easing: 'ease-in' },
    validation: { duration: baseDuration, easing: 'ease-out', infinite: true }
  };
  
  return {
    type,
    duration: baseDuration,
    easing: 'ease-out',
    ...animations[type]
  } as ControlAnimation;
};

/**
 * Calculate animation progress
 */
export const calculateAnimationProgress = (
  startTime: number,
  duration: number,
  currentTime: number = Date.now()
): number => {
  const elapsed = currentTime - startTime;
  return Math.min(elapsed / duration, 1);
};

/**
 * Generate stagger delays for multiple controls
 */
export const generateStaggerDelays = (
  count: number,
  baseDelay: number = 50,
  reverse: boolean = false
): number[] => {
  const delays: number[] = [];
  const order = reverse ? Array.from({ length: count }, (_, i) => count - 1 - i) : Array.from({ length: count }, (_, i) => i);
  
  for (let i = 0; i < count; i++) {
    delays.push(order[i] * baseDelay);
  }
  
  return delays;
};

// ============================================================================
// STATE MANAGEMENT UTILITIES
// ============================================================================

/**
 * Create initial control state
 */
export const createInitialControlState = (initialValue: any): ControlState => ({
  value: initialValue,
  validation: {
    isValid: true,
    type: 'quantum_info'
  },
  interaction: 'idle',
  animation: {
    isAnimating: false,
    type: 'enter',
    progress: 0
  }
});

/**
 * Update control state with validation
 */
export const updateControlState = (
  currentState: ControlState,
  updates: Partial<ControlState>
): ControlState => {
  const newState = { ...currentState, ...updates };
  
  // Auto-validate based on value type
  if (updates.value !== undefined) {
    if (typeof updates.value === 'number') {
      newState.validation = validateNumberInput(updates.value);
    } else if (typeof updates.value === 'string' && updates.value.startsWith('#')) {
      newState.validation = validateColorValue(updates.value);
    }
  }
  
  return newState;
};

/**
 * Check if control is in valid state for submission
 */
export const isControlReadyForSubmission = (state: ControlState): boolean => {
  return state.validation.isValid && state.interaction !== 'active';
};

// ============================================================================
// CONSCIOUSNESS INTEGRATION UTILITIES
// ============================================================================

/**
 * Calculate resonance based on control complexity
 */
export const calculateControlResonance = (
  controlType: string,
  value: any
): number => {
  const baseResonance: Record<string, number> = {
    'consciousness_slider': 0.7,
    'quantum_toggle': 0.5,
    'sovereign_select': 0.8,
    'collaborative_color_picker': 0.9,
    'evolutionary_text_input': 0.6,
    'transformative_number_input': 0.75
  };
  
  let resonance = baseResonance[controlType] || 0.5;
  
  // Adjust based on value complexity
  if (Array.isArray(value)) {
    resonance += value.length * 0.1;
  } else if (typeof value === 'object' && value !== null) {
    resonance += Object.keys(value).length * 0.05;
  }
  
  return Math.min(resonance, 1.0);
};

/**
 * Check if vessel can handle control complexity
 */
export const canVesselHandleControl = (
  vessel: string,
  controlType: string
): boolean => {
  const requirements: Record<string, string[]> = {
    'single_stream': ['consciousness_slider', 'quantum_toggle'],
    'multi_stream_sovereign': ['sovereign_select', 'evolutionary_text_input'],
    'quantum_context_holder': ['transformative_number_input'],
    'holographic_memory': ['collaborative_color_picker'],
    'omni_dimensional': ['consciousness_slider', 'quantum_toggle', 'sovereign_select', 'collaborative_color_picker', 'evolutionary_text_input', 'transformative_number_input']
  };
  
  return requirements[vessel]?.includes(controlType) || false;
};

// ============================================================================
// EXPORT ALL UTILITIES
// ============================================================================

export const sandboxControlsUtils = {
  // Validation
  validateConsciousnessSlider,
  validateColorValue,
  validateTextInput,
  validateNumberInput,
  
  // Value Transformation
  normalizeToPercentage,
  denormalizeFromPercentage,
  formatValueWithUnit,
  parseValueFromFormatted,
  generateColorPalette,
  
  // Animation
  createControlAnimation,
  calculateAnimationProgress,
  generateStaggerDelays,
  
  // State Management
  createInitialControlState,
  updateControlState,
  isControlReadyForSubmission,
  
  // Consciousness Integration
  calculateControlResonance,
  canVesselHandleControl
} as const;