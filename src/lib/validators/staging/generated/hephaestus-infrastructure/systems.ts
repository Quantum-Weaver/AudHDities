// =====================================================
// FILE: validators/systems.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Systems SCHEMAS
// =====================================================

export const SystemsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  dependencies: z.any().nullable(),
  description: z.string().nullable(),
  health_check_url: z.string().nullable(),
  id: z.string(),
  last_health_check: z.string().nullable(),
  last_incident: z.string().nullable(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.systemStatus).nullable(),
  type: z.enum(ENUM_VALUES.systemType),
  updated_at: z.string().nullable(),
  uptime_percent: z.number().nullable(),
  version: z.string().nullable(),
});

export const SystemsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  description: z.string().nullable().optional(),
  health_check_url: z.string().nullable().optional(),
  id: z.string().optional(),
  last_health_check: z.string().nullable().optional(),
  last_incident: z.string().nullable().optional(),
  name: z.string(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.systemStatus).nullable().optional(),
  type: z.enum(ENUM_VALUES.systemType),
  updated_at: z.string().nullable().optional(),
  uptime_percent: z.number().nullable().optional(),
  version: z.string().nullable().optional(),
});

export const SystemsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  dependencies: z.any().nullable().optional(),
  description: z.string().nullable().optional(),
  health_check_url: z.string().nullable().optional(),
  id: z.string().optional(),
  last_health_check: z.string().nullable().optional(),
  last_incident: z.string().nullable().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.systemStatus).nullable().optional(),
  type: z.enum(ENUM_VALUES.systemType).optional(),
  updated_at: z.string().nullable().optional(),
  uptime_percent: z.number().nullable().optional(),
  version: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SystemsRowInput = z.infer<typeof SystemsRowSchema>;
export type SystemsInsertInput = z.infer<typeof SystemsInsertSchema>;
export type SystemsUpdateInput = z.infer<typeof SystemsUpdateSchema>;
