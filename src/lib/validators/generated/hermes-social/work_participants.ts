// =====================================================
// FILE: validators/work_participants.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// WorkParticipants SCHEMAS
// =====================================================

export const WorkParticipantsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  id: z.string(),
  notes: z.string().nullable(),
  role: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
  work_id: z.string(),
});

export const WorkParticipantsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
  work_id: z.string(),
});

export const WorkParticipantsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
  work_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type WorkParticipantsRowInput = z.infer<typeof WorkParticipantsRowSchema>;
export type WorkParticipantsInsertInput = z.infer<typeof WorkParticipantsInsertSchema>;
export type WorkParticipantsUpdateInput = z.infer<typeof WorkParticipantsUpdateSchema>;
