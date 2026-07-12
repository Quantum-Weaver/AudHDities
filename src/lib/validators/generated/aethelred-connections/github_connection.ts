// =====================================================
// FILE: validators/github_connection.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// GithubConnection SCHEMAS
// =====================================================

export const GithubConnectionRowSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  default_branch: z.string(),
  description: z.string().nullable(),
  enabled_workflows: z.any().nullable(),
  id: z.string(),
  is_encrypted: z.boolean(),
  last_verified_at: z.string().nullable(),
  repository_name: z.string().nullable(),
  repository_owner: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const GithubConnectionInsertSchema = z.object({
  config_key: z.string(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_branch: z.string().optional(),
  description: z.string().nullable().optional(),
  enabled_workflows: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  repository_name: z.string().nullable().optional(),
  repository_owner: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const GithubConnectionUpdateSchema = z.object({
  config_key: z.string().optional(),
  config_value: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  default_branch: z.string().optional(),
  description: z.string().nullable().optional(),
  enabled_workflows: z.any().nullable().optional(),
  id: z.string().optional(),
  is_encrypted: z.boolean().optional(),
  last_verified_at: z.string().nullable().optional(),
  repository_name: z.string().nullable().optional(),
  repository_owner: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GithubConnectionRowInput = z.infer<typeof GithubConnectionRowSchema>;
export type GithubConnectionInsertInput = z.infer<typeof GithubConnectionInsertSchema>;
export type GithubConnectionUpdateInput = z.infer<typeof GithubConnectionUpdateSchema>;
