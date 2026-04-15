// =====================================================
// FILE: validators/generated/prometheus-meta/prometheus_boundaries.ts
// GENERATED: 2026-04-15T01:41:08.110Z
// SOURCE: database.types.ts
// =====================================================

import type { BoundaryType } from '@/lib/constants/generated/prometheus-meta/boundary_type';
import type { EncryptionLevel } from '@/lib/constants/generated/prometheus-meta/encryption_level';
import z from 'zod';

// =====================================================
// PrometheusBoundaries SCHEMAS
// =====================================================

export const PrometheusBoundariesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  encryption_level: z.enum(Object.values('EncryptionLevel')),
  id: z.string(),
  is_active: z.boolean(),
  path_pattern: z.string().nullable(),
  pattern: z.string().nullable(),
  reason: z.string(),
  requires_approval: z.boolean(),
  rule_type: z.enum(Object.values('BoundaryType')),
  updated_at: z.string(),
});

export const PrometheusBoundariesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  encryption_level: z.enum(Object.values('EncryptionLevel')).optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  path_pattern: z.string().nullable().optional(),
  pattern: z.string().nullable().optional(),
  reason: z.string().optional(),
  requires_approval: z.boolean().optional(),
  rule_type: z.enum(Object.values('BoundaryType')).optional(),
  updated_at: z.string().optional(),
});

export const PrometheusBoundariesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  encryption_level: z.enum(Object.values('EncryptionLevel')).optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  path_pattern: z.string().nullable().optional(),
  pattern: z.string().nullable().optional(),
  reason: z.string().optional(),
  requires_approval: z.boolean().optional(),
  rule_type: z.enum(Object.values('BoundaryType')).optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusBoundariesRowInput = z.infer<typeof PrometheusBoundariesRowSchema>;
export type PrometheusBoundariesInsertInput = z.infer<typeof PrometheusBoundariesInsertSchema>;
export type PrometheusBoundariesUpdateInput = z.infer<typeof PrometheusBoundariesUpdateSchema>;
