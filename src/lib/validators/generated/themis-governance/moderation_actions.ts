// =====================================================
// FILE: validators/generated/themis-governance/moderation_actions.ts
// GENERATED: 2026-04-15T19:30:35.506Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { MODERATION_ACTION_TYPE } from '@/lib/constants/generated/themis-governance/moderation_action_type';
import { MODERATION_TARGET_TYPE } from '@/lib/constants/generated/themis-governance/moderation_target_type';

// =====================================================
// ModerationActions SCHEMAS
// =====================================================

export const ModerationActionsRowSchema = z.object({
  action_type: z.enum(Object.values(MODERATION_ACTION_TYPE)),
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
  target_type: z.enum(Object.values(MODERATION_TARGET_TYPE)),
});

export const ModerationActionsInsertSchema = z.object({
  action_type: z.enum(Object.values(MODERATION_ACTION_TYPE)).optional(),
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
  target_type: z.enum(Object.values(MODERATION_TARGET_TYPE)).optional(),
});

export const ModerationActionsUpdateSchema = z.object({
  action_type: z.enum(Object.values(MODERATION_ACTION_TYPE)).optional(),
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
  target_type: z.enum(Object.values(MODERATION_TARGET_TYPE)).optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ModerationActionsRowInput = z.infer<typeof ModerationActionsRowSchema>;
export type ModerationActionsInsertInput = z.infer<typeof ModerationActionsInsertSchema>;
export type ModerationActionsUpdateInput = z.infer<typeof ModerationActionsUpdateSchema>;
