// =====================================================
// FILE: validators/admin_actions.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// AdminActions SCHEMAS
// =====================================================

export const AdminActionsRowSchema = z.object({
  action_type: z.string(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  metadata: z.any().nullable(),
  taken_at: z.string(),
  taken_by: z.string().nullable(),
  target_entity_id: z.string().nullable(),
  target_entity_type: z.string().nullable(),
  target_sovereign_id: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const AdminActionsInsertSchema = z.object({
  action_type: z.string(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  taken_at: z.string().optional(),
  taken_by: z.string().nullable().optional(),
  target_entity_id: z.string().nullable().optional(),
  target_entity_type: z.string().nullable().optional(),
  target_sovereign_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const AdminActionsUpdateSchema = z.object({
  action_type: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  metadata: z.any().nullable().optional(),
  taken_at: z.string().optional(),
  taken_by: z.string().nullable().optional(),
  target_entity_id: z.string().nullable().optional(),
  target_entity_type: z.string().nullable().optional(),
  target_sovereign_id: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AdminActionsRowInput = z.infer<typeof AdminActionsRowSchema>;
export type AdminActionsInsertInput = z.infer<typeof AdminActionsInsertSchema>;
export type AdminActionsUpdateInput = z.infer<typeof AdminActionsUpdateSchema>;
