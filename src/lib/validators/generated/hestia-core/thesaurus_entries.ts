// =====================================================
// FILE: validators/thesaurus_entries.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// ThesaurusEntries SCHEMAS
// =====================================================

export const ThesaurusEntriesRowSchema = z.object({
  concept: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  entry_text: z.string(),
  entry_type: z.string(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  language: z.string(),
  ontology_id: z.string().nullable(),
  review_notes: z.string().nullable(),
  reviewed_at: z.string().nullable(),
  reviewed_by: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  submitted_by: z.string().nullable(),
  taxonomy_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ThesaurusEntriesInsertSchema = z.object({
  concept: z.string(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  entry_text: z.string(),
  entry_type: z.string().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  language: z.string().optional(),
  ontology_id: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  submitted_by: z.string().nullable().optional(),
  taxonomy_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ThesaurusEntriesUpdateSchema = z.object({
  concept: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  entry_text: z.string().optional(),
  entry_type: z.string().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  language: z.string().optional(),
  ontology_id: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  submitted_by: z.string().nullable().optional(),
  taxonomy_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ThesaurusEntriesRowInput = z.infer<typeof ThesaurusEntriesRowSchema>;
export type ThesaurusEntriesInsertInput = z.infer<typeof ThesaurusEntriesInsertSchema>;
export type ThesaurusEntriesUpdateInput = z.infer<typeof ThesaurusEntriesUpdateSchema>;
