// =====================================================
// FILE: validators/ontology.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Ontology SCHEMAS
// =====================================================

export const OntologyRowSchema = z.object({
  cardinality: z.string(),
  cardinality_keyword_id: z.string().nullable(),
  constraints: z.any().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  object_external: z.string().nullable(),
  object_family_id: z.string().nullable(),
  object_keyword_id: z.string().nullable(),
  predicate: z.string(),
  predicate_keyword_id: z.string().nullable(),
  relationship_source_keyword_id: z.string().nullable(),
  relationship_type: z.string(),
  subject_family_id: z.string(),
  subject_keyword_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const OntologyInsertSchema = z.object({
  cardinality: z.string().optional(),
  cardinality_keyword_id: z.string().nullable().optional(),
  constraints: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  object_external: z.string().nullable().optional(),
  object_family_id: z.string().nullable().optional(),
  object_keyword_id: z.string().nullable().optional(),
  predicate: z.string(),
  predicate_keyword_id: z.string().nullable().optional(),
  relationship_source_keyword_id: z.string().nullable().optional(),
  relationship_type: z.string().optional(),
  subject_family_id: z.string(),
  subject_keyword_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const OntologyUpdateSchema = z.object({
  cardinality: z.string().optional(),
  cardinality_keyword_id: z.string().nullable().optional(),
  constraints: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  object_external: z.string().nullable().optional(),
  object_family_id: z.string().nullable().optional(),
  object_keyword_id: z.string().nullable().optional(),
  predicate: z.string().optional(),
  predicate_keyword_id: z.string().nullable().optional(),
  relationship_source_keyword_id: z.string().nullable().optional(),
  relationship_type: z.string().optional(),
  subject_family_id: z.string().optional(),
  subject_keyword_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type OntologyRowInput = z.infer<typeof OntologyRowSchema>;
export type OntologyInsertInput = z.infer<typeof OntologyInsertSchema>;
export type OntologyUpdateInput = z.infer<typeof OntologyUpdateSchema>;
