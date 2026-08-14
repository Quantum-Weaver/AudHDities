// =====================================================
// FILE: validators/gaia_generation_log.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// GaiaGenerationLog SCHEMAS
// =====================================================

export const GaiaGenerationLogRowSchema = z.object({
  created_at: z.string(),
  errors: z.any().nullable(),
  files_created: z.any().nullable(),
  gaia_config_id: z.string().nullable(),
  generated_at: z.string(),
  generation_type: z.string(),
  id: z.string(),
  script_id: z.string().nullable(),
  status: z.string(),
  table_name: z.string(),
  taxonomy_id: z.string().nullable(),
  types_count: z.number().nullable(),
});

export const GaiaGenerationLogInsertSchema = z.object({
  created_at: z.string().optional(),
  errors: z.any().nullable().optional(),
  files_created: z.any().nullable().optional(),
  gaia_config_id: z.string().nullable().optional(),
  generated_at: z.string().optional(),
  generation_type: z.string(),
  id: z.string().optional(),
  script_id: z.string().nullable().optional(),
  status: z.string().optional(),
  table_name: z.string(),
  taxonomy_id: z.string().nullable().optional(),
  types_count: z.number().nullable().optional(),
});

export const GaiaGenerationLogUpdateSchema = z.object({
  created_at: z.string().optional(),
  errors: z.any().nullable().optional(),
  files_created: z.any().nullable().optional(),
  gaia_config_id: z.string().nullable().optional(),
  generated_at: z.string().optional(),
  generation_type: z.string().optional(),
  id: z.string().optional(),
  script_id: z.string().nullable().optional(),
  status: z.string().optional(),
  table_name: z.string().optional(),
  taxonomy_id: z.string().nullable().optional(),
  types_count: z.number().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GaiaGenerationLogRowInput = z.infer<typeof GaiaGenerationLogRowSchema>;
export type GaiaGenerationLogInsertInput = z.infer<typeof GaiaGenerationLogInsertSchema>;
export type GaiaGenerationLogUpdateInput = z.infer<typeof GaiaGenerationLogUpdateSchema>;
