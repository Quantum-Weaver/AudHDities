// =====================================================
// FILE: validators/reports.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Reports SCHEMAS
// =====================================================

export const ReportsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  priority: z.string(),
  report_type: z.string().nullable(),
  reported_entity_id: z.string().nullable(),
  reported_entity_type: z.string().nullable(),
  resolution: z.string().nullable(),
  review_notes: z.string().nullable(),
  reviewed_at: z.string().nullable(),
  reviewed_by: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.applicationStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ReportsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  priority: z.string().optional(),
  report_type: z.string().nullable().optional(),
  reported_entity_id: z.string().nullable().optional(),
  reported_entity_type: z.string().nullable().optional(),
  resolution: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.applicationStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ReportsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  priority: z.string().optional(),
  report_type: z.string().nullable().optional(),
  reported_entity_id: z.string().nullable().optional(),
  reported_entity_type: z.string().nullable().optional(),
  resolution: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.applicationStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ReportsRowInput = z.infer<typeof ReportsRowSchema>;
export type ReportsInsertInput = z.infer<typeof ReportsInsertSchema>;
export type ReportsUpdateInput = z.infer<typeof ReportsUpdateSchema>;
