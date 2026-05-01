// =====================================================
// FILE: validators/user_quests.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// UserQuests SCHEMAS
// =====================================================

export const UserQuestsRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  quest_id: z.string(),
  started_at: z.string().nullable(),
  status: z.enum(ENUM_VALUES.questStatus).nullable(),
  submission_metadata: z.any().nullable(),
  submitted_content: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
  user_quests_id: z.string(),
});

export const UserQuestsInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  quest_id: z.string(),
  started_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.questStatus).nullable().optional(),
  submission_metadata: z.any().nullable().optional(),
  submitted_content: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string(),
  user_quests_id: z.string().optional(),
});

export const UserQuestsUpdateSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  quest_id: z.string().optional(),
  started_at: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.questStatus).nullable().optional(),
  submission_metadata: z.any().nullable().optional(),
  submitted_content: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
  user_quests_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserQuestsRowInput = z.infer<typeof UserQuestsRowSchema>;
export type UserQuestsInsertInput = z.infer<typeof UserQuestsInsertSchema>;
export type UserQuestsUpdateInput = z.infer<typeof UserQuestsUpdateSchema>;
