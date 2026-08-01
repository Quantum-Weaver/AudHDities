// =====================================================
// FILE: validators/generations.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Generations SCHEMAS
// =====================================================

export const GenerationsRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_at: z.string(),
  duration_ms: z.number().nullable(),
  errors: z.any().nullable(),
  files_generated: z.any().nullable(),
  id: z.string(),
  script_id: z.string().nullable(),
  started_at: z.string(),
  status: z.string(),
  summary: z.string().nullable(),
  table_name: z.string().nullable(),
});

export const GenerationsInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  duration_ms: z.number().nullable().optional(),
  errors: z.any().nullable().optional(),
  files_generated: z.any().nullable().optional(),
  id: z.string().optional(),
  script_id: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.string().optional(),
  summary: z.string().nullable().optional(),
  table_name: z.string().nullable().optional(),
});

export const GenerationsUpdateSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  duration_ms: z.number().nullable().optional(),
  errors: z.any().nullable().optional(),
  files_generated: z.any().nullable().optional(),
  id: z.string().optional(),
  script_id: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.string().optional(),
  summary: z.string().nullable().optional(),
  table_name: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GenerationsRowInput = z.infer<typeof GenerationsRowSchema>;
export type GenerationsInsertInput = z.infer<typeof GenerationsInsertSchema>;
export type GenerationsUpdateInput = z.infer<typeof GenerationsUpdateSchema>;
