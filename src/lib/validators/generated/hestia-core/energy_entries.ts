// =====================================================
// FILE: validators/energy_entries.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// EnergyEntries SCHEMAS
// =====================================================

export const EnergyEntriesRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string(),
  energy_level: z.number().nullable(),
  id: z.string(),
  logged_at: z.string(),
  mood: z.string().nullable(),
  mood_tags: z.any().nullable(),
  notes: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  visibility: z.string(),
});

export const EnergyEntriesInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string(),
  energy_level: z.number().nullable().optional(),
  id: z.string().optional(),
  logged_at: z.string().optional(),
  mood: z.string().nullable().optional(),
  mood_tags: z.any().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visibility: z.string().optional(),
});

export const EnergyEntriesUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  energy_level: z.number().nullable().optional(),
  id: z.string().optional(),
  logged_at: z.string().optional(),
  mood: z.string().nullable().optional(),
  mood_tags: z.any().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visibility: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EnergyEntriesRowInput = z.infer<typeof EnergyEntriesRowSchema>;
export type EnergyEntriesInsertInput = z.infer<typeof EnergyEntriesInsertSchema>;
export type EnergyEntriesUpdateInput = z.infer<typeof EnergyEntriesUpdateSchema>;
