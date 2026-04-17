// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/script_execution_logs.ts
// GENERATED: 2026-04-17T01:35:45.331Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// ScriptExecutionLogs SCHEMAS
// =====================================================

export const ScriptExecutionLogsRowSchema = z.object({
  completed_at: z.string().nullable(),
  created_by: z.string().nullable(),
  error_message: z.string().nullable(),
  executed_by: z.string().nullable(),
  id: z.string(),
  output: z.string().nullable(),
  parameters_used: z.any().nullable(),
  script_id: z.string(),
  started_at: z.string().nullable(),
  status: z.string().nullable(),
});

export const ScriptExecutionLogsInsertSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  executed_by: z.string().nullable().optional(),
  id: z.string().optional(),
  output: z.string().nullable().optional(),
  parameters_used: z.any().nullable().optional(),
  script_id: z.string(),
  started_at: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
});

export const ScriptExecutionLogsUpdateSchema = z.object({
  completed_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  executed_by: z.string().nullable().optional(),
  id: z.string().optional(),
  output: z.string().nullable().optional(),
  parameters_used: z.any().nullable().optional(),
  script_id: z.string().optional(),
  started_at: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ScriptExecutionLogsRowInput = z.infer<typeof ScriptExecutionLogsRowSchema>;
export type ScriptExecutionLogsInsertInput = z.infer<typeof ScriptExecutionLogsInsertSchema>;
export type ScriptExecutionLogsUpdateInput = z.infer<typeof ScriptExecutionLogsUpdateSchema>;
