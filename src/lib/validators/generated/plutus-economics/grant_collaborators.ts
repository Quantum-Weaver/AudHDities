// =====================================================
// FILE: validators/grant_collaborators.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// GrantCollaborators SCHEMAS
// =====================================================

export const GrantCollaboratorsRowSchema = z.object({
  application_id: z.string(),
  created_at: z.string(),
  id: z.string(),
  notes: z.string().nullable(),
  role: z.string().nullable(),
  updated_at: z.string(),
  user_id: z.string(),
});

export const GrantCollaboratorsInsertSchema = z.object({
  application_id: z.string(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  user_id: z.string(),
});

export const GrantCollaboratorsUpdateSchema = z.object({
  application_id: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GrantCollaboratorsRowInput = z.infer<typeof GrantCollaboratorsRowSchema>;
export type GrantCollaboratorsInsertInput = z.infer<typeof GrantCollaboratorsInsertSchema>;
export type GrantCollaboratorsUpdateInput = z.infer<typeof GrantCollaboratorsUpdateSchema>;
