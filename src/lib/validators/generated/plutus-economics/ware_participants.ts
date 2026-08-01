// =====================================================
// FILE: validators/ware_participants.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// WareParticipants SCHEMAS
// =====================================================

export const WareParticipantsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  id: z.string(),
  notes: z.string().nullable(),
  role: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
  ware_id: z.string(),
});

export const WareParticipantsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
  ware_id: z.string(),
});

export const WareParticipantsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
  ware_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type WareParticipantsRowInput = z.infer<typeof WareParticipantsRowSchema>;
export type WareParticipantsInsertInput = z.infer<typeof WareParticipantsInsertSchema>;
export type WareParticipantsUpdateInput = z.infer<typeof WareParticipantsUpdateSchema>;
