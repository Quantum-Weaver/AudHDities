// =====================================================
// FILE: validators/prometheus_boundaries.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// PrometheusBoundaries SCHEMAS
// =====================================================

export const PrometheusBoundariesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  encryption_level: z.enum(ENUM_VALUES.encryptionLevel),
  is_active: z.boolean(),
  path_pattern: z.string().nullable(),
  pattern: z.string().nullable(),
  prometheus_boundaries_id: z.string(),
  reason: z.string(),
  requires_approval: z.boolean(),
  rule_type: z.enum(ENUM_VALUES.boundaryType),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const PrometheusBoundariesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  encryption_level: z.enum(ENUM_VALUES.encryptionLevel).optional(),
  is_active: z.boolean().optional(),
  path_pattern: z.string().nullable().optional(),
  pattern: z.string().nullable().optional(),
  prometheus_boundaries_id: z.string().optional(),
  reason: z.string(),
  requires_approval: z.boolean().optional(),
  rule_type: z.enum(ENUM_VALUES.boundaryType),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const PrometheusBoundariesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  encryption_level: z.enum(ENUM_VALUES.encryptionLevel).optional(),
  is_active: z.boolean().optional(),
  path_pattern: z.string().nullable().optional(),
  pattern: z.string().nullable().optional(),
  prometheus_boundaries_id: z.string().optional(),
  reason: z.string().optional(),
  requires_approval: z.boolean().optional(),
  rule_type: z.enum(ENUM_VALUES.boundaryType).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusBoundariesRowInput = z.infer<typeof PrometheusBoundariesRowSchema>;
export type PrometheusBoundariesInsertInput = z.infer<typeof PrometheusBoundariesInsertSchema>;
export type PrometheusBoundariesUpdateInput = z.infer<typeof PrometheusBoundariesUpdateSchema>;
