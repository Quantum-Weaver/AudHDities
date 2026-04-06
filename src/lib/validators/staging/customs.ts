// =====================================================
// FILE: validators/customs.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Customs SCHEMAS
// =====================================================

export const CustomsRowSchema = z.object({
  category: z.any(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  guidance: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  is_sensitive: z.boolean().nullable(),
  name: z.string(),
  persona_id: z.string().nullable(),
  region_id: z.string().nullable(),
  slug: z.string(),
  updated_at: z.string().nullable(),
});

export const CustomsInsertSchema = z.object({
  category: z.any().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  guidance: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  is_sensitive: z.boolean().nullable().optional(),
  name: z.string().optional(),
  persona_id: z.string().nullable().optional(),
  region_id: z.string().nullable().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CustomsRowInput = z.infer<typeof CustomsRowSchema>;
export type CustomsInsertInput = z.infer<typeof CustomsInsertSchema>;
