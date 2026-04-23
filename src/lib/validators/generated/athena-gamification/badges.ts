// =====================================================
// FILE: validators/badges.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Badges SCHEMAS
// =====================================================

export const BadgesRowSchema = z.object({
  badge_type: z.enum(ENUM_VALUES.badgeType),
  color: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  earn_condition: z.any().nullable(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable(),
  icon: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  rarity: z.enum(ENUM_VALUES.badgeRarity),
  slug: z.string(),
  tier: z.enum(ENUM_VALUES.badgeTier).nullable(),
});

export const BadgesInsertSchema = z.object({
  badge_type: z.enum(ENUM_VALUES.badgeType).optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  earn_condition: z.any().nullable().optional(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  icon: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  rarity: z.enum(ENUM_VALUES.badgeRarity).optional(),
  slug: z.string().optional(),
  tier: z.enum(ENUM_VALUES.badgeTier).nullable().optional(),
});

export const BadgesUpdateSchema = z.object({
  badge_type: z.enum(ENUM_VALUES.badgeType).optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  earn_condition: z.any().nullable().optional(),
  house: z.enum(ENUM_VALUES.councilHouse).nullable().optional(),
  icon: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  rarity: z.enum(ENUM_VALUES.badgeRarity).optional(),
  slug: z.string().optional(),
  tier: z.enum(ENUM_VALUES.badgeTier).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type BadgesRowInput = z.infer<typeof BadgesRowSchema>;
export type BadgesInsertInput = z.infer<typeof BadgesInsertSchema>;
export type BadgesUpdateInput = z.infer<typeof BadgesUpdateSchema>;
