// =====================================================
// FILE: validators/activity.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Activity SCHEMAS
// =====================================================

export const ActivityRowSchema = z.object({
  action_type: z.enum(ENUM_VALUES.actionType),
  activity_id: z.string(),
  actor_id: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  metadata: z.any().nullable(),
  target_id: z.string().nullable(),
  target_type: z.enum(ENUM_VALUES.targetType).nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
  visibility: z.enum(ENUM_VALUES.activityVisibility).nullable(),
});

export const ActivityInsertSchema = z.object({
  action_type: z.enum(ENUM_VALUES.actionType),
  activity_id: z.string().optional(),
  actor_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  target_id: z.string().nullable().optional(),
  target_type: z.enum(ENUM_VALUES.targetType).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
  visibility: z.enum(ENUM_VALUES.activityVisibility).nullable().optional(),
});

export const ActivityUpdateSchema = z.object({
  action_type: z.enum(ENUM_VALUES.actionType).optional(),
  activity_id: z.string().optional(),
  actor_id: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  target_id: z.string().nullable().optional(),
  target_type: z.enum(ENUM_VALUES.targetType).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
  visibility: z.enum(ENUM_VALUES.activityVisibility).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ActivityRowInput = z.infer<typeof ActivityRowSchema>;
export type ActivityInsertInput = z.infer<typeof ActivityInsertSchema>;
export type ActivityUpdateInput = z.infer<typeof ActivityUpdateSchema>;
