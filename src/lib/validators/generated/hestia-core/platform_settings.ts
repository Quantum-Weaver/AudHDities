// =====================================================
// FILE: validators/platform_settings.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// PlatformSettings SCHEMAS
// =====================================================

export const PlatformSettingsRowSchema = z.object({
  category: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_public: z.boolean(),
  setting_key: z.string(),
  setting_type: z.string().nullable(),
  setting_value: z.any().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const PlatformSettingsInsertSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().optional(),
  setting_key: z.string(),
  setting_type: z.string().nullable().optional(),
  setting_value: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const PlatformSettingsUpdateSchema = z.object({
  category: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().optional(),
  setting_key: z.string().optional(),
  setting_type: z.string().nullable().optional(),
  setting_value: z.any().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PlatformSettingsRowInput = z.infer<typeof PlatformSettingsRowSchema>;
export type PlatformSettingsInsertInput = z.infer<typeof PlatformSettingsInsertSchema>;
export type PlatformSettingsUpdateInput = z.infer<typeof PlatformSettingsUpdateSchema>;
