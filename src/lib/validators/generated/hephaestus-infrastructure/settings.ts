// =====================================================
// FILE: validators/generated/hephaestus-infrastructure/settings.ts
// GENERATED: 2026-04-17T22:45:09.773Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { SETTING_SCOPE } from '@/lib/constants/generated/hephaestus-infrastructure/setting_scope';

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
  scope: z.enum(Object.values(SETTING_SCOPE)),
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
  key: z.string(),
  scope: z.enum(Object.values(SETTING_SCOPE)).optional(),
  scope_id: z.string().nullable().optional(),
  type: z.string(),
  updated_at: z.string().nullable().optional(),
  value: z.any(),
});

export const SettingsUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().nullable().optional(),
  key: z.string().optional(),
  scope: z.enum(Object.values(SETTING_SCOPE)).optional(),
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
