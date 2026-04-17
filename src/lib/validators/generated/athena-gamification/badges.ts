// =====================================================
// FILE: validators/generated/athena-gamification/badges.ts
// GENERATED: 2026-04-17T20:52:30.901Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { BADGE_RARITY } from '@/lib/constants/generated/athena-gamification/badge_rarity';
import { BADGE_TIER } from '@/lib/constants/generated/athena-gamification/badge_tier';
import { BADGE_TYPE } from '@/lib/constants/generated/athena-gamification/badge_type';
import { COUNCIL_HOUSE } from '@/lib/constants/generated/athena-gamification/council_house';

// =====================================================
// Badges SCHEMAS
// =====================================================

export const BadgesRowSchema = z.object({
  badge_type: z.enum(Object.values(BADGE_TYPE)),
  color: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  earn_condition: z.any().nullable(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  icon: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  rarity: z.enum(Object.values(BADGE_RARITY)),
  slug: z.string(),
  tier: z.enum(Object.values(BADGE_TIER)).nullable(),
});

export const BadgesInsertSchema = z.object({
  badge_type: z.enum(Object.values(BADGE_TYPE)),
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string(),
  earn_condition: z.any().nullable().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  icon: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string(),
  rarity: z.enum(Object.values(BADGE_RARITY)).optional(),
  slug: z.string(),
  tier: z.enum(Object.values(BADGE_TIER)).nullable().optional(),
});

export const BadgesUpdateSchema = z.object({
  badge_type: z.enum(Object.values(BADGE_TYPE)).optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  earn_condition: z.any().nullable().optional(),
  house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  icon: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  rarity: z.enum(Object.values(BADGE_RARITY)).optional(),
  slug: z.string().optional(),
  tier: z.enum(Object.values(BADGE_TIER)).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type BadgesRowInput = z.infer<typeof BadgesRowSchema>;
export type BadgesInsertInput = z.infer<typeof BadgesInsertSchema>;
export type BadgesUpdateInput = z.infer<typeof BadgesUpdateSchema>;
