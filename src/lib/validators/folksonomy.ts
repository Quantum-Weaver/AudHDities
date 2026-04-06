// =====================================================
// FILE: validators/folksonomy.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Folksonomy SCHEMAS
// =====================================================

export const FolksonomyRowSchema = z.object({
  approved_by: z.string().nullable(),
  created_at: z.string().nullable(),
  creator_id: z.string(),
  id: z.string(),
  is_approved: z.boolean().nullable(),
  tag: z.string(),
  target_id: z.string(),
  target_type: z.any(),
  weight: z.number().nullable(),
});

export const FolksonomyInsertSchema = z.object({
  approved_by: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  id: z.string().optional(),
  is_approved: z.boolean().nullable().optional(),
  tag: z.string().optional(),
  target_id: z.string().optional(),
  target_type: z.any().optional(),
  weight: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type FolksonomyRowInput = z.infer<typeof FolksonomyRowSchema>;
export type FolksonomyInsertInput = z.infer<typeof FolksonomyInsertSchema>;
