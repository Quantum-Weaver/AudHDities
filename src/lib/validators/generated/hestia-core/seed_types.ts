// =====================================================
// FILE: validators/seed_types.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// SeedTypes SCHEMAS
// =====================================================

export const SeedTypesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_order: z.number(),
  growth_duration: z.string().nullable(),
  harvest_rewards: z.any().nullable(),
  icon_url: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  rarity: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const SeedTypesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  growth_duration: z.string().nullable().optional(),
  harvest_rewards: z.any().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  rarity: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SeedTypesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  growth_duration: z.string().nullable().optional(),
  harvest_rewards: z.any().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  rarity: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SeedTypesRowInput = z.infer<typeof SeedTypesRowSchema>;
export type SeedTypesInsertInput = z.infer<typeof SeedTypesInsertSchema>;
export type SeedTypesUpdateInput = z.infer<typeof SeedTypesUpdateSchema>;
