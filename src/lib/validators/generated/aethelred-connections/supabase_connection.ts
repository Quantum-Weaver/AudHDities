// =====================================================
// FILE: validators/supabase_connection.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// SupabaseConnection SCHEMAS
// =====================================================

export const SupabaseConnectionRowSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  enabled_features: z.any().nullable(),
  id: z.string(),
  is_encrypted: z.boolean(),
  last_verified_at: z.string().nullable(),
  project_name: z.string().nullable(),
  project_url: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const SupabaseConnectionInsertSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_features: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  project_name: z.string().nullable().optional(),
  project_url: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SupabaseConnectionUpdateSchema = z.object({
  config_key: z.string().optional(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_features: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  project_name: z.string().nullable().optional(),
  project_url: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SupabaseConnectionRowInput = z.infer<typeof SupabaseConnectionRowSchema>;
export type SupabaseConnectionInsertInput = z.infer<typeof SupabaseConnectionInsertSchema>;
export type SupabaseConnectionUpdateInput = z.infer<typeof SupabaseConnectionUpdateSchema>;
