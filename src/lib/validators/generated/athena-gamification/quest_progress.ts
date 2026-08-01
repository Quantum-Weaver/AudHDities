// =====================================================
// FILE: validators/quest_progress.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// QuestProgress SCHEMAS
// =====================================================

export const QuestProgressRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_at: z.string(),
  id: z.string(),
  objective_key: z.string(),
  objective_status: z.string(),
  progress_data: z.any().nullable(),
  quest_id: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
});

export const QuestProgressInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  objective_key: z.string(),
  objective_status: z.string().optional(),
  progress_data: z.any().nullable().optional(),
  quest_id: z.string(),
  updated_at: z.string().optional(),
  user_id: z.string(),
});

export const QuestProgressUpdateSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  objective_key: z.string().optional(),
  objective_status: z.string().optional(),
  progress_data: z.any().nullable().optional(),
  quest_id: z.string().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type QuestProgressRowInput = z.infer<typeof QuestProgressRowSchema>;
export type QuestProgressInsertInput = z.infer<typeof QuestProgressInsertSchema>;
export type QuestProgressUpdateInput = z.infer<typeof QuestProgressUpdateSchema>;
