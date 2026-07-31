// =====================================================
// FILE: validators/mythology.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Mythology SCHEMAS
// =====================================================

export const MythologyRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_order: z.number(),
  icon_url: z.string().nullable(),
  id: z.string(),
  myth_type: z.string().nullable(),
  name: z.string(),
  related_entity: z.string().nullable(),
  related_entity_type: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  story: z.string().nullable(),
  teachings: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const MythologyInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  myth_type: z.string().nullable().optional(),
  name: z.string(),
  related_entity: z.string().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  story: z.string().nullable().optional(),
  teachings: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const MythologyUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  myth_type: z.string().nullable().optional(),
  name: z.string().optional(),
  related_entity: z.string().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  story: z.string().nullable().optional(),
  teachings: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type MythologyRowInput = z.infer<typeof MythologyRowSchema>;
export type MythologyInsertInput = z.infer<typeof MythologyInsertSchema>;
export type MythologyUpdateInput = z.infer<typeof MythologyUpdateSchema>;
