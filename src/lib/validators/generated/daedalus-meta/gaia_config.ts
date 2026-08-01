// =====================================================
// FILE: validators/gaia_config.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// GaiaConfig SCHEMAS
// =====================================================

export const GaiaConfigRowSchema = z.object({
  api_access: z.string(),
  archived_at: z.string().nullable(),
  composite_refs: z.any().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  deity_group: z.string(),
  deity_name: z.string().nullable(),
  enum_refs: z.any().nullable(),
  family_id: z.string().nullable(),
  generation_dependencies: z.any().nullable(),
  generation_flags: z.any().nullable(),
  generation_targets: z.any().nullable(),
  human_verified_tags: z.any().nullable(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  last_seen_at: z.string().nullable(),
  log: z.any(),
  notes: z.string().nullable(),
  schema_columns_count: z.number().nullable(),
  schema_hash: z.string().nullable(),
  schema_indexes_count: z.number().nullable(),
  schema_notes: z.string().nullable(),
  schema_policies_count: z.number().nullable(),
  schema_triggers_count: z.number().nullable(),
  schema_verified_at: z.string().nullable(),
  script_id: z.string().nullable(),
  sort_order: z.number(),
  status: z.string(),
  table_name: z.string(),
  taxonomy_id: z.string().nullable(),
  taxonomy_notes: z.string().nullable(),
  template_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  visibility: z.string(),
});

export const GaiaConfigInsertSchema = z.object({
  api_access: z.string().optional(),
  archived_at: z.string().nullable().optional(),
  composite_refs: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  deity_group: z.string(),
  deity_name: z.string().nullable().optional(),
  enum_refs: z.any().nullable().optional(),
  family_id: z.string().nullable().optional(),
  generation_dependencies: z.any().nullable().optional(),
  generation_flags: z.any().nullable().optional(),
  generation_targets: z.any().nullable().optional(),
  human_verified_tags: z.any().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  notes: z.string().nullable().optional(),
  schema_columns_count: z.number().nullable().optional(),
  schema_hash: z.string().nullable().optional(),
  schema_indexes_count: z.number().nullable().optional(),
  schema_notes: z.string().nullable().optional(),
  schema_policies_count: z.number().nullable().optional(),
  schema_triggers_count: z.number().nullable().optional(),
  schema_verified_at: z.string().nullable().optional(),
  script_id: z.string().nullable().optional(),
  sort_order: z.number().optional(),
  status: z.string().optional(),
  table_name: z.string(),
  taxonomy_id: z.string().nullable().optional(),
  taxonomy_notes: z.string().nullable().optional(),
  template_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visibility: z.string().optional(),
});

export const GaiaConfigUpdateSchema = z.object({
  api_access: z.string().optional(),
  archived_at: z.string().nullable().optional(),
  composite_refs: z.any().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  deity_group: z.string().optional(),
  deity_name: z.string().nullable().optional(),
  enum_refs: z.any().nullable().optional(),
  family_id: z.string().nullable().optional(),
  generation_dependencies: z.any().nullable().optional(),
  generation_flags: z.any().nullable().optional(),
  generation_targets: z.any().nullable().optional(),
  human_verified_tags: z.any().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  notes: z.string().nullable().optional(),
  schema_columns_count: z.number().nullable().optional(),
  schema_hash: z.string().nullable().optional(),
  schema_indexes_count: z.number().nullable().optional(),
  schema_notes: z.string().nullable().optional(),
  schema_policies_count: z.number().nullable().optional(),
  schema_triggers_count: z.number().nullable().optional(),
  schema_verified_at: z.string().nullable().optional(),
  script_id: z.string().nullable().optional(),
  sort_order: z.number().optional(),
  status: z.string().optional(),
  table_name: z.string().optional(),
  taxonomy_id: z.string().nullable().optional(),
  taxonomy_notes: z.string().nullable().optional(),
  template_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visibility: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GaiaConfigRowInput = z.infer<typeof GaiaConfigRowSchema>;
export type GaiaConfigInsertInput = z.infer<typeof GaiaConfigInsertSchema>;
export type GaiaConfigUpdateInput = z.infer<typeof GaiaConfigUpdateSchema>;
