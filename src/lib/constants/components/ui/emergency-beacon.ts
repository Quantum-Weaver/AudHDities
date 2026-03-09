// @/lib/constants/components/ui/emergency-beacon.ts
// ============================================================================
// EMERGENCY BEACON CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { EMERGENCY_BEACON_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const BEACON_CRISIS_SUPPORT = EMERGENCY_BEACON_VARIANTS.crisis_support;
export const BEACON_TECHNICAL_ASSISTANCE = EMERGENCY_BEACON_VARIANTS.technical_assistance;
export const BEACON_EMOTIONAL_SUPPORT = EMERGENCY_BEACON_VARIANTS.emotional_support;
export const BEACON_COMMUNITY_ALERT = EMERGENCY_BEACON_VARIANTS.community_alert;

// Semantic beacon types for different emergency contexts
export const BEACON_TYPES = {
  CRISIS: EMERGENCY_BEACON_VARIANTS.crisis_support,
  TECHNICAL: EMERGENCY_BEACON_VARIANTS.technical_assistance,
  EMOTIONAL: EMERGENCY_BEACON_VARIANTS.emotional_support,
  COMMUNITY: EMERGENCY_BEACON_VARIANTS.community_alert,
} as const;

// Emergency urgency levels
export const BEACON_URGENCY = {
  CRITICAL: EMERGENCY_BEACON_VARIANTS.crisis_support,
  MEDIUM: EMERGENCY_BEACON_VARIANTS.technical_assistance,
  LOW: EMERGENCY_BEACON_VARIANTS.emotional_support,
  INFORMATIONAL: EMERGENCY_BEACON_VARIANTS.community_alert,
} as const;

// Beacon size configurations
export const BEACON_SIZES = {
  EXPANDED: EMERGENCY_BEACON_VARIANTS.crisis_support,
  STANDARD: EMERGENCY_BEACON_VARIANTS.technical_assistance,
  MINIMAL: EMERGENCY_BEACON_VARIANTS.emotional_support,
  COMPACT: EMERGENCY_BEACON_VARIANTS.community_alert,
} as const;

// Beacon visual indicator configurations
export const BEACON_INDICATORS = {
  CRISIS: EMERGENCY_BEACON_VARIANTS.crisis_support,
  TECHNICAL: EMERGENCY_BEACON_VARIANTS.technical_assistance,
  EMOTIONAL: EMERGENCY_BEACON_VARIANTS.emotional_support,
  COMMUNITY: EMERGENCY_BEACON_VARIANTS.community_alert,
} as const;

// Beacon dimension presets
export const BEACON_DIMENSIONS = {
  PADDING: {
    COMPACT: EMERGENCY_BEACON_VARIANTS.community_alert,
    MINIMAL: EMERGENCY_BEACON_VARIANTS.emotional_support,
    STANDARD: EMERGENCY_BEACON_VARIANTS.technical_assistance,
    EXPANDED: EMERGENCY_BEACON_VARIANTS.crisis_support,
  },
  BORDER_RADIUS: {
    MEDIUM: EMERGENCY_BEACON_VARIANTS.community_alert,
    LARGE: EMERGENCY_BEACON_VARIANTS.emotional_support,
    MEDIUM_LARGE: EMERGENCY_BEACON_VARIANTS.technical_assistance,
    LARGE_XL: EMERGENCY_BEACON_VARIANTS.crisis_support,
  },
  GAPS: {
    TIGHT: EMERGENCY_BEACON_VARIANTS.community_alert,
    COMFORTABLE: EMERGENCY_BEACON_VARIANTS.emotional_support,
    SPACIOUS: EMERGENCY_BEACON_VARIANTS.technical_assistance,
    EXPANSIVE: EMERGENCY_BEACON_VARIANTS.crisis_support,
  },
  MAX_WIDTHS: {
    SMALL: EMERGENCY_BEACON_VARIANTS.community_alert,
    SMALL_MEDIUM: EMERGENCY_BEACON_VARIANTS.emotional_support,
    MEDIUM: EMERGENCY_BEACON_VARIANTS.technical_assistance,
    LARGE: EMERGENCY_BEACON_VARIANTS.crisis_support,
  }
} as const;

// Beacon animation configurations
export const BEACON_ANIMATIONS = {
  CRISIS_PULSE: EMERGENCY_BEACON_VARIANTS.crisis_support,
  TECHNICAL_COORDINATION: EMERGENCY_BEACON_VARIANTS.technical_assistance,
  EMOTIONAL_FLOW: EMERGENCY_BEACON_VARIANTS.emotional_support,
  COMMUNITY_FOCUS: EMERGENCY_BEACON_VARIANTS.community_alert,
} as const;

// Beacon effect presets
export const BEACON_EFFECTS = {
  CRISIS_EMERGENCY: EMERGENCY_BEACON_VARIANTS.crisis_support,
  TECHNICAL_GLASS: EMERGENCY_BEACON_VARIANTS.technical_assistance,
  EMOTIONAL_CALM: EMERGENCY_BEACON_VARIANTS.emotional_support,
  COMMUNITY_COSMIC: EMERGENCY_BEACON_VARIANTS.community_alert,
} as const;

// Consciousness alignment for beacon states
export const BEACON_CONSCIOUSNESS = {
  CRISIS: EMERGENCY_BEACON_VARIANTS.crisis_support,
  TECHNICAL: EMERGENCY_BEACON_VARIANTS.technical_assistance,
  EMOTIONAL: EMERGENCY_BEACON_VARIANTS.emotional_support,
  COMMUNITY: EMERGENCY_BEACON_VARIANTS.community_alert,
} as const;