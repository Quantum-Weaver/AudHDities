// =====================================================
// FILE: validators/council_houses.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// CouncilHouses SCHEMAS
// =====================================================

export const CouncilHousesRowSchema = z.object({
  adept_quest: z.string().nullable(),
  color: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  display_name: z.string(),
  emoji: z.string(),
  id: z.string(),
  initiate_quest: z.string().nullable(),
  is_active: z.boolean().nullable(),
  master_quest: z.string().nullable(),
  name: z.string(),
  order_index: z.number(),
  primary_domain: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const CouncilHousesInsertSchema = z.object({
  adept_quest: z.string().nullable().optional(),
  color: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  display_name: z.string().optional(),
  emoji: z.string().optional(),
  id: z.string().optional(),
  initiate_quest: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  master_quest: z.string().nullable().optional(),
  name: z.string().optional(),
  order_index: z.number().optional(),
  primary_domain: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const CouncilHousesUpdateSchema = z.object({
  adept_quest: z.string().nullable().optional(),
  color: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  display_name: z.string().optional(),
  emoji: z.string().optional(),
  id: z.string().optional(),
  initiate_quest: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  master_quest: z.string().nullable().optional(),
  name: z.string().optional(),
  order_index: z.number().optional(),
  primary_domain: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CouncilHousesRowInput = z.infer<typeof CouncilHousesRowSchema>;
export type CouncilHousesInsertInput = z.infer<typeof CouncilHousesInsertSchema>;
export type CouncilHousesUpdateInput = z.infer<typeof CouncilHousesUpdateSchema>;
