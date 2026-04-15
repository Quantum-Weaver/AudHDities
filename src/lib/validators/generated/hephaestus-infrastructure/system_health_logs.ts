// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/system_health_logs.ts
// GENERATED: 2026-04-15T16:13:09.498Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// SystemHealthLogs SCHEMAS
// =====================================================

export const SystemHealthLogsRowSchema = z.object({
  checked_at: z.string().nullable(),
  created_by: z.string().nullable(),
  error_message: z.string().nullable(),
  id: z.string(),
  response_time_ms: z.number().nullable(),
  status: z.enum(Object.values(SYSTEM_STATUS)),
  system_id: z.string(),
});

export const SystemHealthLogsInsertSchema = z.object({
  checked_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  response_time_ms: z.number().nullable().optional(),
  status: z.enum(Object.values(SYSTEM_STATUS)).optional(),
  system_id: z.string().optional(),
});

export const SystemHealthLogsUpdateSchema = z.object({
  checked_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  response_time_ms: z.number().nullable().optional(),
  status: z.enum(Object.values(SYSTEM_STATUS)).optional(),
  system_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SystemHealthLogsRowInput = z.infer<typeof SystemHealthLogsRowSchema>;
export type SystemHealthLogsInsertInput = z.infer<typeof SystemHealthLogsInsertSchema>;
export type SystemHealthLogsUpdateInput = z.infer<typeof SystemHealthLogsUpdateSchema>;
