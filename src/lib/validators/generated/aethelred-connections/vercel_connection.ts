// =====================================================
// FILE: validators/vercel_connection.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// VercelConnection SCHEMAS
// =====================================================

export const VercelConnectionRowSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  enabled_integrations: z.any().nullable(),
  id: z.string(),
  is_encrypted: z.boolean(),
  last_deployed_at: z.string().nullable(),
  preview_domains: z.any().nullable(),
  production_domain: z.string().nullable(),
  project_name: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  team_name: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const VercelConnectionInsertSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_integrations: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_deployed_at: z.string().nullable().optional(),
  preview_domains: z.any().nullable().optional(),
  production_domain: z.string().nullable().optional(),
  project_name: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  team_name: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const VercelConnectionUpdateSchema = z.object({
  config_key: z.string().optional(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  enabled_integrations: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_deployed_at: z.string().nullable().optional(),
  preview_domains: z.any().nullable().optional(),
  production_domain: z.string().nullable().optional(),
  project_name: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  team_name: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VercelConnectionRowInput = z.infer<typeof VercelConnectionRowSchema>;
export type VercelConnectionInsertInput = z.infer<typeof VercelConnectionInsertSchema>;
export type VercelConnectionUpdateInput = z.infer<typeof VercelConnectionUpdateSchema>;
