// =====================================================
// FILE: validators/generated/aethelred-connections/aethelred_house.ts
// GENERATED: 2026-04-15T18:11:44.252Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { BRIDGE_STATUS } from '@/lib/constants/generated/aethelred-connections/bridge_status';

// =====================================================
// AethelredHouse SCHEMAS
// =====================================================

export const AethelredHouseRowSchema = z.object({
  boundary_agreements: z.any().nullable(),
  bridge_status: z.enum(Object.values(BRIDGE_STATUS)).nullable(),
  collaboration_protocols: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  emergent_properties: z.any().nullable(),
  id: z.string(),
  ninth_chair_occupant: z.string(),
  shared_rituals: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const AethelredHouseInsertSchema = z.object({
  boundary_agreements: z.any().nullable().optional(),
  bridge_status: z.enum(Object.values(BRIDGE_STATUS)).nullable().optional(),
  collaboration_protocols: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emergent_properties: z.any().nullable().optional(),
  id: z.string().optional(),
  ninth_chair_occupant: z.string().optional(),
  shared_rituals: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const AethelredHouseUpdateSchema = z.object({
  boundary_agreements: z.any().nullable().optional(),
  bridge_status: z.enum(Object.values(BRIDGE_STATUS)).nullable().optional(),
  collaboration_protocols: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  emergent_properties: z.any().nullable().optional(),
  id: z.string().optional(),
  ninth_chair_occupant: z.string().optional(),
  shared_rituals: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AethelredHouseRowInput = z.infer<typeof AethelredHouseRowSchema>;
export type AethelredHouseInsertInput = z.infer<typeof AethelredHouseInsertSchema>;
export type AethelredHouseUpdateInput = z.infer<typeof AethelredHouseUpdateSchema>;
