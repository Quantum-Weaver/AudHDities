// =====================================================
// FILE: validators/badge_award_triggers.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// BadgeAwardTriggers SCHEMAS
// =====================================================

export const BadgeAwardTriggersRowSchema = z.object({
  badge_award_triggers_id: z.string(),
  badge_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  is_active: z.boolean().nullable(),
  trigger_config: z.any(),
  trigger_type: z.string(),
  updated_at: z.string().nullable(),
});

export const BadgeAwardTriggersInsertSchema = z.object({
  badge_award_triggers_id: z.string().optional(),
  badge_id: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  trigger_config: z.any(),
  trigger_type: z.string(),
  updated_at: z.string().nullable().optional(),
});

export const BadgeAwardTriggersUpdateSchema = z.object({
  badge_award_triggers_id: z.string().optional(),
  badge_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  trigger_config: z.any().optional(),
  trigger_type: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type BadgeAwardTriggersRowInput = z.infer<typeof BadgeAwardTriggersRowSchema>;
export type BadgeAwardTriggersInsertInput = z.infer<typeof BadgeAwardTriggersInsertSchema>;
export type BadgeAwardTriggersUpdateInput = z.infer<typeof BadgeAwardTriggersUpdateSchema>;
