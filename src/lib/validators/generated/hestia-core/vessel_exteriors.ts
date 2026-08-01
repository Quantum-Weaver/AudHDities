// =====================================================
// FILE: validators/vessel_exteriors.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// VesselExteriors SCHEMAS
// =====================================================

export const VesselExteriorsRowSchema = z.object({
  accent_color: z.string().nullable(),
  background_url: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  icon_url: z.string().nullable(),
  id: z.string(),
  is_limited: z.boolean(),
  name: z.string(),
  rarity: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  theme: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const VesselExteriorsInsertSchema = z.object({
  accent_color: z.string().nullable().optional(),
  background_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_limited: z.boolean().optional(),
  name: z.string(),
  rarity: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  theme: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const VesselExteriorsUpdateSchema = z.object({
  accent_color: z.string().nullable().optional(),
  background_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_limited: z.boolean().optional(),
  name: z.string().optional(),
  rarity: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  theme: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VesselExteriorsRowInput = z.infer<typeof VesselExteriorsRowSchema>;
export type VesselExteriorsInsertInput = z.infer<typeof VesselExteriorsInsertSchema>;
export type VesselExteriorsUpdateInput = z.infer<typeof VesselExteriorsUpdateSchema>;
