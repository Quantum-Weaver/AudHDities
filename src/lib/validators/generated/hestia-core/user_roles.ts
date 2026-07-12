// =====================================================
// FILE: validators/user_roles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// UserRoles SCHEMAS
// =====================================================

export const UserRolesRowSchema = z.object({
  assigned_by: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  role: z.enum(ENUM_VALUES.userRole),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
});

export const UserRolesInsertSchema = z.object({
  assigned_by: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  role: z.enum(ENUM_VALUES.userRole),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
});

export const UserRolesUpdateSchema = z.object({
  assigned_by: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  role: z.enum(ENUM_VALUES.userRole).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserRolesRowInput = z.infer<typeof UserRolesRowSchema>;
export type UserRolesInsertInput = z.infer<typeof UserRolesInsertSchema>;
export type UserRolesUpdateInput = z.infer<typeof UserRolesUpdateSchema>;
