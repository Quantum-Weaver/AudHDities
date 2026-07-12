// =====================================================
// FILE: validators/collection_items.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// CollectionItems SCHEMAS
// =====================================================

export const CollectionItemsRowSchema = z.object({
  collection_id: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  display_order: z.number(),
  id: z.string(),
  is_required: z.boolean(),
  item_id: z.string().nullable(),
  item_type: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const CollectionItemsInsertSchema = z.object({
  collection_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_required: z.boolean().optional(),
  item_id: z.string().nullable().optional(),
  item_type: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const CollectionItemsUpdateSchema = z.object({
  collection_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_required: z.boolean().optional(),
  item_id: z.string().nullable().optional(),
  item_type: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CollectionItemsRowInput = z.infer<typeof CollectionItemsRowSchema>;
export type CollectionItemsInsertInput = z.infer<typeof CollectionItemsInsertSchema>;
export type CollectionItemsUpdateInput = z.infer<typeof CollectionItemsUpdateSchema>;
