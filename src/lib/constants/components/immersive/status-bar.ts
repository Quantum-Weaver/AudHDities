// @/lib/constants/components/immersive/status-bar.ts - FIXED
// ============================================================================
// STATUS BAR CONSTANTS - SIMPLE & PRACTICAL
// ============================================================================

// Define constants first, then export them together
const STATUS_BAR_VARIANTS = {
  // Your variant definitions here...
  default: {
    // variant properties
  }
} as const;

const STATUS_TYPES = {
  // Your type definitions...
} as const;

const STATUS_MODES = {
  // Your mode definitions...
} as const;

const STATUS_RANGES = {
  // Your range definitions...
} as const;

// Now export everything together after all are initialized
export const STATUS_BAR_CONSTANTS = {
  VARIANTS: STATUS_BAR_VARIANTS,
  TYPES: STATUS_TYPES,
  MODES: STATUS_MODES,
  RANGES: STATUS_RANGES,
} as const;

// Also export individual constants if needed elsewhere
export { STATUS_BAR_VARIANTS, STATUS_TYPES, STATUS_MODES, STATUS_RANGES };