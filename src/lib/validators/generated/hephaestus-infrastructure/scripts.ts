// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/scripts.ts
// GENERATED: 2026-04-15T01:41:08.152Z
// SOURCE: database.types.ts
// =====================================================

import type { ScriptType } from '@/lib/constants/generated/hephaestus-infrastructure/script_type';
import z from 'zod';

// =====================================================
// Scripts SCHEMAS
// =====================================================

export const ScriptsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_production_safe: z.boolean().nullable(),
  last_result: z.string().nullable(),
  last_run: z.string().nullable(),
  name: z.string(),
  parameters: z.any().nullable(),
  path: z.string(),
  requires_approval: z.boolean().nullable(),
  run_count: z.number().nullable(),
  type: z.enum(Object.values('ScriptType')),
  updated_at: z.string().nullable(),
});

export const ScriptsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_production_safe: z.boolean().nullable().optional(),
  last_result: z.string().nullable().optional(),
  last_run: z.string().nullable().optional(),
  name: z.string().optional(),
  parameters: z.any().nullable().optional(),
  path: z.string().optional(),
  requires_approval: z.boolean().nullable().optional(),
  run_count: z.number().nullable().optional(),
  type: z.enum(Object.values('ScriptType')).optional(),
  updated_at: z.string().nullable().optional(),
});

export const ScriptsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_production_safe: z.boolean().nullable().optional(),
  last_result: z.string().nullable().optional(),
  last_run: z.string().nullable().optional(),
  name: z.string().optional(),
  parameters: z.any().nullable().optional(),
  path: z.string().optional(),
  requires_approval: z.boolean().nullable().optional(),
  run_count: z.number().nullable().optional(),
  type: z.enum(Object.values('ScriptType')).optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ScriptsRowInput = z.infer<typeof ScriptsRowSchema>;
export type ScriptsInsertInput = z.infer<typeof ScriptsInsertSchema>;
export type ScriptsUpdateInput = z.infer<typeof ScriptsUpdateSchema>;
