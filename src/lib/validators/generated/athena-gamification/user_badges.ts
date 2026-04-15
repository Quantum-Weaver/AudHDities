// =====================================================
// FILE: validators/generated/athena-gamification/user_badges.ts
// GENERATED: 2026-04-15T19:06:11.605Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// UserBadges SCHEMAS
// =====================================================

export const UserBadgesRowSchema = z.object({
  badge_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  display_on_profile: z.boolean().nullable(),
  earned_at: z.string().nullable(),
  earned_reason: z.string().nullable(),
  id: z.string(),
  user_id: z.string(),
});

export const UserBadgesInsertSchema = z.object({
  badge_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  display_on_profile: z.boolean().nullable().optional(),
  earned_at: z.string().nullable().optional(),
  earned_reason: z.string().nullable().optional(),
  id: z.string().optional(),
  user_id: z.string().optional(),
});

export const UserBadgesUpdateSchema = z.object({
  badge_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  display_on_profile: z.boolean().nullable().optional(),
  earned_at: z.string().nullable().optional(),
  earned_reason: z.string().nullable().optional(),
  id: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserBadgesRowInput = z.infer<typeof UserBadgesRowSchema>;
export type UserBadgesInsertInput = z.infer<typeof UserBadgesInsertSchema>;
export type UserBadgesUpdateInput = z.infer<typeof UserBadgesUpdateSchema>;
