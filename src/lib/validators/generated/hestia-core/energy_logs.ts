// =====================================================
// FILE: validators/energy_logs.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// EnergyLogs SCHEMAS
// =====================================================

export const EnergyLogsRowSchema = z.object({
  activity: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  energy_level: z.number(),
  energy_logs_id: z.string(),
  notes: z.string().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
});

export const EnergyLogsInsertSchema = z.object({
  activity: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  energy_level: z.number(),
  energy_logs_id: z.string().optional(),
  notes: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
});

export const EnergyLogsUpdateSchema = z.object({
  activity: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  energy_level: z.number().optional(),
  energy_logs_id: z.string().optional(),
  notes: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type EnergyLogsRowInput = z.infer<typeof EnergyLogsRowSchema>;
export type EnergyLogsInsertInput = z.infer<typeof EnergyLogsInsertSchema>;
export type EnergyLogsUpdateInput = z.infer<typeof EnergyLogsUpdateSchema>;
