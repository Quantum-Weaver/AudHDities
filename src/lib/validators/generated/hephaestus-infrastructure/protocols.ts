// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/protocols.ts
// GENERATED: 2026-04-15T05:16:17.784Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Protocols SCHEMAS
// =====================================================

export const ProtocolsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  last_reviewed: z.string().nullable(),
  name: z.string(),
  next_review: z.string().nullable(),
  owners: z.any().nullable(),
  review_frequency_days: z.number().nullable(),
  reviewed_by: z.string().nullable(),
  slug: z.string(),
  steps: z.any(),
  type: z.enum(Object.values(ProtocolType)),
  updated_at: z.string().nullable(),
  version: z.number().nullable(),
});

export const ProtocolsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  last_reviewed: z.string().nullable().optional(),
  name: z.string().optional(),
  next_review: z.string().nullable().optional(),
  owners: z.any().nullable().optional(),
  review_frequency_days: z.number().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  slug: z.string().optional(),
  steps: z.any().optional(),
  type: z.enum(Object.values(ProtocolType)).optional(),
  updated_at: z.string().nullable().optional(),
  version: z.number().nullable().optional(),
});

export const ProtocolsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  last_reviewed: z.string().nullable().optional(),
  name: z.string().optional(),
  next_review: z.string().nullable().optional(),
  owners: z.any().nullable().optional(),
  review_frequency_days: z.number().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  slug: z.string().optional(),
  steps: z.any().optional(),
  type: z.enum(Object.values(ProtocolType)).optional(),
  updated_at: z.string().nullable().optional(),
  version: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProtocolsRowInput = z.infer<typeof ProtocolsRowSchema>;
export type ProtocolsInsertInput = z.infer<typeof ProtocolsInsertSchema>;
export type ProtocolsUpdateInput = z.infer<typeof ProtocolsUpdateSchema>;
