// =====================================================
// FILE: validators/generated/hermes-social/notifications.ts
// GENERATED: 2026-04-15T16:13:09.472Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Notifications SCHEMAS
// =====================================================

export const NotificationsRowSchema = z.object({
  action_label: z.string().nullable(),
  action_url: z.string().nullable(),
  body: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  is_read: z.boolean().nullable(),
  metadata: z.any().nullable(),
  read_at: z.string().nullable(),
  related_entity_id: z.string().nullable(),
  related_entity_type: z.string().nullable(),
  title: z.string(),
  type: z.enum(Object.values(NOTIFICATION_TYPE)),
  user_id: z.string(),
});

export const NotificationsInsertSchema = z.object({
  action_label: z.string().nullable().optional(),
  action_url: z.string().nullable().optional(),
  body: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  is_read: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  read_at: z.string().nullable().optional(),
  related_entity_id: z.string().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(NOTIFICATION_TYPE)).optional(),
  user_id: z.string().optional(),
});

export const NotificationsUpdateSchema = z.object({
  action_label: z.string().nullable().optional(),
  action_url: z.string().nullable().optional(),
  body: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  is_read: z.boolean().nullable().optional(),
  metadata: z.any().nullable().optional(),
  read_at: z.string().nullable().optional(),
  related_entity_id: z.string().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  title: z.string().optional(),
  type: z.enum(Object.values(NOTIFICATION_TYPE)).optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type NotificationsRowInput = z.infer<typeof NotificationsRowSchema>;
export type NotificationsInsertInput = z.infer<typeof NotificationsInsertSchema>;
export type NotificationsUpdateInput = z.infer<typeof NotificationsUpdateSchema>;
