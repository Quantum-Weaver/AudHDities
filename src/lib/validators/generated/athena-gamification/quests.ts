// =====================================================
// FILE: validators/quests.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Quests SCHEMAS
// =====================================================

export const QuestsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  difficulty: z.string().nullable(),
  display_order: z.number(),
  icon_url: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  objectives: z.any().nullable(),
  prerequisites: z.any().nullable(),
  quest_type: z.string().nullable(),
  rewards: z.any().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const QuestsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  difficulty: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  objectives: z.any().nullable().optional(),
  prerequisites: z.any().nullable().optional(),
  quest_type: z.string().nullable().optional(),
  rewards: z.any().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const QuestsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  difficulty: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  objectives: z.any().nullable().optional(),
  prerequisites: z.any().nullable().optional(),
  quest_type: z.string().nullable().optional(),
  rewards: z.any().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type QuestsRowInput = z.infer<typeof QuestsRowSchema>;
export type QuestsInsertInput = z.infer<typeof QuestsInsertSchema>;
export type QuestsUpdateInput = z.infer<typeof QuestsUpdateSchema>;
