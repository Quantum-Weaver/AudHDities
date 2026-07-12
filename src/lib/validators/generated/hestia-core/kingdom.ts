// =====================================================
// FILE: validators/kingdom.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Kingdom SCHEMAS
// =====================================================

export const KingdomRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  domain_id: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  name: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const KingdomInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain_id: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const KingdomUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  domain_id: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type KingdomRowInput = z.infer<typeof KingdomRowSchema>;
export type KingdomInsertInput = z.infer<typeof KingdomInsertSchema>;
export type KingdomUpdateInput = z.infer<typeof KingdomUpdateSchema>;
