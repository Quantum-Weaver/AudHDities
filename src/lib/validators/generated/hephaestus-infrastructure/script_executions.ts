// =====================================================
// FILE: validators/script_executions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// ScriptExecutions SCHEMAS
// =====================================================

export const ScriptExecutionsRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_at: z.string(),
  duration_ms: z.number().nullable(),
  executed_by: z.string().nullable(),
  id: z.string(),
  parameters: z.any().nullable(),
  result: z.any().nullable(),
  script_id: z.string().nullable(),
  started_at: z.string(),
  status: z.string(),
});

export const ScriptExecutionsInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  duration_ms: z.number().nullable().optional(),
  executed_by: z.string().nullable().optional(),
  id: z.string().optional(),
  parameters: z.any().nullable().optional(),
  result: z.any().nullable().optional(),
  script_id: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.string().optional(),
});

export const ScriptExecutionsUpdateSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  duration_ms: z.number().nullable().optional(),
  executed_by: z.string().nullable().optional(),
  id: z.string().optional(),
  parameters: z.any().nullable().optional(),
  result: z.any().nullable().optional(),
  script_id: z.string().nullable().optional(),
  started_at: z.string().optional(),
  status: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ScriptExecutionsRowInput = z.infer<typeof ScriptExecutionsRowSchema>;
export type ScriptExecutionsInsertInput = z.infer<typeof ScriptExecutionsInsertSchema>;
export type ScriptExecutionsUpdateInput = z.infer<typeof ScriptExecutionsUpdateSchema>;
