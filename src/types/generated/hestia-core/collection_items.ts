// =====================================================
// FILE: types/generated/hestia-core/collection_items.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.302Z
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
 * Public view of collection_items
 */
export interface PublicCollectionItems {
  collection_id: string | null;
  created_at: string;
  created_by: string | null;
  display_order: number;
  id: string;
  is_required: boolean;
  item_id: string | null;
  item_type: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

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

/**
 * Validation result for collection_items
 */
export interface CollectionItemsValidationResult {
  valid: boolean;
  errors: {
    collection_id?: string;
    created_at?: string;
    created_by?: string;
    display_order?: string;
    id?: string;
    is_required?: string;
    item_id?: string;
    item_type?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

