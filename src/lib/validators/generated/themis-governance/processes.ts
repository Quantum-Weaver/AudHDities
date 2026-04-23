// =====================================================
// FILE: validators/processes.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

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
  process_type: z.enum(ENUM_VALUES.processType),
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
  process_type: z.enum(ENUM_VALUES.processType),
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
  process_type: z.enum(ENUM_VALUES.processType).optional(),
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
