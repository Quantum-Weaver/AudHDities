// =====================================================
// FILE: validators/reports.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Reports SCHEMAS
// =====================================================

export const ReportsRowSchema = z.object({
  created_at: z.string().nullable(),
  id: z.string(),
  moderation_notes: z.string().nullable(),
  moderator_id: z.string().nullable(),
  reason: z.string(),
  report_type: z.any(),
  reported_content: z.string().nullable(),
  reported_url: z.string().nullable(),
  reported_user_id: z.string().nullable(),
  reporter_id: z.string(),
  resolution: z.string().nullable(),
  resolved_at: z.string().nullable(),
  status: z.any().nullable(),
  target_id: z.string(),
  target_type: z.any(),
  updated_at: z.string().nullable(),
});

export const ReportsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  id: z.string().optional(),
  moderation_notes: z.string().nullable().optional(),
  moderator_id: z.string().nullable().optional(),
  reason: z.string().optional(),
  report_type: z.any().optional(),
  reported_content: z.string().nullable().optional(),
  reported_url: z.string().nullable().optional(),
  reported_user_id: z.string().nullable().optional(),
  reporter_id: z.string().optional(),
  resolution: z.string().nullable().optional(),
  resolved_at: z.string().nullable().optional(),
  status: z.any().nullable().optional(),
  target_id: z.string().optional(),
  target_type: z.any().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ReportsRowInput = z.infer<typeof ReportsRowSchema>;
export type ReportsInsertInput = z.infer<typeof ReportsInsertSchema>;
