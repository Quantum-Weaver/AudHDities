// =====================================================
// FILE: validators/regions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Regions SCHEMAS
// =====================================================

export const RegionsRowSchema = z.object({
  continent_id: z.string(),
  country_code: z.string(),
  country_code_3: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  flag_emoji: z.string().nullable(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  name_localized: z.any().nullable(),
  phone_code: z.string().nullable(),
  regions_id: z.string(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const RegionsInsertSchema = z.object({
  continent_id: z.string(),
  country_code: z.string(),
  country_code_3: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  flag_emoji: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string(),
  name_localized: z.any().nullable().optional(),
  phone_code: z.string().nullable().optional(),
  regions_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const RegionsUpdateSchema = z.object({
  continent_id: z.string().optional(),
  country_code: z.string().optional(),
  country_code_3: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  flag_emoji: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  name_localized: z.any().nullable().optional(),
  phone_code: z.string().nullable().optional(),
  regions_id: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type RegionsRowInput = z.infer<typeof RegionsRowSchema>;
export type RegionsInsertInput = z.infer<typeof RegionsInsertSchema>;
export type RegionsUpdateInput = z.infer<typeof RegionsUpdateSchema>;
