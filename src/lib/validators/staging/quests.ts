// =====================================================
// FILE: validators/quests.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Quests SCHEMAS
// =====================================================

export const QuestsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  house: z.any(),
  id: z.string(),
  instructions: z.string().nullable(),
  is_active: z.boolean().nullable(),
  order_index: z.number().nullable(),
  prerequisite_quest_id: z.string().nullable(),
  required_sovereignty_score: z.number().nullable(),
  residual_multiplier_bonus: z.number().nullable(),
  sovereignty_reward: z.number().nullable(),
  submission_type: z.any(),
  title: z.string(),
  updated_at: z.string().nullable(),
});

export const QuestsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  house: z.any().optional(),
  id: z.string().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  prerequisite_quest_id: z.string().nullable().optional(),
  required_sovereignty_score: z.number().nullable().optional(),
  residual_multiplier_bonus: z.number().nullable().optional(),
  sovereignty_reward: z.number().nullable().optional(),
  submission_type: z.any().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type QuestsRowInput = z.infer<typeof QuestsRowSchema>;
export type QuestsInsertInput = z.infer<typeof QuestsInsertSchema>;
