// =====================================================
// FILE: types/generated/hestia-core/collection_items.ts
// HANDLING: join_table
// DEITY: hestia-core
// GENERATED: 2026-07-31T00:35:01.262Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type CollectionItemsRow = Tables<'collection_items'>;
export type CollectionItemsInsert = TablesInsert<'collection_items'>;
export type CollectionItemsUpdate = TablesUpdate<'collection_items'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for collection_items
 * All fields are optional for partial updates
 */
export interface CollectionItemsFormData {
  collection_id?: string | null;
  created_at?: string;
  created_by?: string | null;
  display_order?: number;
  id?: string;
  is_required?: boolean;
  item_id?: string | null;
  item_type?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

