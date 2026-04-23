// =====================================================
// FILE: validators/maintenance.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Maintenance SCHEMAS
// =====================================================

export const MaintenanceRowSchema = z.object({
  actual_end: z.string().nullable(),
  actual_start: z.string().nullable(),
  affected_systems: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  error_log: z.string().nullable(),
  id: z.string(),
  notes: z.string().nullable(),
  performed_by: z.string().nullable(),
  scheduled_end: z.string().nullable(),
  scheduled_start: z.string().nullable(),
  status: z.enum(ENUM_VALUES.maintenanceStatus).nullable(),
  title: z.string(),
  type: z.enum(ENUM_VALUES.maintenanceType),
  updated_at: z.string().nullable(),
});

export const MaintenanceInsertSchema = z.object({
  actual_end: z.string().nullable().optional(),
  actual_start: z.string().nullable().optional(),
  affected_systems: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  error_log: z.string().nullable().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  performed_by: z.string().nullable().optional(),
  scheduled_end: z.string().nullable().optional(),
  scheduled_start: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.maintenanceStatus).nullable().optional(),
  title: z.string().optional(),
  type: z.enum(ENUM_VALUES.maintenanceType).optional(),
  updated_at: z.string().nullable().optional(),
});

export const MaintenanceUpdateSchema = z.object({
  actual_end: z.string().nullable().optional(),
  actual_start: z.string().nullable().optional(),
  affected_systems: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  error_log: z.string().nullable().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  performed_by: z.string().nullable().optional(),
  scheduled_end: z.string().nullable().optional(),
  scheduled_start: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.maintenanceStatus).nullable().optional(),
  title: z.string().optional(),
  type: z.enum(ENUM_VALUES.maintenanceType).optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type MaintenanceRowInput = z.infer<typeof MaintenanceRowSchema>;
export type MaintenanceInsertInput = z.infer<typeof MaintenanceInsertSchema>;
export type MaintenanceUpdateInput = z.infer<typeof MaintenanceUpdateSchema>;
