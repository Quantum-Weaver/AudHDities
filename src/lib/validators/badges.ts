// =====================================================
// FILE: validators/badges.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Badges SCHEMAS
// =====================================================

export const BadgesRowSchema = z.object({
  badge_type: z.any(),
  color: z.string().nullable(),
  created_at: z.string().nullable(),
  description: z.string(),
  earn_condition: z.any().nullable(),
  house: z.any().nullable(),
  icon: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  rarity: z.any(),
  slug: z.string(),
  tier: z.any().nullable(),
});

export const BadgesInsertSchema = z.object({
  badge_type: z.any().optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  description: z.string().optional(),
  earn_condition: z.any().nullable().optional(),
  house: z.any().nullable().optional(),
  icon: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  rarity: z.any().optional(),
  slug: z.string().optional(),
  tier: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type BadgesRowInput = z.infer<typeof BadgesRowSchema>;
export type BadgesInsertInput = z.infer<typeof BadgesInsertSchema>;
