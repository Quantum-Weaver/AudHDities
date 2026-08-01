// =====================================================
// FILE: validators/companion_cues.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// CompanionCues SCHEMAS
// =====================================================

export const CompanionCuesRowSchema = z.object({
  companion_id: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  cue_behavior: z.string().nullable(),
  cue_frequency: z.string().nullable(),
  cue_type: z.string(),
  id: z.string(),
  is_active: z.boolean(),
  last_cued_at: z.string().nullable(),
  next_cue_at: z.string().nullable(),
  notes: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const CompanionCuesInsertSchema = z.object({
  companion_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  cue_behavior: z.string().nullable().optional(),
  cue_frequency: z.string().nullable().optional(),
  cue_type: z.string(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_cued_at: z.string().nullable().optional(),
  next_cue_at: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const CompanionCuesUpdateSchema = z.object({
  companion_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  cue_behavior: z.string().nullable().optional(),
  cue_frequency: z.string().nullable().optional(),
  cue_type: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_cued_at: z.string().nullable().optional(),
  next_cue_at: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CompanionCuesRowInput = z.infer<typeof CompanionCuesRowSchema>;
export type CompanionCuesInsertInput = z.infer<typeof CompanionCuesInsertSchema>;
export type CompanionCuesUpdateInput = z.infer<typeof CompanionCuesUpdateSchema>;
