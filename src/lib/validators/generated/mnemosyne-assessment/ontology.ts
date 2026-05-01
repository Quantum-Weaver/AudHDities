// =====================================================
// FILE: validators/ontology.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Ontology SCHEMAS
// =====================================================

export const OntologyRowSchema = z.object({
  approved_by: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  is_approved: z.boolean().nullable(),
  object_id: z.string(),
  ontology_id: z.string(),
  predicate: z.enum(ENUM_VALUES.ontologyPredicate),
  subject_id: z.string(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
  weight: z.number().nullable(),
});

export const OntologyInsertSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  is_approved: z.boolean().nullable().optional(),
  object_id: z.string(),
  ontology_id: z.string().optional(),
  predicate: z.enum(ENUM_VALUES.ontologyPredicate),
  subject_id: z.string(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
});

export const OntologyUpdateSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  is_approved: z.boolean().nullable().optional(),
  object_id: z.string().optional(),
  ontology_id: z.string().optional(),
  predicate: z.enum(ENUM_VALUES.ontologyPredicate).optional(),
  subject_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type OntologyRowInput = z.infer<typeof OntologyRowSchema>;
export type OntologyInsertInput = z.infer<typeof OntologyInsertSchema>;
export type OntologyUpdateInput = z.infer<typeof OntologyUpdateSchema>;
