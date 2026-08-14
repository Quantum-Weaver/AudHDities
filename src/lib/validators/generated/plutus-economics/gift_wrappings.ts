// =====================================================
// FILE: validators/gift_wrappings.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// GiftWrappings SCHEMAS
// =====================================================

export const GiftWrappingsRowSchema = z.object({
  animation_url: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  icon_url: z.string().nullable(),
  id: z.string(),
  is_limited: z.boolean(),
  name: z.string(),
  rarity: z.string().nullable(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus),
  theme: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const GiftWrappingsInsertSchema = z.object({
  animation_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_limited: z.boolean().optional(),
  name: z.string(),
  rarity: z.string().nullable().optional(),
  slug: z.string(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  theme: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const GiftWrappingsUpdateSchema = z.object({
  animation_url: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_limited: z.boolean().optional(),
  name: z.string().optional(),
  rarity: z.string().nullable().optional(),
  slug: z.string().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  theme: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GiftWrappingsRowInput = z.infer<typeof GiftWrappingsRowSchema>;
export type GiftWrappingsInsertInput = z.infer<typeof GiftWrappingsInsertSchema>;
export type GiftWrappingsUpdateInput = z.infer<typeof GiftWrappingsUpdateSchema>;
