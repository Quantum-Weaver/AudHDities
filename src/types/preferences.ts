// src/types/preferences.ts
// =====================================================
// PREFERENCES TYPES - Aligned with Database Schema
// =====================================================

import type { Json } from './supabase/database.types';
import type { SensitivityLevel } from './supabase/enums.helper';

// =====================================================
// ND PREFERENCES (stored in profiles.nd_preferences)
// =====================================================

/**
 * Neurodivergent accessibility preferences
 * Stored as JSON in profiles.nd_preferences
 */
export type NDPreferences = {
  // Motion & Visual
  reduced_motion: boolean;      // Disable animations
  high_contrast: boolean;       // Enhanced contrast mode
  focus_mode: boolean;          // Distraction-free interface
  
  // Notifications & Timers
  sound_notifications: boolean; // Enable sound alerts
  visual_timers: boolean;       // Show visual countdowns
  tl_dr_enabled: boolean;       // Summarize long content
  
  // Neurotype-specific
  dyslexia_friendly: boolean;   // OpenDyslexic font, increased spacing
  adhd_friendly: boolean;       // Task chunking, progress indicators
  autism_friendly: boolean;     // Predictable navigation, sensory defaults
};

// =====================================================
// SENSORY PREFERENCES (stored in profiles.sensory_preferences)
// =====================================================

/**
 * Sensory sensitivity settings
 * Values align with Database['public']['Enums']['sensitivity_level']
 */
export type SensoryPreferences = {
  light_sensitivity: SensitivityLevel;
  sound_sensitivity: SensitivityLevel;
  crowd_sensitivity: SensitivityLevel;
  touch_sensitivity: SensitivityLevel;
  vestibular_sensitivity: SensitivityLevel;  // Balance/movement
  olfactory_sensitivity: SensitivityLevel;   // Smell
};

// =====================================================
// ALGORITHM PREFERENCES (stored in profiles.algorithm_preferences)
// =====================================================

/**
 * Content algorithm preferences
 * Stored as JSON in profiles.algorithm_preferences
 */
export type AlgorithmPreferences = {
  // Feed personalization
  chronological_preferred: boolean;      // Disable algorithmic sorting
  show_boosted_content: boolean;         // Show promoted content
  show_subscribed_only: boolean;          // Only show subscribed channels
  
  // Recommendation settings
  recommend_related: boolean;             // Show similar creators
  recommend_trending: boolean;            // Show popular content
  recommend_new: boolean;                 // Show emerging creators
  
  // Filtering
  hide_trauma_content: boolean;           // Filter potentially triggering
  hide_politics: boolean;                 // Filter political content
  hide_marketing: boolean;                // Filter promotional content
};

// =====================================================
// DEFAULT VALUES
// =====================================================

export const DEFAULT_ND_PREFERENCES: NDPreferences = {
  reduced_motion: false,
  high_contrast: false,
  focus_mode: false,
  sound_notifications: true,
  visual_timers: true,
  tl_dr_enabled: true,
  dyslexia_friendly: false,
  adhd_friendly: false,
  autism_friendly: false,
};

export const DEFAULT_SENSORY_PREFERENCES: SensoryPreferences = {
  light_sensitivity: 'medium',
  sound_sensitivity: 'medium',
  crowd_sensitivity: 'medium',
  touch_sensitivity: 'low',
  vestibular_sensitivity: 'low',
  olfactory_sensitivity: 'low',
};

export const DEFAULT_ALGORITHM_PREFERENCES: AlgorithmPreferences = {
  chronological_preferred: false,
  show_boosted_content: true,
  show_subscribed_only: false,
  recommend_related: true,
  recommend_trending: true,
  recommend_new: true,
  hide_trauma_content: true,
  hide_politics: false,
  hide_marketing: false,
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Convert preference JSON from database to typed object
 */
export function parseNDPreferences(json: Json | null): NDPreferences {
  if (!json || typeof json !== 'object') return DEFAULT_ND_PREFERENCES;
  return { ...DEFAULT_ND_PREFERENCES, ...json } as NDPreferences;
}

export function parseSensoryPreferences(json: Json | null): SensoryPreferences {
  if (!json || typeof json !== 'object') return DEFAULT_SENSORY_PREFERENCES;
  return { ...DEFAULT_SENSORY_PREFERENCES, ...json } as SensoryPreferences;
}

export function parseAlgorithmPreferences(json: Json | null): AlgorithmPreferences {
  if (!json || typeof json !== 'object') return DEFAULT_ALGORITHM_PREFERENCES;
  return { ...DEFAULT_ALGORITHM_PREFERENCES, ...json } as AlgorithmPreferences;
}

/**
 * Convert typed preferences to JSON for database storage
 */
export function serializeNDPreferences(prefs: NDPreferences): Json {
  return prefs as unknown as Json;
}

export function serializeSensoryPreferences(prefs: SensoryPreferences): Json {
  return prefs as unknown as Json;
}

export function serializeAlgorithmPreferences(prefs: AlgorithmPreferences): Json {
  return prefs as unknown as Json;
}