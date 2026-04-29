// =====================================================
// FILE: validators/system_health_logs.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// SystemHealthLogs SCHEMAS
// =====================================================

export const SystemHealthLogsRowSchema = z.object({
  checked_at: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  error_message: z.string().nullable(),
  id: z.string(),
  response_time_ms: z.number().nullable(),
  status: z.enum(ENUM_VALUES.systemStatus),
  system_id: z.string(),
});

export const SystemHealthLogsInsertSchema = z.object({
  checked_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  response_time_ms: z.number().nullable().optional(),
  status: z.enum(ENUM_VALUES.systemStatus),
  system_id: z.string(),
});

export const SystemHealthLogsUpdateSchema = z.object({
  checked_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
  response_time_ms: z.number().nullable().optional(),
  status: z.enum(ENUM_VALUES.systemStatus).optional(),
  system_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SystemHealthLogsRowInput = z.infer<typeof SystemHealthLogsRowSchema>;
export type SystemHealthLogsInsertInput = z.infer<typeof SystemHealthLogsInsertSchema>;
export type SystemHealthLogsUpdateInput = z.infer<typeof SystemHealthLogsUpdateSchema>;
