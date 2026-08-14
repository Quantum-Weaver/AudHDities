// =====================================================
// FILE: validators/boundaries.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Boundaries SCHEMAS
// =====================================================

export const BoundariesRowSchema = z.object({
  applies_to: z.string().nullable(),
  boundary_type: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_blocking: z.boolean(),
  name: z.string(),
  rule_config: z.any().nullable(),
  severity: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const BoundariesInsertSchema = z.object({
  applies_to: z.string().nullable().optional(),
  boundary_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_blocking: z.boolean().optional(),
  name: z.string(),
  rule_config: z.any().nullable().optional(),
  severity: z.string().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const BoundariesUpdateSchema = z.object({
  applies_to: z.string().nullable().optional(),
  boundary_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_blocking: z.boolean().optional(),
  name: z.string().optional(),
  rule_config: z.any().nullable().optional(),
  severity: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type BoundariesRowInput = z.infer<typeof BoundariesRowSchema>;
export type BoundariesInsertInput = z.infer<typeof BoundariesInsertSchema>;
export type BoundariesUpdateInput = z.infer<typeof BoundariesUpdateSchema>;
