// =====================================================
// FILE: validators/policies.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Policies SCHEMAS
// =====================================================

export const PoliciesRowSchema = z.object({
  archived_at: z.string().nullable(),
  cmd: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  last_seen_at: z.string().nullable(),
  log: z.any(),
  policy_name: z.string(),
  qual: z.string().nullable(),
  table_name: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  with_check: z.string().nullable(),
});

export const PoliciesInsertSchema = z.object({
  archived_at: z.string().nullable().optional(),
  cmd: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  policy_name: z.string(),
  qual: z.string().nullable().optional(),
  table_name: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  with_check: z.string().nullable().optional(),
});

export const PoliciesUpdateSchema = z.object({
  archived_at: z.string().nullable().optional(),
  cmd: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  policy_name: z.string().optional(),
  qual: z.string().nullable().optional(),
  table_name: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  with_check: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PoliciesRowInput = z.infer<typeof PoliciesRowSchema>;
export type PoliciesInsertInput = z.infer<typeof PoliciesInsertSchema>;
export type PoliciesUpdateInput = z.infer<typeof PoliciesUpdateSchema>;
