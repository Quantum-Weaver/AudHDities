// =====================================================
// FILE: validators/admin_logs.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// AdminLogs SCHEMAS
// =====================================================

export const AdminLogsRowSchema = z.object({
  action: z.string(),
  action_category: z.enum(ENUM_VALUES.adminLogCategory),
  admin_id: z.string(),
  admin_logs_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  error_message: z.string().nullable(),
  ip_address: z.any(),
  is_public: z.boolean().nullable(),
  metadata: z.any().nullable(),
  new_state: z.any().nullable(),
  previous_state: z.any().nullable(),
  public_note: z.string().nullable(),
  reason: z.string().nullable(),
  success: z.boolean().nullable(),
  target_id: z.string().nullable(),
  target_identifier: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_agent: z.string().nullable(),
});

export const AdminLogsInsertSchema = z.object({
  action: z.string(),
  action_category: z.enum(ENUM_VALUES.adminLogCategory),
  admin_id: z.string(),
  admin_logs_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  ip_address: z.any().optional(),
  is_public: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  new_state: z.any().nullable().optional(),
  previous_state: z.any().nullable().optional(),
  public_note: z.string().nullable().optional(),
  reason: z.string().nullable().optional(),
  success: z.boolean().nullable().optional(),
  target_id: z.string().nullable().optional(),
  target_identifier: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
});

export const AdminLogsUpdateSchema = z.object({
  action: z.string().optional(),
  action_category: z.enum(ENUM_VALUES.adminLogCategory).optional(),
  admin_id: z.string().optional(),
  admin_logs_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  ip_address: z.any().optional(),
  is_public: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  new_state: z.any().nullable().optional(),
  previous_state: z.any().nullable().optional(),
  public_note: z.string().nullable().optional(),
  reason: z.string().nullable().optional(),
  success: z.boolean().nullable().optional(),
  target_id: z.string().nullable().optional(),
  target_identifier: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AdminLogsRowInput = z.infer<typeof AdminLogsRowSchema>;
export type AdminLogsInsertInput = z.infer<typeof AdminLogsInsertSchema>;
export type AdminLogsUpdateInput = z.infer<typeof AdminLogsUpdateSchema>;
