// =====================================================
// FILE: types/generated/mnemosyne-assessment/sensory_map.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-20T04:39:10.853Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SensoryLevel = Enums<'sensory_level'>;
export type ProcessingSpeed = Enums<'processing_speed'>;

export type SensoryMapRow = Tables<'sensory_map'>;
export type SensoryMapInsert = TablesInsert<'sensory_map'>;
export type SensoryMapUpdate = TablesUpdate<'sensory_map'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of sensory_map
 */
export interface PublicSensoryMap {
  activity_soothers: string[] | null;
  additional_notes: string | null;
  audio_sensitivity: SensoryLevel;
  audio_soothers: string[] | null;
  audio_triggers: string[] | null;
  average_daily_spoons: number | null;
  benefits_from_preview: boolean;
  benefits_from_routine: boolean;
  benefits_from_structure: boolean;
  created_at: string;
  created_by: string | null;
  environmental_triggers: string[] | null;
  high_cost_activities: string[] | null;
  icon_emoji: string | null;
  id: string;
  literal_communication: boolean;
  low_cost_activities: string[] | null;
  needs_processing_time: boolean;
  olfactory_sensitivity: SensoryLevel;
  overload_signs: string | null;
  preferred_input_method: string[] | null;
  preferred_output_method: string[] | null;
  processing_speed: ProcessingSpeed;
  social_triggers: string[] | null;
  stim_accommodations: string | null;
  stim_preferences: string | null;
  stim_types: string[] | null;
  tactile_sensitivity: SensoryLevel;
  tactile_soothers: string[] | null;
  updated_at: string;
  updated_by: string | null;
  vestibular_sensitivity: SensoryLevel;
  visual_sensitivity: SensoryLevel;
  visual_soothers: string[] | null;
  visual_triggers: string[] | null;
}

/**
 * Form data for sensory_map
 * All fields are optional for partial updates
 */
export interface SensoryMapFormData {
  activity_soothers?: string[] | null;
  additional_notes?: string | null;
  audio_sensitivity?: SensoryLevel;
  audio_soothers?: string[] | null;
  audio_triggers?: string[] | null;
  average_daily_spoons?: number | null;
  benefits_from_preview?: boolean;
  benefits_from_routine?: boolean;
  benefits_from_structure?: boolean;
  created_at?: string;
  created_by?: string | null;
  environmental_triggers?: string[] | null;
  high_cost_activities?: string[] | null;
  icon_emoji?: string | null;
  id?: string;
  literal_communication?: boolean;
  low_cost_activities?: string[] | null;
  needs_processing_time?: boolean;
  olfactory_sensitivity?: SensoryLevel;
  overload_signs?: string | null;
  preferred_input_method?: string[] | null;
  preferred_output_method?: string[] | null;
  processing_speed?: ProcessingSpeed;
  social_triggers?: string[] | null;
  stim_accommodations?: string | null;
  stim_preferences?: string | null;
  stim_types?: string[] | null;
  tactile_sensitivity?: SensoryLevel;
  tactile_soothers?: string[] | null;
  updated_at?: string;
  updated_by?: string | null;
  vestibular_sensitivity?: SensoryLevel;
  visual_sensitivity?: SensoryLevel;
  visual_soothers?: string[] | null;
  visual_triggers?: string[] | null;
}

/**
 * Validation result for sensory_map
 */
export interface SensoryMapValidationResult {
  valid: boolean;
  errors: {
    activity_soothers?: string;
    additional_notes?: string;
    audio_sensitivity?: string;
    audio_soothers?: string;
    audio_triggers?: string;
    average_daily_spoons?: string;
    benefits_from_preview?: string;
    benefits_from_routine?: string;
    benefits_from_structure?: string;
    created_at?: string;
    created_by?: string;
    environmental_triggers?: string;
    high_cost_activities?: string;
    icon_emoji?: string;
    id?: string;
    literal_communication?: string;
    low_cost_activities?: string;
    needs_processing_time?: string;
    olfactory_sensitivity?: string;
    overload_signs?: string;
    preferred_input_method?: string;
    preferred_output_method?: string;
    processing_speed?: string;
    social_triggers?: string;
    stim_accommodations?: string;
    stim_preferences?: string;
    stim_types?: string;
    tactile_sensitivity?: string;
    tactile_soothers?: string;
    updated_at?: string;
    updated_by?: string;
    vestibular_sensitivity?: string;
    visual_sensitivity?: string;
    visual_soothers?: string;
    visual_triggers?: string;
  };
}

