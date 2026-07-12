// =====================================================
// FILE: validators/vessel_rooms.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// VesselRooms SCHEMAS
// =====================================================

export const VesselRoomsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string(),
  description: z.string().nullable(),
  display_order: z.number(),
  icon_url: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  name: z.string(),
  room_type: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const VesselRoomsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string(),
  room_type: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const VesselRoomsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  name: z.string().optional(),
  room_type: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VesselRoomsRowInput = z.infer<typeof VesselRoomsRowSchema>;
export type VesselRoomsInsertInput = z.infer<typeof VesselRoomsInsertSchema>;
export type VesselRoomsUpdateInput = z.infer<typeof VesselRoomsUpdateSchema>;
