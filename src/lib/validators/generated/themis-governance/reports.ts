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
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  moderation_notes: z.string().nullable(),
  moderator_id: z.string().nullable(),
  reason: z.string(),
  report_type: z.enum(ENUM_VALUES.reportType),
  reported_content: z.string().nullable(),
  reported_url: z.string().nullable(),
  reported_user_id: z.string().nullable(),
  reporter_id: z.string(),
  reports_id: z.string(),
  resolution: z.string().nullable(),
  resolved_at: z.string().nullable(),
  status: z.enum(ENUM_VALUES.reportStatus).nullable(),
  target_id: z.string(),
  target_type: z.enum(ENUM_VALUES.reportTargetType),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const ReportsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  moderation_notes: z.string().nullable().optional(),
  moderator_id: z.string().nullable().optional(),
  reason: z.string(),
  report_type: z.enum(ENUM_VALUES.reportType),
  reported_content: z.string().nullable().optional(),
  reported_url: z.string().nullable().optional(),
  reported_user_id: z.string().nullable().optional(),
  reporter_id: z.string(),
  reports_id: z.string().optional(),
  resolution: z.string().nullable().optional(),
  resolved_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.reportStatus).nullable().optional(),
  target_id: z.string(),
  target_type: z.enum(ENUM_VALUES.reportTargetType),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ReportsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  moderation_notes: z.string().nullable().optional(),
  moderator_id: z.string().nullable().optional(),
  reason: z.string().optional(),
  report_type: z.enum(ENUM_VALUES.reportType).optional(),
  reported_content: z.string().nullable().optional(),
  reported_url: z.string().nullable().optional(),
  reported_user_id: z.string().nullable().optional(),
  reporter_id: z.string().optional(),
  reports_id: z.string().optional(),
  resolution: z.string().nullable().optional(),
  resolved_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.reportStatus).nullable().optional(),
  target_id: z.string().optional(),
  target_type: z.enum(ENUM_VALUES.reportTargetType).optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ReportsRowInput = z.infer<typeof ReportsRowSchema>;
export type ReportsInsertInput = z.infer<typeof ReportsInsertSchema>;
export type ReportsUpdateInput = z.infer<typeof ReportsUpdateSchema>;
