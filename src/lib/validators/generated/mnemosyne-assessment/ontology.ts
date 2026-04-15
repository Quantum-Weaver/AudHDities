// =====================================================
// FILE: validators/generated/mnemosyne-assessment/ontology.ts
// GENERATED: 2026-04-15T19:06:11.572Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { ONTOLOGY_PREDICATE } from '@/lib/constants/generated/mnemosyne-assessment/ontology_predicate';

// =====================================================
// Ontology SCHEMAS
// =====================================================

export const OntologyRowSchema = z.object({
  approved_by: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_approved: z.boolean().nullable(),
  object_id: z.string(),
  predicate: z.enum(Object.values(ONTOLOGY_PREDICATE)),
  subject_id: z.string(),
  updated_at: z.string().nullable(),
  weight: z.number().nullable(),
});

export const OntologyInsertSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_approved: z.boolean().nullable().optional(),
  object_id: z.string().optional(),
  predicate: z.enum(Object.values(ONTOLOGY_PREDICATE)).optional(),
  subject_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
});

export const OntologyUpdateSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_approved: z.boolean().nullable().optional(),
  object_id: z.string().optional(),
  predicate: z.enum(Object.values(ONTOLOGY_PREDICATE)).optional(),
  subject_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type OntologyRowInput = z.infer<typeof OntologyRowSchema>;
export type OntologyInsertInput = z.infer<typeof OntologyInsertSchema>;
export type OntologyUpdateInput = z.infer<typeof OntologyUpdateSchema>;
