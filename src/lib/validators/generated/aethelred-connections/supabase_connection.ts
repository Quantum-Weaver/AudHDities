// =====================================================
// FILE: validators/generated/aethelred-connections/supabase_connection.ts
// GENERATED: 2026-04-15T18:11:44.424Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// SupabaseConnection SCHEMAS
// =====================================================

export const SupabaseConnectionRowSchema = z.object({
  api_keys: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  edge_functions: z.any().nullable(),
  id: z.string(),
  last_health_check: z.string().nullable(),
  last_migration_at: z.string().nullable(),
  migrations_applied: z.any().nullable(),
  operated_by: z.string().nullable(),
  project_id: z.string(),
  project_url: z.string(),
  schema_version: z.string(),
  storage_buckets: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const SupabaseConnectionInsertSchema = z.object({
  api_keys: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  edge_functions: z.any().nullable().optional(),
  id: z.string().optional(),
  last_health_check: z.string().nullable().optional(),
  last_migration_at: z.string().nullable().optional(),
  migrations_applied: z.any().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  project_id: z.string().optional(),
  project_url: z.string().optional(),
  schema_version: z.string().optional(),
  storage_buckets: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const SupabaseConnectionUpdateSchema = z.object({
  api_keys: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  edge_functions: z.any().nullable().optional(),
  id: z.string().optional(),
  last_health_check: z.string().nullable().optional(),
  last_migration_at: z.string().nullable().optional(),
  migrations_applied: z.any().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  project_id: z.string().optional(),
  project_url: z.string().optional(),
  schema_version: z.string().optional(),
  storage_buckets: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SupabaseConnectionRowInput = z.infer<typeof SupabaseConnectionRowSchema>;
export type SupabaseConnectionInsertInput = z.infer<typeof SupabaseConnectionInsertSchema>;
export type SupabaseConnectionUpdateInput = z.infer<typeof SupabaseConnectionUpdateSchema>;
