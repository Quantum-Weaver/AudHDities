// =====================================================
// FILE: validators/admin_logs.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// AdminLogs SCHEMAS
// =====================================================

export const AdminLogsRowSchema = z.object({
  action: z.string(),
  action_category: z.any(),
  admin_id: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  error_message: z.string().nullable(),
  id: z.string(),
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
  user_agent: z.string().nullable(),
});

export const AdminLogsInsertSchema = z.object({
  action: z.string().optional(),
  action_category: z.any().optional(),
  admin_id: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  id: z.string().optional(),
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
  user_agent: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AdminLogsRowInput = z.infer<typeof AdminLogsRowSchema>;
export type AdminLogsInsertInput = z.infer<typeof AdminLogsInsertSchema>;
