// =====================================================
// FILE: validators/notifications.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Notifications SCHEMAS
// =====================================================

export const NotificationsRowSchema = z.object({
  action_label: z.string().nullable(),
  action_url: z.string().nullable(),
  body: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  is_read: z.boolean().nullable(),
  metadata: z.any().nullable(),
  notifications_id: z.string(),
  read_at: z.string().nullable(),
  related_entity_id: z.string().nullable(),
  related_entity_type: z.string().nullable(),
  title: z.string(),
  type: z.enum(ENUM_VALUES.notificationType),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
});

export const NotificationsInsertSchema = z.object({
  action_label: z.string().nullable().optional(),
  action_url: z.string().nullable().optional(),
  body: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  is_read: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  notifications_id: z.string().optional(),
  read_at: z.string().nullable().optional(),
  related_entity_id: z.string().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  title: z.string(),
  type: z.enum(ENUM_VALUES.notificationType),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
});

export const NotificationsUpdateSchema = z.object({
  action_label: z.string().nullable().optional(),
  action_url: z.string().nullable().optional(),
  body: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  is_read: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  notifications_id: z.string().optional(),
  read_at: z.string().nullable().optional(),
  related_entity_id: z.string().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  title: z.string().optional(),
  type: z.enum(ENUM_VALUES.notificationType).optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type NotificationsRowInput = z.infer<typeof NotificationsRowSchema>;
export type NotificationsInsertInput = z.infer<typeof NotificationsInsertSchema>;
export type NotificationsUpdateInput = z.infer<typeof NotificationsUpdateSchema>;
