// =====================================================
// FILE: validators/generated/personas.ts
// GENERATED: 2026-04-13T15:29:50.978Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Personas SCHEMAS
// =====================================================

export const PersonasRowSchema = z.object({
  avatar_url: z.string().nullable(),
  characteristics: z.any().nullable(),
  color: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string(),
  description: z.string(),
  id: z.string(),
  is_active: z.boolean().nullable(),
  name: z.string(),
  slug: z.string(),
  updated_at: z.string().nullable(),
});

export const PersonasInsertSchema = z.object({
  avatar_url: z.string().nullable().optional(),
  characteristics: z.any().nullable().optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

export const PersonasUpdateSchema = z.object({
  avatar_url: z.string().nullable().optional(),
  characteristics: z.any().nullable().optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  is_active: z.boolean().nullable().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PersonasRowInput = z.infer<typeof PersonasRowSchema>;
export type PersonasInsertInput = z.infer<typeof PersonasInsertSchema>;
export type PersonasUpdateInput = z.infer<typeof PersonasUpdateSchema>;
