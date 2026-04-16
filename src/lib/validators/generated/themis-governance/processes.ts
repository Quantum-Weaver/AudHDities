// =====================================================
// FILE: validators/generated/themis-governance/processes.ts
// GENERATED: 2026-04-16T23:20:33.897Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { PROCESS_TYPE } from '@/lib/constants/generated/themis-governance/process_type';

// =====================================================
// Processes SCHEMAS
// =====================================================

export const ProcessesRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  process_type: z.enum(Object.values(PROCESS_TYPE)),
  slug: z.string(),
  steps: z.any(),
  timeout_days: z.number().nullable(),
  updated_at: z.string().nullable(),
});

export const ProcessesInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string(),
  process_type: z.enum(Object.values(PROCESS_TYPE)),
  slug: z.string(),
  steps: z.any(),
  timeout_days: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const ProcessesUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  process_type: z.enum(Object.values(PROCESS_TYPE)).optional(),
  slug: z.string().optional(),
  steps: z.any().optional(),
  timeout_days: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProcessesRowInput = z.infer<typeof ProcessesRowSchema>;
export type ProcessesInsertInput = z.infer<typeof ProcessesInsertSchema>;
export type ProcessesUpdateInput = z.infer<typeof ProcessesUpdateSchema>;
