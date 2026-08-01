// =====================================================
// FILE: validators/vessel_companions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// VesselCompanions SCHEMAS
// =====================================================

export const VesselCompanionsRowSchema = z.object({
  accent_color: z.string().nullable(),
  animation_url: z.string().nullable(),
  avatar_url: z.string().nullable(),
  behaviors: z.any().nullable(),
  companion_type: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  current_room_id: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  name: z.string(),
  personality: z.string().nullable(),
  species: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const VesselCompanionsInsertSchema = z.object({
  accent_color: z.string().nullable().optional(),
  animation_url: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  behaviors: z.any().nullable().optional(),
  companion_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  current_room_id: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string(),
  personality: z.string().nullable().optional(),
  species: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const VesselCompanionsUpdateSchema = z.object({
  accent_color: z.string().nullable().optional(),
  animation_url: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  behaviors: z.any().nullable().optional(),
  companion_type: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  current_room_id: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  personality: z.string().nullable().optional(),
  species: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VesselCompanionsRowInput = z.infer<typeof VesselCompanionsRowSchema>;
export type VesselCompanionsInsertInput = z.infer<typeof VesselCompanionsInsertSchema>;
export type VesselCompanionsUpdateInput = z.infer<typeof VesselCompanionsUpdateSchema>;
