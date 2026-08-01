// =====================================================
// FILE: validators/personas.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Personas SCHEMAS
// =====================================================

export const PersonasRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_order: z.number(),
  icon_url: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  persona_type: z.string().nullable(),
  sample_phrases: z.any().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  tone: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  voice_characteristics: z.any().nullable(),
});

export const PersonasInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  persona_type: z.string().nullable().optional(),
  sample_phrases: z.any().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tone: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  voice_characteristics: z.any().nullable().optional(),
});

export const PersonasUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  persona_type: z.string().nullable().optional(),
  sample_phrases: z.any().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tone: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  voice_characteristics: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PersonasRowInput = z.infer<typeof PersonasRowSchema>;
export type PersonasInsertInput = z.infer<typeof PersonasInsertSchema>;
export type PersonasUpdateInput = z.infer<typeof PersonasUpdateSchema>;
