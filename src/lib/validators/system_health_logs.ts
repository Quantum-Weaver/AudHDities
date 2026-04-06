// =====================================================
// FILE: validators/system_health_logs.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// SystemHealthLogs SCHEMAS
// =====================================================

export const SystemHealthLogsRowSchema = z.object({
  checked_at: z.string().nullable(),
  error_message: z.string().nullable(),
  id: z.string(),
  response_time_ms: z.number().nullable(),
  status: z.any(),
  system_id: z.string(),
});

export const SystemHealthLogsInsertSchema = z.object({
  checked_at: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  response_time_ms: z.number().nullable().optional(),
  status: z.any().optional(),
  system_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SystemHealthLogsRowInput = z.infer<typeof SystemHealthLogsRowSchema>;
export type SystemHealthLogsInsertInput = z.infer<typeof SystemHealthLogsInsertSchema>;
