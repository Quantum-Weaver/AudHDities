// =====================================================
// FILE: validators/etymology.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Etymology SCHEMAS
// =====================================================

export const EtymologyRowSchema = z.object({
  atom_id: z.string().nullable(),
  atom_word: z.string().nullable(),
  combining_form: z.string().nullable(),
  completion_progress: z.number().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  etymon: z.string().nullable(),
  evolution_notes: z.string().nullable(),
  historical_meaning: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string(),
  morpheme_breakdown: z.string().nullable(),
  prefix: z.string().nullable(),
  root_language: z.string().nullable(),
  root_word: z.string().nullable(),
  sanctuary_meaning: z.string().nullable(),
  suffix: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const EtymologyInsertSchema = z.object({
  atom_id: z.string().nullable().optional(),
  atom_word: z.string().nullable().optional(),
  combining_form: z.string().nullable().optional(),
  completion_progress: z.number().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  etymon: z.string().nullable().optional(),
  evolution_notes: z.string().nullable().optional(),
  historical_meaning: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string(),
  morpheme_breakdown: z.string().nullable().optional(),
  prefix: z.string().nullable().optional(),
  root_language: z.string().nullable().optional(),
  root_word: z.string().nullable().optional(),
  sanctuary_meaning: z.string().nullable().optional(),
  suffix: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const EtymologyUpdateSchema = z.object({
  atom_id: z.string().nullable().optional(),
  atom_word: z.string().nullable().optional(),
  combining_form: z.string().nullable().optional(),
  completion_progress: z.number().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  etymon: z.string().nullable().optional(),
  evolution_notes: z.string().nullable().optional(),
  historical_meaning: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().optional(),
  morpheme_breakdown: z.string().nullable().optional(),
  prefix: z.string().nullable().optional(),
  root_language: z.string().nullable().optional(),
  root_word: z.string().nullable().optional(),
  sanctuary_meaning: z.string().nullable().optional(),
  suffix: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EtymologyRowInput = z.infer<typeof EtymologyRowSchema>;
export type EtymologyInsertInput = z.infer<typeof EtymologyInsertSchema>;
export type EtymologyUpdateInput = z.infer<typeof EtymologyUpdateSchema>;
