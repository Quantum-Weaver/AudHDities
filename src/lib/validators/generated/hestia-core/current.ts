// =====================================================
// FILE: validators/current.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Current SCHEMAS
// =====================================================

export const CurrentRowSchema = z.object({
  created_at: z.string(),
  description: z.string().nullable(),
  event_at: z.string(),
  event_type: z.string(),
  id: z.string(),
  metadata: z.any().nullable(),
  reference_id: z.string().nullable(),
  reference_table: z.string().nullable(),
  sovereign_id: z.string().nullable(),
});

export const CurrentInsertSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  event_at: z.string().optional(),
  event_type: z.string(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  reference_id: z.string().nullable().optional(),
  reference_table: z.string().nullable().optional(),
  sovereign_id: z.string().nullable().optional(),
});

export const CurrentUpdateSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  event_at: z.string().optional(),
  event_type: z.string().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  reference_id: z.string().nullable().optional(),
  reference_table: z.string().nullable().optional(),
  sovereign_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CurrentRowInput = z.infer<typeof CurrentRowSchema>;
export type CurrentInsertInput = z.infer<typeof CurrentInsertSchema>;
export type CurrentUpdateInput = z.infer<typeof CurrentUpdateSchema>;
