// =====================================================
// FILE: validators/moderation_actions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// ModerationActions SCHEMAS
// =====================================================

export const ModerationActionsRowSchema = z.object({
  action_type: z.string(),
  appealable: z.boolean(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  duration: z.string().nullable(),
  expires_at: z.string().nullable(),
  id: z.string(),
  taken_at: z.string(),
  taken_by: z.string().nullable(),
  target_entity_id: z.string().nullable(),
  target_entity_type: z.string().nullable(),
  target_sovereign_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const ModerationActionsInsertSchema = z.object({
  action_type: z.string(),
  appealable: z.boolean().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  id: z.string().optional(),
  taken_at: z.string().optional(),
  taken_by: z.string().nullable().optional(),
  target_entity_id: z.string().nullable().optional(),
  target_entity_type: z.string().nullable().optional(),
  target_sovereign_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ModerationActionsUpdateSchema = z.object({
  action_type: z.string().optional(),
  appealable: z.boolean().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  id: z.string().optional(),
  taken_at: z.string().optional(),
  taken_by: z.string().nullable().optional(),
  target_entity_id: z.string().nullable().optional(),
  target_entity_type: z.string().nullable().optional(),
  target_sovereign_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ModerationActionsRowInput = z.infer<typeof ModerationActionsRowSchema>;
export type ModerationActionsInsertInput = z.infer<typeof ModerationActionsInsertSchema>;
export type ModerationActionsUpdateInput = z.infer<typeof ModerationActionsUpdateSchema>;
