// =====================================================
// FILE: validators/sensory_map.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// SensoryMap SCHEMAS
// =====================================================

export const SensoryMapRowSchema = z.object({
  activity_soothers: z.any().nullable(),
  additional_notes: z.string().nullable(),
  audio_sensitivity: z.enum(ENUM_VALUES.sensoryLevel),
  audio_soothers: z.any().nullable(),
  audio_triggers: z.any().nullable(),
  average_daily_spoons: z.number().nullable(),
  benefits_from_preview: z.boolean(),
  benefits_from_routine: z.boolean(),
  benefits_from_structure: z.boolean(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  environmental_triggers: z.any().nullable(),
  high_cost_activities: z.any().nullable(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  literal_communication: z.boolean(),
  low_cost_activities: z.any().nullable(),
  needs_processing_time: z.boolean(),
  olfactory_sensitivity: z.enum(ENUM_VALUES.sensoryLevel),
  overload_signs: z.string().nullable(),
  preferred_input_method: z.any().nullable(),
  preferred_output_method: z.any().nullable(),
  processing_speed: z.enum(ENUM_VALUES.processingSpeed),
  social_triggers: z.any().nullable(),
  stim_accommodations: z.string().nullable(),
  stim_preferences: z.string().nullable(),
  stim_types: z.any().nullable(),
  tactile_sensitivity: z.enum(ENUM_VALUES.sensoryLevel),
  tactile_soothers: z.any().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  vestibular_sensitivity: z.enum(ENUM_VALUES.sensoryLevel),
  visual_sensitivity: z.enum(ENUM_VALUES.sensoryLevel),
  visual_soothers: z.any().nullable(),
  visual_triggers: z.any().nullable(),
});

export const SensoryMapInsertSchema = z.object({
  activity_soothers: z.any().nullable().optional(),
  additional_notes: z.string().nullable().optional(),
  audio_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  audio_soothers: z.any().nullable().optional(),
  audio_triggers: z.any().nullable().optional(),
  average_daily_spoons: z.number().nullable().optional(),
  benefits_from_preview: z.boolean().optional(),
  benefits_from_routine: z.boolean().optional(),
  benefits_from_structure: z.boolean().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  environmental_triggers: z.any().nullable().optional(),
  high_cost_activities: z.any().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string(),
  literal_communication: z.boolean().optional(),
  low_cost_activities: z.any().nullable().optional(),
  needs_processing_time: z.boolean().optional(),
  olfactory_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  overload_signs: z.string().nullable().optional(),
  preferred_input_method: z.any().nullable().optional(),
  preferred_output_method: z.any().nullable().optional(),
  processing_speed: z.enum(ENUM_VALUES.processingSpeed).optional(),
  social_triggers: z.any().nullable().optional(),
  stim_accommodations: z.string().nullable().optional(),
  stim_preferences: z.string().nullable().optional(),
  stim_types: z.any().nullable().optional(),
  tactile_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  tactile_soothers: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  vestibular_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  visual_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  visual_soothers: z.any().nullable().optional(),
  visual_triggers: z.any().nullable().optional(),
});

export const SensoryMapUpdateSchema = z.object({
  activity_soothers: z.any().nullable().optional(),
  additional_notes: z.string().nullable().optional(),
  audio_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  audio_soothers: z.any().nullable().optional(),
  audio_triggers: z.any().nullable().optional(),
  average_daily_spoons: z.number().nullable().optional(),
  benefits_from_preview: z.boolean().optional(),
  benefits_from_routine: z.boolean().optional(),
  benefits_from_structure: z.boolean().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  environmental_triggers: z.any().nullable().optional(),
  high_cost_activities: z.any().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  literal_communication: z.boolean().optional(),
  low_cost_activities: z.any().nullable().optional(),
  needs_processing_time: z.boolean().optional(),
  olfactory_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  overload_signs: z.string().nullable().optional(),
  preferred_input_method: z.any().nullable().optional(),
  preferred_output_method: z.any().nullable().optional(),
  processing_speed: z.enum(ENUM_VALUES.processingSpeed).optional(),
  social_triggers: z.any().nullable().optional(),
  stim_accommodations: z.string().nullable().optional(),
  stim_preferences: z.string().nullable().optional(),
  stim_types: z.any().nullable().optional(),
  tactile_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  tactile_soothers: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  vestibular_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  visual_sensitivity: z.enum(ENUM_VALUES.sensoryLevel).optional(),
  visual_soothers: z.any().nullable().optional(),
  visual_triggers: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SensoryMapRowInput = z.infer<typeof SensoryMapRowSchema>;
export type SensoryMapInsertInput = z.infer<typeof SensoryMapInsertSchema>;
export type SensoryMapUpdateInput = z.infer<typeof SensoryMapUpdateSchema>;
