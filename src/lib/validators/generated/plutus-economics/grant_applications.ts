// =====================================================
// FILE: validators/grant_applications.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// GrantApplications SCHEMAS
// =====================================================

export const GrantApplicationsRowSchema = z.object({
  attachment_ids: z.any().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  deadline: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  narrative_ids: z.any().nullable(),
  notes: z.string().nullable(),
  opportunity_id: z.string().nullable(),
  outcome_notes: z.string().nullable(),
  reminder_enabled: z.boolean(),
  status: z.string(),
  submitted_at: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const GrantApplicationsInsertSchema = z.object({
  attachment_ids: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  deadline: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  narrative_ids: z.any().nullable().optional(),
  notes: z.string().nullable().optional(),
  opportunity_id: z.string().nullable().optional(),
  outcome_notes: z.string().nullable().optional(),
  reminder_enabled: z.boolean().optional(),
  status: z.string().optional(),
  submitted_at: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const GrantApplicationsUpdateSchema = z.object({
  attachment_ids: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  deadline: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  narrative_ids: z.any().nullable().optional(),
  notes: z.string().nullable().optional(),
  opportunity_id: z.string().nullable().optional(),
  outcome_notes: z.string().nullable().optional(),
  reminder_enabled: z.boolean().optional(),
  status: z.string().optional(),
  submitted_at: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GrantApplicationsRowInput = z.infer<typeof GrantApplicationsRowSchema>;
export type GrantApplicationsInsertInput = z.infer<typeof GrantApplicationsInsertSchema>;
export type GrantApplicationsUpdateInput = z.infer<typeof GrantApplicationsUpdateSchema>;
