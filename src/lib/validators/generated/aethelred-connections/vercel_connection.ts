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
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  deployment_url: z.string(),
  domain_config: z.any().nullable(),
  environment_variables: z.any().nullable(),
  last_deployment_at: z.string().nullable(),
  last_deployment_id: z.string().nullable(),
  operated_by: z.string().nullable(),
  preview_urls: z.any().nullable(),
  project_id: z.string(),
  project_name: z.string(),
  updated_at: z.string().nullable(),
  vercel_connection_id: z.string(),
});

export const VercelConnectionInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  deployment_url: z.string(),
  domain_config: z.any().nullable().optional(),
  environment_variables: z.any().nullable().optional(),
  last_deployment_at: z.string().nullable().optional(),
  last_deployment_id: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  preview_urls: z.any().nullable().optional(),
  project_id: z.string(),
  project_name: z.string(),
  updated_at: z.string().nullable().optional(),
  vercel_connection_id: z.string().optional(),
});

export const VercelConnectionUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  deployment_url: z.string().optional(),
  domain_config: z.any().nullable().optional(),
  environment_variables: z.any().nullable().optional(),
  last_deployment_at: z.string().nullable().optional(),
  last_deployment_id: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  preview_urls: z.any().nullable().optional(),
  project_id: z.string().optional(),
  project_name: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  vercel_connection_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VercelConnectionRowInput = z.infer<typeof VercelConnectionRowSchema>;
export type VercelConnectionInsertInput = z.infer<typeof VercelConnectionInsertSchema>;
export type VercelConnectionUpdateInput = z.infer<typeof VercelConnectionUpdateSchema>;
