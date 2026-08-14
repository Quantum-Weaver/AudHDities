// =====================================================
// FILE: validators/platform_config.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// PlatformConfig SCHEMAS
// =====================================================

export const PlatformConfigRowSchema = z.object({
  category: z.string(),
  config_key: z.string(),
  config_type: z.string(),
  config_value: z.any(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_public: z.boolean(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const PlatformConfigInsertSchema = z.object({
  category: z.string().optional(),
  config_key: z.string(),
  config_type: z.string().optional(),
  config_value: z.any().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const PlatformConfigUpdateSchema = z.object({
  category: z.string().optional(),
  config_key: z.string().optional(),
  config_type: z.string().optional(),
  config_value: z.any().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_public: z.boolean().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PlatformConfigRowInput = z.infer<typeof PlatformConfigRowSchema>;
export type PlatformConfigInsertInput = z.infer<typeof PlatformConfigInsertSchema>;
export type PlatformConfigUpdateInput = z.infer<typeof PlatformConfigUpdateSchema>;
