// =====================================================
// FILE: validators/generated/hermes-social/messages.ts
// GENERATED: 2026-04-15T05:16:17.742Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Messages SCHEMAS
// =====================================================

export const MessagesRowSchema = z.object({
  content: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  is_read: z.boolean().nullable(),
  parent_id: z.string().nullable(),
  read_at: z.string().nullable(),
  recipient_id: z.string(),
  sender_id: z.string(),
  status: z.enum(Object.values(MessageStatus)).nullable(),
  thread_id: z.string().nullable(),
});

export const MessagesInsertSchema = z.object({
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  is_read: z.boolean().nullable().optional(),
  parent_id: z.string().nullable().optional(),
  read_at: z.string().nullable().optional(),
  recipient_id: z.string().optional(),
  sender_id: z.string().optional(),
  status: z.enum(Object.values(MessageStatus)).nullable().optional(),
  thread_id: z.string().nullable().optional(),
});

export const MessagesUpdateSchema = z.object({
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  is_read: z.boolean().nullable().optional(),
  parent_id: z.string().nullable().optional(),
  read_at: z.string().nullable().optional(),
  recipient_id: z.string().optional(),
  sender_id: z.string().optional(),
  status: z.enum(Object.values(MessageStatus)).nullable().optional(),
  thread_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type MessagesRowInput = z.infer<typeof MessagesRowSchema>;
export type MessagesInsertInput = z.infer<typeof MessagesInsertSchema>;
export type MessagesUpdateInput = z.infer<typeof MessagesUpdateSchema>;
