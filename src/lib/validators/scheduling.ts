// =====================================================
// FILE: validators/scheduling.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Scheduling SCHEMAS
// =====================================================

export const SchedulingRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  error_message: z.string().nullable(),
  function_name: z.string(),
  id: z.string(),
  job_type: z.any(),
  last_result: z.string().nullable(),
  last_run: z.string().nullable(),
  max_retries: z.number().nullable(),
  name: z.string(),
  next_run: z.string().nullable(),
  parameters: z.any().nullable(),
  retry_count: z.number().nullable(),
  run_at: z.string().nullable(),
  schedule: z.string().nullable(),
  status: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const SchedulingInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  function_name: z.string().optional(),
  id: z.string().optional(),
  job_type: z.any().optional(),
  last_result: z.string().nullable().optional(),
  last_run: z.string().nullable().optional(),
  max_retries: z.number().nullable().optional(),
  name: z.string().optional(),
  next_run: z.string().nullable().optional(),
  parameters: z.any().nullable().optional(),
  retry_count: z.number().nullable().optional(),
  run_at: z.string().nullable().optional(),
  schedule: z.string().nullable().optional(),
  status: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SchedulingRowInput = z.infer<typeof SchedulingRowSchema>;
export type SchedulingInsertInput = z.infer<typeof SchedulingInsertSchema>;
