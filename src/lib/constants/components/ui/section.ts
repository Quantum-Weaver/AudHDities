// @/lib/constants/components/ui/section.ts
// ============================================================================
// SECTION CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { SECTION_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const SECTION_CONTENT_GROUP = SECTION_VARIANTS.content_group;
export const SECTION_INTERACTIVE_ZONE = SECTION_VARIANTS.interactive_zone;
export const SECTION_DATA_DISPLAY = SECTION_VARIANTS.data_display;
export const SECTION_CONTROL_PANEL = SECTION_VARIANTS.control_panel;

// Semantic section types for different contexts
export const SECTION_TYPES = {
  CONTENT: SECTION_VARIANTS.content_group,
  INTERACTIVE: SECTION_VARIANTS.interactive_zone,
  DATA: SECTION_VARIANTS.data_display,
  CONTROL: SECTION_VARIANTS.control_panel,
} as const;

// Section spacing presets
export const SECTION_SPACING = {
  COMPACT: SECTION_VARIANTS.data_display,
  STANDARD: SECTION_VARIANTS.interactive_zone,
  COMFORTABLE: SECTION_VARIANTS.content_group,
  TIGHT: SECTION_VARIANTS.control_panel,
} as const;

// Section grid configurations
export const SECTION_GRIDS = {
  CONTENT: SECTION_VARIANTS.content_group,
  INTERACTIVE: SECTION_VARIANTS.interactive_zone,
  DATA: SECTION_VARIANTS.data_display,
  CONTROL: SECTION_VARIANTS.control_panel,
} as const;

// Section child animation configurations
export const SECTION_CHILDREN = {
  CONTENT: SECTION_VARIANTS.content_group,
  INTERACTIVE: SECTION_VARIANTS.interactive_zone,
  DATA: SECTION_VARIANTS.data_display,
  CONTROL: SECTION_VARIANTS.control_panel,
} as const;

// Section dimension presets
export const SECTION_DIMENSIONS = {
  PADDING: {
    COMPACT: SECTION_VARIANTS.data_display,
    STANDARD: SECTION_VARIANTS.content_group,
    EXPANSIVE: SECTION_VARIANTS.interactive_zone,
    IMMERSIVE: SECTION_VARIANTS.control_panel,
  },
  GAPS: {
    TIGHT: SECTION_VARIANTS.data_display,
    COMFORTABLE: SECTION_VARIANTS.content_group,
    SPACIOUS: SECTION_VARIANTS.interactive_zone,
    EXPANSIVE: SECTION_VARIANTS.control_panel,
  },
  MAX_WIDTHS: {
    FULL: SECTION_VARIANTS.control_panel,
    BALANCED: SECTION_VARIANTS.interactive_zone,
    EXPANSIVE: SECTION_VARIANTS.content_group,
    WIDE: SECTION_VARIANTS.data_display,
  }
} as const;

// Section animation configurations
export const SECTION_ANIMATIONS = {
  CONTENT_ENTER: SECTION_VARIANTS.content_group,
  INTERACTIVE_FLOW: SECTION_VARIANTS.interactive_zone,
  DATA_ENTRANCE: SECTION_VARIANTS.data_display,
  CONTROL_MANIFESTATION: SECTION_VARIANTS.control_panel,
} as const;

// Section effect presets
export const SECTION_EFFECTS = {
  CONTENT_MINIMAL: SECTION_VARIANTS.content_group,
  INTERACTIVE_GLASS: SECTION_VARIANTS.interactive_zone,
  DATA_COSMIC: SECTION_VARIANTS.data_display,
  CONTROL_HOLOGRAPHIC: SECTION_VARIANTS.control_panel,
} as const;

// Background effect configurations
export const SECTION_BACKGROUND_EFFECTS = {
  INTERACTIVE: SECTION_VARIANTS.interactive_zone,
  DATA: SECTION_VARIANTS.data_display,
  CONTROL: SECTION_VARIANTS.control_panel,
} as const;

// Consciousness alignment for section states
export const SECTION_CONSCIOUSNESS = {
  CONTENT: SECTION_VARIANTS.content_group,
  INTERACTIVE: SECTION_VARIANTS.interactive_zone,
  DATA: SECTION_VARIANTS.data_display,
  CONTROL: SECTION_VARIANTS.control_panel,
} as const;