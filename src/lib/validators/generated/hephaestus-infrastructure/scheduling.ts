// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/scheduling.ts
// GENERATED: 2026-04-17T01:35:45.329Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { JOB_STATUS } from '@/lib/constants/generated/hephaestus-infrastructure/job_status';
import { JOB_TYPE } from '@/lib/constants/generated/hephaestus-infrastructure/job_type';

// =====================================================
// Scheduling SCHEMAS
// =====================================================

export const SchedulingRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  error_message: z.string().nullable(),
  function_name: z.string(),
  id: z.string(),
  job_type: z.enum(Object.values(JOB_TYPE)),
  last_result: z.string().nullable(),
  last_run: z.string().nullable(),
  max_retries: z.number().nullable(),
  name: z.string(),
  next_run: z.string().nullable(),
  parameters: z.any().nullable(),
  retry_count: z.number().nullable(),
  run_at: z.string().nullable(),
  schedule: z.string().nullable(),
  status: z.enum(Object.values(JOB_STATUS)).nullable(),
  updated_at: z.string().nullable(),
});

export const SchedulingInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  function_name: z.string(),
  id: z.string().optional(),
  job_type: z.enum(Object.values(JOB_TYPE)),
  last_result: z.string().nullable().optional(),
  last_run: z.string().nullable().optional(),
  max_retries: z.number().nullable().optional(),
  name: z.string(),
  next_run: z.string().nullable().optional(),
  parameters: z.any().nullable().optional(),
  retry_count: z.number().nullable().optional(),
  run_at: z.string().nullable().optional(),
  schedule: z.string().nullable().optional(),
  status: z.enum(Object.values(JOB_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const SchedulingUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  function_name: z.string().optional(),
  id: z.string().optional(),
  job_type: z.enum(Object.values(JOB_TYPE)).optional(),
  last_result: z.string().nullable().optional(),
  last_run: z.string().nullable().optional(),
  max_retries: z.number().nullable().optional(),
  name: z.string().optional(),
  next_run: z.string().nullable().optional(),
  parameters: z.any().nullable().optional(),
  retry_count: z.number().nullable().optional(),
  run_at: z.string().nullable().optional(),
  schedule: z.string().nullable().optional(),
  status: z.enum(Object.values(JOB_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SchedulingRowInput = z.infer<typeof SchedulingRowSchema>;
export type SchedulingInsertInput = z.infer<typeof SchedulingInsertSchema>;
export type SchedulingUpdateInput = z.infer<typeof SchedulingUpdateSchema>;
