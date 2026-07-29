// =====================================================
// FILE: validators/functions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Functions SCHEMAS
// =====================================================

export const FunctionsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  language: z.string().nullable(),
  log: z.any(),
  name: z.string(),
  purpose: z.string().nullable(),
  signature: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const FunctionsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  language: z.string().nullable().optional(),
  log: z.any().optional(),
  name: z.string(),
  purpose: z.string().nullable().optional(),
  signature: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const FunctionsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  language: z.string().nullable().optional(),
  log: z.any().optional(),
  name: z.string().optional(),
  purpose: z.string().nullable().optional(),
  signature: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type FunctionsRowInput = z.infer<typeof FunctionsRowSchema>;
export type FunctionsInsertInput = z.infer<typeof FunctionsInsertSchema>;
export type FunctionsUpdateInput = z.infer<typeof FunctionsUpdateSchema>;
