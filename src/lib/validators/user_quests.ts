// =====================================================
// FILE: validators/user_quests.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// UserQuests SCHEMAS
// =====================================================

export const UserQuestsRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
  quest_id: z.string(),
  started_at: z.string().nullable(),
  status: z.any().nullable(),
  submission_metadata: z.any().nullable(),
  submitted_content: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const UserQuestsInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  id: z.string().optional(),
  quest_id: z.string().optional(),
  started_at: z.string().nullable().optional(),
  status: z.any().nullable().optional(),
  submission_metadata: z.any().nullable().optional(),
  submitted_content: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserQuestsRowInput = z.infer<typeof UserQuestsRowSchema>;
export type UserQuestsInsertInput = z.infer<typeof UserQuestsInsertSchema>;
