// =====================================================
// FILE: validators/sensory_lexicon.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// SensoryLexicon SCHEMAS
// =====================================================

export const SensoryLexiconRowSchema = z.object({
  atom_id: z.string().nullable(),
  atom_word: z.string().nullable(),
  color_hex: z.string().nullable(),
  color_name: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  emoji: z.string().nullable(),
  id: z.string(),
  is_primary: z.boolean(),
  keyword_id: z.string().nullable(),
  movement: z.string().nullable(),
  shape: z.string().nullable(),
  smell: z.string().nullable(),
  sound_description: z.string().nullable(),
  sound_file_url: z.string().nullable(),
  sound_frequency: z.string().nullable(),
  sound_pitch: z.string().nullable(),
  sound_timbre: z.string().nullable(),
  sound_tone: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  taste: z.string().nullable(),
  temperature: z.string().nullable(),
  texture: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const SensoryLexiconInsertSchema = z.object({
  atom_id: z.string().nullable().optional(),
  atom_word: z.string().nullable().optional(),
  color_hex: z.string().nullable().optional(),
  color_name: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_primary: z.boolean().optional(),
  keyword_id: z.string().nullable().optional(),
  movement: z.string().nullable().optional(),
  shape: z.string().nullable().optional(),
  smell: z.string().nullable().optional(),
  sound_description: z.string().nullable().optional(),
  sound_file_url: z.string().nullable().optional(),
  sound_frequency: z.string().nullable().optional(),
  sound_pitch: z.string().nullable().optional(),
  sound_timbre: z.string().nullable().optional(),
  sound_tone: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  taste: z.string().nullable().optional(),
  temperature: z.string().nullable().optional(),
  texture: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SensoryLexiconUpdateSchema = z.object({
  atom_id: z.string().nullable().optional(),
  atom_word: z.string().nullable().optional(),
  color_hex: z.string().nullable().optional(),
  color_name: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_primary: z.boolean().optional(),
  keyword_id: z.string().nullable().optional(),
  movement: z.string().nullable().optional(),
  shape: z.string().nullable().optional(),
  smell: z.string().nullable().optional(),
  sound_description: z.string().nullable().optional(),
  sound_file_url: z.string().nullable().optional(),
  sound_frequency: z.string().nullable().optional(),
  sound_pitch: z.string().nullable().optional(),
  sound_timbre: z.string().nullable().optional(),
  sound_tone: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  taste: z.string().nullable().optional(),
  temperature: z.string().nullable().optional(),
  texture: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SensoryLexiconRowInput = z.infer<typeof SensoryLexiconRowSchema>;
export type SensoryLexiconInsertInput = z.infer<typeof SensoryLexiconInsertSchema>;
export type SensoryLexiconUpdateInput = z.infer<typeof SensoryLexiconUpdateSchema>;
