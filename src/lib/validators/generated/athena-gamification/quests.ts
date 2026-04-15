// =====================================================
// FILE: validators/generated/athena-gamification/quests.ts
// GENERATED: 2026-04-15T16:13:09.484Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Quests SCHEMAS
// =====================================================

export const QuestsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  house: z.enum(Object.values(COUNCIL_HOUSE)),
  id: z.string(),
  instructions: z.string().nullable(),
  is_active: z.boolean().nullable(),
  order_index: z.number().nullable(),
  prerequisite_quest_id: z.string().nullable(),
  required_sovereignty_score: z.number().nullable(),
  residual_multiplier_bonus: z.number().nullable(),
  sovereignty_reward: z.number().nullable(),
  submission_type: z.enum(Object.values(SUBMISSION_TYPE)),
  title: z.string(),
  updated_at: z.string().nullable(),
});

export const QuestsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).optional(),
  id: z.string().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  prerequisite_quest_id: z.string().nullable().optional(),
  required_sovereignty_score: z.number().nullable().optional(),
  residual_multiplier_bonus: z.number().nullable().optional(),
  sovereignty_reward: z.number().nullable().optional(),
  submission_type: z.enum(Object.values(SUBMISSION_TYPE)).optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

export const QuestsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).optional(),
  id: z.string().optional(),
  instructions: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  order_index: z.number().nullable().optional(),
  prerequisite_quest_id: z.string().nullable().optional(),
  required_sovereignty_score: z.number().nullable().optional(),
  residual_multiplier_bonus: z.number().nullable().optional(),
  sovereignty_reward: z.number().nullable().optional(),
  submission_type: z.enum(Object.values(SUBMISSION_TYPE)).optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type QuestsRowInput = z.infer<typeof QuestsRowSchema>;
export type QuestsInsertInput = z.infer<typeof QuestsInsertSchema>;
export type QuestsUpdateInput = z.infer<typeof QuestsUpdateSchema>;
