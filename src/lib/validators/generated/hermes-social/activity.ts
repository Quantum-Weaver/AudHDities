// =====================================================
// FILE: validators/generated/hermes-social/activity.ts
// GENERATED: 2026-04-15T18:11:44.250Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { ACTION_TYPE } from '@/lib/constants/generated/hermes-social/action_type';
import { ACTIVITY_VISIBILITY } from '@/lib/constants/generated/hermes-social/activity_visibility';
import { TARGET_TYPE } from '@/lib/constants/generated/hermes-social/target_type';

// =====================================================
// Activity SCHEMAS
// =====================================================

export const ActivityRowSchema = z.object({
  action_type: z.enum(Object.values(ACTION_TYPE)),
  actor_id: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  metadata: z.any().nullable(),
  target_id: z.string().nullable(),
  target_type: z.enum(Object.values(TARGET_TYPE)).nullable(),
  user_id: z.string(),
  visibility: z.enum(Object.values(ACTIVITY_VISIBILITY)).nullable(),
});

export const ActivityInsertSchema = z.object({
  action_type: z.enum(Object.values(ACTION_TYPE)).optional(),
  actor_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  target_id: z.string().nullable().optional(),
  target_type: z.enum(Object.values(TARGET_TYPE)).nullable().optional(),
  user_id: z.string().optional(),
  visibility: z.enum(Object.values(ACTIVITY_VISIBILITY)).nullable().optional(),
});

export const ActivityUpdateSchema = z.object({
  action_type: z.enum(Object.values(ACTION_TYPE)).optional(),
  actor_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  target_id: z.string().nullable().optional(),
  target_type: z.enum(Object.values(TARGET_TYPE)).nullable().optional(),
  user_id: z.string().optional(),
  visibility: z.enum(Object.values(ACTIVITY_VISIBILITY)).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ActivityRowInput = z.infer<typeof ActivityRowSchema>;
export type ActivityInsertInput = z.infer<typeof ActivityInsertSchema>;
export type ActivityUpdateInput = z.infer<typeof ActivityUpdateSchema>;
