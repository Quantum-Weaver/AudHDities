// =====================================================
// FILE: validators/generated/mnemosyne-assessment/etymology.ts
// GENERATED: 2026-04-14T19:39:30.083Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// Etymology SCHEMAS
// =====================================================

export const EtymologyRowSchema = z.object({
  "approved_at": "z.string().nullable()";
  approved_by: z.string().nullable();
  contributor_id: z.string().nullable();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  cultural_context: z.string().nullable();
  current_meaning: z.string();
  id: z.string();
  is_approved: z.boolean().nullable();
  language: z.string();
  original_meaning: z.string();
  related_words: z.any().nullable();
  root: z.string().nullable();
  semantic_shift: z.string().nullable();
  "updated_at": "z.string().nullable()";
  word: z.string();
});

export const EtymologyInsertSchema = z.object({
  "approved_at": "z.string().nullable().optional()";
  approved_by: z.string().nullable().optional();
  contributor_id: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  cultural_context: z.string().nullable().optional();
  current_meaning: z.string().optional();
  id: z.string().optional();
  is_approved: z.boolean().nullable().optional();
  language: z.string().optional();
  original_meaning: z.string().optional();
  related_words: z.any().nullable().optional();
  root: z.string().nullable().optional();
  semantic_shift: z.string().nullable().optional();
  "updated_at": "z.string().nullable().optional()";
  word: z.string().optional();
});

export const EtymologyUpdateSchema = z.object({
  "approved_at": "z.string().nullable().optional()";
  approved_by: z.string().nullable().optional();
  contributor_id: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  cultural_context: z.string().nullable().optional();
  current_meaning: z.string().optional();
  id: z.string().optional();
  is_approved: z.boolean().nullable().optional();
  language: z.string().optional();
  original_meaning: z.string().optional();
  related_words: z.any().nullable().optional();
  root: z.string().nullable().optional();
  semantic_shift: z.string().nullable().optional();
  "updated_at": "z.string().nullable().optional()";
  word: z.string().optional();
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EtymologyRowInput = z.infer<typeof EtymologyRowSchema>;
export type EtymologyInsertInput = z.infer<typeof EtymologyInsertSchema>;
export type EtymologyUpdateInput = z.infer<typeof EtymologyUpdateSchema>;
