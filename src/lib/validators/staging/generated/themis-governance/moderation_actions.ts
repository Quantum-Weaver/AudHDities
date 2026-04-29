// =====================================================
// FILE: validators/moderation_actions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// ModerationActions SCHEMAS
// =====================================================

export const ModerationActionsRowSchema = z.object({
  action_type: z.enum(ENUM_VALUES.moderationActionType),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  duration: z.string().nullable(),
  id: z.string(),
  is_reverted: z.boolean().nullable(),
  metadata: z.any().nullable(),
  moderator_id: z.string(),
  reason: z.string().nullable(),
  revert_reason: z.string().nullable(),
  reverted_at: z.string().nullable(),
  reverted_by: z.string().nullable(),
  target_id: z.string(),
  target_type: z.enum(ENUM_VALUES.moderationTargetType),
});

export const ModerationActionsInsertSchema = z.object({
  action_type: z.enum(ENUM_VALUES.moderationActionType),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  id: z.string().optional(),
  is_reverted: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  moderator_id: z.string(),
  reason: z.string().nullable().optional(),
  revert_reason: z.string().nullable().optional(),
  reverted_at: z.string().nullable().optional(),
  reverted_by: z.string().nullable().optional(),
  target_id: z.string(),
  target_type: z.enum(ENUM_VALUES.moderationTargetType),
});

export const ModerationActionsUpdateSchema = z.object({
  action_type: z.enum(ENUM_VALUES.moderationActionType).optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  id: z.string().optional(),
  is_reverted: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  moderator_id: z.string().optional(),
  reason: z.string().nullable().optional(),
  revert_reason: z.string().nullable().optional(),
  reverted_at: z.string().nullable().optional(),
  reverted_by: z.string().nullable().optional(),
  target_id: z.string().optional(),
  target_type: z.enum(ENUM_VALUES.moderationTargetType).optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ModerationActionsRowInput = z.infer<typeof ModerationActionsRowSchema>;
export type ModerationActionsInsertInput = z.infer<typeof ModerationActionsInsertSchema>;
export type ModerationActionsUpdateInput = z.infer<typeof ModerationActionsUpdateSchema>;
