// =====================================================
// FILE: types/generated/hestia-core/collection_sets.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T21:41:40.244Z
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

export type CollectionSetsRow = Tables<'collection_sets'>;
export type CollectionSetsInsert = TablesInsert<'collection_sets'>;
export type CollectionSetsUpdate = TablesUpdate<'collection_sets'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of collection_sets
 */
export interface PublicCollectionSets {
  collection_type: string | null;
  completion_points: number | null;
  completion_sigil_id: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  name: string;
  rarity: string | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for collection_sets
 * All fields are optional for partial updates
 */
export interface CollectionSetsFormData {
  collection_type?: string | null;
  completion_points?: number | null;
  completion_sigil_id?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  name?: string;
  rarity?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for collection_sets
 */
export interface CollectionSetsValidationResult {
  valid: boolean;
  errors: {
    collection_type?: string;
    completion_points?: string;
    completion_sigil_id?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

