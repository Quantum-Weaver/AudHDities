// =====================================================
// FILE: validators/generated/aethelred-connections/audhdities_platform.ts
// GENERATED: 2026-04-17T22:45:09.630Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { PLATFORM_STATUS } from '@/lib/constants/generated/aethelred-connections/platform_status';

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
  status: z.enum(Object.values(PLATFORM_STATUS)).nullable(),
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
  status: z.enum(Object.values(PLATFORM_STATUS)).nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  total_users: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  uptime_percent: z.number().nullable().optional(),
  version: z.string(),
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
  status: z.enum(Object.values(PLATFORM_STATUS)).nullable().optional(),
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
