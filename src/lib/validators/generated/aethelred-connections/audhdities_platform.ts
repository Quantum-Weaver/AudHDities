// =====================================================
// FILE: validators/audhdities_platform.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// AudhditiesPlatform SCHEMAS
// =====================================================

export const AudhditiesPlatformRowSchema = z.object({
  active_users: z.number().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  last_release_at: z.string().nullable(),
  operated_by: z.string().nullable(),
  release_name: z.string().nullable(),
  release_notes: z.string().nullable(),
  status: z.enum(ENUM_VALUES.platformStatus).nullable(),
  total_products: z.number().nullable(),
  total_sales: z.number().nullable(),
  total_users: z.number().nullable(),
  updated_at: z.string().nullable(),
  uptime_percent: z.number().nullable(),
  version: z.string(),
});

export const AudhditiesPlatformInsertSchema = z.object({
  active_users: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  last_release_at: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  release_name: z.string().nullable().optional(),
  release_notes: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.platformStatus).nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  total_users: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  uptime_percent: z.number().nullable().optional(),
  version: z.string().optional(),
});

export const AudhditiesPlatformUpdateSchema = z.object({
  active_users: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  last_release_at: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  release_name: z.string().nullable().optional(),
  release_notes: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.platformStatus).nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  total_users: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  uptime_percent: z.number().nullable().optional(),
  version: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type AudhditiesPlatformRowInput = z.infer<typeof AudhditiesPlatformRowSchema>;
export type AudhditiesPlatformInsertInput = z.infer<typeof AudhditiesPlatformInsertSchema>;
export type AudhditiesPlatformUpdateInput = z.infer<typeof AudhditiesPlatformUpdateSchema>;
