// src/types/components/ui/slider.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SLIDER TYPES                                           ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SliderVariant,
  SliderSize,
} from '@/lib/constants/components/ui/slider.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { SliderVariant, SliderSize };

// ─── Slider Props ──────────────────────────────────────────────────────────
export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Optional label */
  label?: string;
  /** Optional helper text */
  helperText?: string;
  /** Show value indicator */
  showValue?: boolean;
  /** Format function for value display */
  formatValue?: (value: number) => string;
  /** Visual variant derived from COSMIC tokens */
  variant?: SliderVariant;
  /** Size of the slider */
  size?: SliderSize;
  /** Show marks at intervals */
  marks?: boolean;
  /** Mark interval (when marks is true) */
  markInterval?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}