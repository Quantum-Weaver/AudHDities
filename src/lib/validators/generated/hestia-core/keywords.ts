// =====================================================
// FILE: validators/keywords.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Keywords SCHEMAS
// =====================================================

export const KeywordsRowSchema = z.object({
  atom_word: z.string().nullable(),
  category: z.string().nullable(),
  color: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  definition: z.string(),
  emoji: z.string().nullable(),
  etymology_progress: z.number().nullable(),
  id: z.string(),
  keyword: z.string(),
  keyword_type: z.string().nullable(),
  movement: z.string().nullable(),
  root_language: z.string().nullable(),
  sanctuary_meaning: z.string().nullable(),
  shape: z.string().nullable(),
  smell: z.string().nullable(),
  sound: z.string().nullable(),
  sound_file_url: z.string().nullable(),
  sound_frequency: z.string().nullable(),
  sound_pitch: z.string().nullable(),
  sound_timbre: z.string().nullable(),
  sound_tone: z.string().nullable(),
  taste: z.string().nullable(),
  temperature: z.string().nullable(),
  texture: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  word_origin: z.string().nullable(),
});

export const KeywordsInsertSchema = z.object({
  atom_word: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  definition: z.string(),
  emoji: z.string().nullable().optional(),
  etymology_progress: z.number().nullable().optional(),
  id: z.string().optional(),
  keyword: z.string(),
  keyword_type: z.string().nullable().optional(),
  movement: z.string().nullable().optional(),
  root_language: z.string().nullable().optional(),
  sanctuary_meaning: z.string().nullable().optional(),
  shape: z.string().nullable().optional(),
  smell: z.string().nullable().optional(),
  sound: z.string().nullable().optional(),
  sound_file_url: z.string().nullable().optional(),
  sound_frequency: z.string().nullable().optional(),
  sound_pitch: z.string().nullable().optional(),
  sound_timbre: z.string().nullable().optional(),
  sound_tone: z.string().nullable().optional(),
  taste: z.string().nullable().optional(),
  temperature: z.string().nullable().optional(),
  texture: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  word_origin: z.string().nullable().optional(),
});

export const KeywordsUpdateSchema = z.object({
  atom_word: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  definition: z.string().optional(),
  emoji: z.string().nullable().optional(),
  etymology_progress: z.number().nullable().optional(),
  id: z.string().optional(),
  keyword: z.string().optional(),
  keyword_type: z.string().nullable().optional(),
  movement: z.string().nullable().optional(),
  root_language: z.string().nullable().optional(),
  sanctuary_meaning: z.string().nullable().optional(),
  shape: z.string().nullable().optional(),
  smell: z.string().nullable().optional(),
  sound: z.string().nullable().optional(),
  sound_file_url: z.string().nullable().optional(),
  sound_frequency: z.string().nullable().optional(),
  sound_pitch: z.string().nullable().optional(),
  sound_timbre: z.string().nullable().optional(),
  sound_tone: z.string().nullable().optional(),
  taste: z.string().nullable().optional(),
  temperature: z.string().nullable().optional(),
  texture: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  word_origin: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type KeywordsRowInput = z.infer<typeof KeywordsRowSchema>;
export type KeywordsInsertInput = z.infer<typeof KeywordsInsertSchema>;
export type KeywordsUpdateInput = z.infer<typeof KeywordsUpdateSchema>;
