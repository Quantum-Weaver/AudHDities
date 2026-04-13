// =====================================================
// FILE: validators/prometheus_boundaries.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// PrometheusBoundaries SCHEMAS
// =====================================================

export const PrometheusBoundariesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  encryption_level: z.any(),
  id: z.string(),
  is_active: z.boolean(),
  path_pattern: z.string().nullable(),
  pattern: z.string().nullable(),
  reason: z.string(),
  requires_approval: z.boolean(),
  rule_type: z.any(),
  updated_at: z.string(),
});

export const PrometheusBoundariesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  encryption_level: z.any().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  path_pattern: z.string().nullable().optional(),
  pattern: z.string().nullable().optional(),
  reason: z.string().optional(),
  requires_approval: z.boolean().optional(),
  rule_type: z.any().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusBoundariesRowInput = z.infer<typeof PrometheusBoundariesRowSchema>;
export type PrometheusBoundariesInsertInput = z.infer<typeof PrometheusBoundariesInsertSchema>;
