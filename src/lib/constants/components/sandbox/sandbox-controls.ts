// @/lib/constants/components/sandbox/sandbox-controls.ts
// ============================================================================
// SANDBOX CONTROLS CONSTANTS - QUANTUM TESTING INTERFACE
// ============================================================================

import { 
  QUANTUM_COLORS,
  QUANTUM_GRADIENTS,
  SPACING_SCALE,
  BORDER_RADII,
  CONTAINER_DIMENSIONS,
  FONT_FAMILIES,
  TEXT_SIZES,
  FONT_WEIGHT_CLASSES,
  ENTITY_TYPOGRAPHY,
  GLOW_EFFECTS,
  SHADOWS,
  BACKDROP_EFFECTS,
  HOLOGRAPHIC_EFFECTS,
  PRESET_ANIMATIONS,
  ANIMATION_CONFIGS
} from '@/lib/constants/cosmic';

import { SANDBOX_CONTROLS_VARIANTS } from '../ui/variants';

// ============================================================================
// CONTROL TYPES & STATES
// ============================================================================

export const CONTROL_TYPES = {
  SLIDER: 'consciousness_slider',
  TOGGLE: 'quantum_toggle', 
  SELECT: 'sovereign_select',
  COLOR_PICKER: 'collaborative_color_picker',
  TEXT_INPUT: 'evolutionary_text_input',
  NUMBER_INPUT: 'transformative_number_input'
} as const;

export const CONTROL_STATES = {
  IDLE: 'idle',
  HOVER: 'hover',
  FOCUS: 'focus',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  VALID: 'valid',
  INVALID: 'invalid'
} as const;

export const VALIDATION_TYPES = {
  QUANTUM_INFO: 'quantum_info',
  SOVEREIGN_WARNING: 'sovereign_warning', 
  COLLABORATIVE_ERROR: 'collaborative_error'
} as const;

// ============================================================================
// CONTROL DIMENSIONS & LAYOUT
// ============================================================================

export const CONTROL_DIMENSIONS = {
  // Slider dimensions
  SLIDER: {
    TRACK_HEIGHT: '4px',
    THUMB_SIZE: '20px',
    PADDING: SPACING_SCALE['3'],
    GAP: SPACING_SCALE['2']
  },
  
  // Toggle dimensions  
  TOGGLE: {
    TRACK_WIDTH: '44px',
    TRACK_HEIGHT: '24px',
    THUMB_SIZE: '20px',
    PADDING: SPACING_SCALE['2'],
    GAP: SPACING_SCALE['2']
  },
  
  // Select dimensions
  SELECT: {
    PADDING: SPACING_SCALE['3'],
    DROPDOWN_MAX_HEIGHT: '200px',
    INDICATOR_SIZE: '16px',
    GAP: SPACING_SCALE['2']
  },
  
  // Color picker dimensions
  COLOR_PICKER: {
    PALETTE_SIZE: '32px',
    PREVIEW_SIZE: '48px',
    PADDING: SPACING_SCALE['4'],
    GAP: SPACING_SCALE['3']
  },
  
  // Text input dimensions
  TEXT_INPUT: {
    PADDING: SPACING_SCALE['3'],
    GAP: SPACING_SCALE['2'],
    INPUT_PADDING: SPACING_SCALE['3']
  },
  
  // Number input dimensions
  NUMBER_INPUT: {
    PADDING: SPACING_SCALE['2'],
    GAP: SPACING_SCALE['1'],
    STEPPER_SIZE: '24px'
  }
} as const;

// ============================================================================
// CONTROL RANGES & LIMITS
// ============================================================================

export const CONTROL_RANGES = {
  // Consciousness slider range
  CONSCIOUSNESS: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNIT: '%',
    DEFAULT: 50
  },
  
  // Number input ranges
  NUMBER: {
    MIN: -Infinity,
    MAX: Infinity,
    STEP: 1,
    UNIT: '',
    DEFAULT: 0
  },
  
  // Generic percentage range
  PERCENTAGE: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNIT: '%',
    DEFAULT: 0
  },
  
  // Opacity range
  OPACITY: {
    MIN: 0,
    MAX: 1,
    STEP: 0.01,
    UNIT: '',
    DEFAULT: 1
  }
} as const;

// ============================================================================
// CONTROL VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
  // Consciousness level validation
  CONSCIOUSNESS_LEVEL: {
    MIN: 0,
    MAX: 100,
    REQUIRED: true,
    MESSAGE: 'Consciousness level must be between 0 and 100'
  },
  
  // Quantum toggle validation
  QUANTUM_TOGGLE: {
    REQUIRED: false,
    STATES: ['on', 'off'] as const
  },
  
  // Color validation
  COLOR_VALUE: {
    PATTERN: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    MESSAGE: 'Must be a valid hex color code'
  },
  
  // Text input validation
  EVOLUTIONARY_TEXT: {
    MIN_LENGTH: 0,
    MAX_LENGTH: 500,
    PATTERN: /^[\w\s\-\.,!?']*$/,
    MESSAGE: 'Text contains invalid characters'
  },
  
  // Number validation
  TRANSFORMATIVE_NUMBER: {
    MIN: -10000,
    MAX: 10000,
    STEP: 1,
    MESSAGE: 'Number must be between -10,000 and 10,000'
  }
} as const;

// ============================================================================
// CONTROL ANIMATION CONFIGS
// ============================================================================

export const CONTROL_ANIMATIONS = {
  // Slider animations
  SLIDER: {
    THUMB_DRAG: PRESET_ANIMATIONS.singleStreamFocus,
    TRACK_FILL: {
      duration: 300,
      easing: 'ease-out'
    }
  },
  
  // Toggle animations
  TOGGLE: {
    SWITCH: PRESET_ANIMATIONS.quantumPulse,
    GLOW: {
      duration: 200,
      easing: 'ease-in-out'
    }
  },
  
  // Select animations
  SELECT: {
    DROPDOWN: ANIMATION_CONFIGS.sovereignPresence,
    OPTION: {
      duration: 150,
      easing: 'ease-out',
      stagger: 50
    }
  },
  
  // Color picker animations
  COLOR_PICKER: {
    PALETTE: PRESET_ANIMATIONS.quantumPulse,
    PREVIEW: {
      duration: 400,
      easing: 'ease-in-out'
    }
  },
  
  // Text input animations
  TEXT_INPUT: {
    FOCUS: PRESET_ANIMATIONS.quantumPulse,
    VALIDATION: {
      duration: 500,
      easing: 'ease-out'
    }
  },
  
  // Number input animations
  NUMBER_INPUT: {
    STEP: ANIMATION_CONFIGS.holographicScan,
    SPIN: {
      duration: 200,
      easing: 'ease-in-out'
    }
  }
} as const;

// ============================================================================
// CONTROL EFFECTS CONFIGS
// ============================================================================

export const CONTROL_EFFECTS = {
  // Slider effects
  SLIDER: {
    GLOW: GLOW_EFFECTS.quantum,
    SHADOW: SHADOWS.sm,
    BACKDROP: BACKDROP_EFFECTS.glass,
    HOLOGRAPHIC: HOLOGRAPHIC_EFFECTS.cornerAccent
  },
  
  // Toggle effects
  TOGGLE: {
    GLOW: GLOW_EFFECTS.cosmic,
    SHADOW: SHADOWS.md,
    BACKDROP: BACKDROP_EFFECTS.glass,
    HOLOGRAPHIC: HOLOGRAPHIC_EFFECTS.particles
  },
  
  // Select effects
  SELECT: {
    GLOW: GLOW_EFFECTS.fire,
    SHADOW: SHADOWS.lg,
    BACKDROP: BACKDROP_EFFECTS['glass-heavy'],
    HOLOGRAPHIC: HOLOGRAPHIC_EFFECTS.scanLines
  },
  
  // Color picker effects
  COLOR_PICKER: {
    GLOW: GLOW_EFFECTS.pride,
    SHADOW: SHADOWS.xl,
    BACKDROP: BACKDROP_EFFECTS.glass,
    HOLOGRAPHIC: HOLOGRAPHIC_EFFECTS.rainbow
  },
  
  // Text input effects
  TEXT_INPUT: {
    GLOW: GLOW_EFFECTS.cosmic,
    SHADOW: SHADOWS.sm,
    BACKDROP: BACKDROP_EFFECTS.glass,
    HOLOGRAPHIC: HOLOGRAPHIC_EFFECTS.cornerAccent
  },
  
  // Number input effects
  NUMBER_INPUT: {
    GLOW: GLOW_EFFECTS['voidDomain'],
    SHADOW: SHADOWS.inner,
    BACKDROP: BACKDROP_EFFECTS['glass-heavy'],
    HOLOGRAPHIC: HOLOGRAPHIC_EFFECTS.glitch
  }
} as const;

// ============================================================================
// MASTER EXPORTS
// ============================================================================

export const SANDBOX_CONTROLS = {
  TYPES: CONTROL_TYPES,
  STATES: CONTROL_STATES,
  DIMENSIONS: CONTROL_DIMENSIONS,
  RANGES: CONTROL_RANGES,
  VALIDATION: {
    TYPES: VALIDATION_TYPES,
    RULES: VALIDATION_RULES
  },
  ANIMATIONS: CONTROL_ANIMATIONS,
  EFFECTS: CONTROL_EFFECTS,
  VARIANTS: SANDBOX_CONTROLS_VARIANTS
} as const;