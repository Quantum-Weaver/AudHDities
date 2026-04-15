// =====================================================
// FILE: validators/generated/aethelred-connections/aethelred_house.ts
// GENERATED: 2026-04-15T01:18:39.281Z
// SOURCE: database.types.ts
// =====================================================

import type { BridgeStatus } from '@/lib/constants/generated/aethelred-connections/bridge_status';
import z from 'zod';

// =====================================================
// AethelredHouse SCHEMAS
// =====================================================

export const AethelredHouseRowSchema = z.object({
  boundary_agreements: z.any().nullable(),
  bridge_status: z.enum(Object.values('BridgeStatus')).nullable(),
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
  bridge_status: z.enum(Object.values('BridgeStatus')).nullable().optional(),
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
  bridge_status: z.enum(Object.values('BridgeStatus')).nullable().optional(),
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
