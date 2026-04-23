// =====================================================
// FILE: validators/settings.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Settings SCHEMAS
// =====================================================

export const SettingsRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_public: z.boolean().nullable(),
  key: z.string(),
  scope: z.enum(ENUM_VALUES.settingScope),
  scope_id: z.string().nullable(),
  type: z.string(),
  updated_at: z.string().nullable(),
  value: z.any(),
});

export const SettingsInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().nullable().optional(),
  key: z.string().optional(),
  scope: z.enum(ENUM_VALUES.settingScope).optional(),
  scope_id: z.string().nullable().optional(),
  type: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  value: z.any().optional(),
});

export const SettingsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().nullable().optional(),
  key: z.string().optional(),
  scope: z.enum(ENUM_VALUES.settingScope).optional(),
  scope_id: z.string().nullable().optional(),
  type: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  value: z.any().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SettingsRowInput = z.infer<typeof SettingsRowSchema>;
export type SettingsInsertInput = z.infer<typeof SettingsInsertSchema>;
export type SettingsUpdateInput = z.infer<typeof SettingsUpdateSchema>;
