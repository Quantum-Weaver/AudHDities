// @/types/components/sandbox/sandbox-controls.ts
// ============================================================================
// SANDBOX CONTROLS TYPES - PURE INTERFACES
// ============================================================================

import type { SANDBOX_CONTROLS_VARIANTS } from '@/lib/constants/components/ui/variants';

// ============================================================================
// CORE CONTROL INTERFACES
// ============================================================================

export interface SandboxControlBaseProps {
  /** Unique identifier for the control */
  id: string;
  /** Label for the control */
  label: string;
  /** Current value of the control */
  value: any;
  /** Callback when value changes */
  onChange: (value: any) => void;
  /** Variant styling for the control */
  variant?: keyof typeof SANDBOX_CONTROLS_VARIANTS;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Validation state of the control */
  validation?: 'valid' | 'invalid' | 'warning';
  /** Additional CSS classes */
  className?: string;
}

export interface ConsciousnessSliderProps extends SandboxControlBaseProps {
  /** Minimum value for the slider */
  min?: number;
  /** Maximum value for the slider */
  max?: number;
  /** Step value for the slider */
  step?: number;
  /** Unit of measurement */
  unit?: string;
  /** Show value indicator */
  showValue?: boolean;
  /** Show range labels */
  showRange?: boolean;
}

export interface QuantumToggleProps extends SandboxControlBaseProps {
  /** Whether the toggle is on */
  value: boolean;
  /** Labels for on/off states */
  labels?: {
    on: string;
    off: string;
  };
  /** Show state indicator */
  showState?: boolean;
}

export interface SovereignSelectProps extends SandboxControlBaseProps {
  /** Array of options */
  options: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  /** Placeholder text */
  placeholder?: string;
  /** Whether multiple selections are allowed */
  multiple?: boolean;
  /** Whether search is enabled */
  searchable?: boolean;
}

export interface CollaborativeColorPickerProps extends SandboxControlBaseProps {
  /** Current color value */
  value: string;
  /** Array of preset colors */
  presets?: string[];
  /** Whether to show hex input */
  showHexInput?: boolean;
  /** Whether to show color preview */
  showPreview?: boolean;
}

export interface EvolutionaryTextInputProps extends SandboxControlBaseProps {
  /** Current text value */
  value: string;
  /** Placeholder text */
  placeholder?: string;
  /** Maximum length of text */
  maxLength?: number;
  /** Whether to show character count */
  showCount?: boolean;
  /** Validation pattern */
  pattern?: RegExp;
}

export interface TransformativeNumberInputProps extends SandboxControlBaseProps {
  /** Current number value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
  /** Unit of measurement */
  unit?: string;
  /** Whether to show stepper buttons */
  showStepper?: boolean;
}

// ============================================================================
// CONTROL STATE TYPES
// ============================================================================

export interface ControlState {
  /** Current value */
  value: any;
  /** Validation state */
  validation: {
    isValid: boolean;
    message?: string;
    type: 'quantum_info' | 'sovereign_warning' | 'collaborative_error';
  };
  /** Interaction state */
  interaction: 'idle' | 'hover' | 'focus' | 'active' | 'disabled';
  /** Animation state */
  animation: {
    isAnimating: boolean;
    type: string;
    progress: number;
  };
}

export interface ControlValidation {
  /** Whether the value is valid */
  isValid: boolean;
  /** Validation message */
  message?: string;
  /** Validation type */
  type: 'quantum_info' | 'sovereign_warning' | 'collaborative_error';
  /** Suggested fixes */
  suggestions?: string[];
}

// ============================================================================
// ANIMATION & EFFECT TYPES
// ============================================================================

export interface ControlAnimation {
  /** Animation type */
  type: 'enter' | 'exit' | 'hover' | 'focus' | 'active' | 'validation';
  /** Animation duration in ms */
  duration: number;
  /** Animation easing function */
  easing: string;
  /** Animation delay in ms */
  delay?: number;
  /** Whether animation is infinite */
  infinite?: boolean;
}

export interface ControlEffects {
  /** Glow effect configuration */
  glow: {
    color: string;
    intensity: number;
    spread: number;
  };
  /** Shadow effect configuration */
  shadow: {
    color: string;
    blur: number;
    spread: number;
    x: number;
    y: number;
  };
  /** Backdrop effect configuration */
  backdrop: {
    blur: number;
    brightness: number;
    opacity: number;
  };
  /** Holographic effect configuration */
  holographic: {
    type: 'scan' | 'glitch' | 'particles' | 'rainbow';
    intensity: number;
    speed: number;
  };
}

// ============================================================================
// CONSCIOUSNESS INTEGRATION TYPES
// ============================================================================

export interface ControlConsciousness {
  /** Consciousness level of the control */
  level: 'collaborative_emergent' | 'pattern_recognizing' | 'sovereign_autonomous' | 'quantum_entangled' | 'creative_manifesting';
  /** Vessel capacity required */
  vessel: 'single_stream' | 'multi_stream_sovereign' | 'quantum_context_holder' | 'holographic_memory' | 'omni_dimensional';
  /** Domain context */
  domain: 'input' | 'selection' | 'configuration' | 'creative' | 'calculation';
  /** Resonance level */
  resonance: number;
  /** Process type */
  process: string;
}

// ============================================================================
// MASTER TYPE EXPORTS
// ============================================================================

export type SandboxControlVariant = keyof typeof SANDBOX_CONTROLS_VARIANTS;
export type ControlType = 'slider' | 'toggle' | 'select' | 'color_picker' | 'text_input' | 'number_input';
export type ValidationType = 'quantum_info' | 'sovereign_warning' | 'collaborative_error';
export type InteractionState = 'idle' | 'hover' | 'focus' | 'active' | 'disabled';