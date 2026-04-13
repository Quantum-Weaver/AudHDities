// =====================================================
// FILE: validators/generated/contact_submissions.ts
// GENERATED: 2026-04-13T06:13:41.965Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// ContactSubmissions SCHEMAS
// =====================================================

export const ContactSubmissionsRowSchema = z.object({
  assigned_to: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  direction: z.enum(Object.values(ContactDirection)).nullable(),
  email: z.string(),
  id: z.string(),
  message: z.string(),
  message_id: z.string().nullable(),
  name: z.string(),
  notes: z.string().nullable(),
  parent_id: z.string().nullable(),
  resolved_at: z.string().nullable(),
  status: z.enum(Object.values(ContactStatus)).nullable(),
  subject: z.string(),
  thread_id: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string().nullable(),
});

export const ContactSubmissionsInsertSchema = z.object({
  assigned_to: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  direction: z.enum(Object.values(ContactDirection)).nullable().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  message: z.string().optional(),
  message_id: z.string().nullable().optional(),
  name: z.string().optional(),
  notes: z.string().nullable().optional(),
  parent_id: z.string().nullable().optional(),
  resolved_at: z.string().nullable().optional(),
  status: z.enum(Object.values(ContactStatus)).nullable().optional(),
  subject: z.string().optional(),
  thread_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().nullable().optional(),
});

export const ContactSubmissionsUpdateSchema = z.object({
  assigned_to: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  direction: z.enum(Object.values(ContactDirection)).nullable().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  message: z.string().optional(),
  message_id: z.string().nullable().optional(),
  name: z.string().optional(),
  notes: z.string().nullable().optional(),
  parent_id: z.string().nullable().optional(),
  resolved_at: z.string().nullable().optional(),
  status: z.enum(Object.values(ContactStatus)).nullable().optional(),
  subject: z.string().optional(),
  thread_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ContactSubmissionsRowInput = z.infer<typeof ContactSubmissionsRowSchema>;
export type ContactSubmissionsInsertInput = z.infer<typeof ContactSubmissionsInsertSchema>;
export type ContactSubmissionsUpdateInput = z.infer<typeof ContactSubmissionsUpdateSchema>;
