// =====================================================
// FILE: types/generated/hestia-core/user_page_views.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T15:32:13.836Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type UserPageViewsRow = Tables<'user_page_views'>;
export type UserPageViewsInsert = TablesInsert<'user_page_views'>;
export type UserPageViewsUpdate = TablesUpdate<'user_page_views'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of user_page_views
 */
export interface PublicUserPageViews {
  created_at: string;
  created_by: string | null;
  first_viewed_at: string | null;
  last_viewed_at: string | null;
  page_path: string;
  updated_at: string | null;
  user_id: string;
  user_page_views_id: string;
  view_count: number | null;
}

/**
 * Form data for user_page_views
 * All fields are optional for partial updates
 */
export interface UserPageViewsFormData {
  created_at?: string;
  created_by?: string | null;
  first_viewed_at?: string | null;
  last_viewed_at?: string | null;
  page_path?: string;
  updated_at?: string | null;
  user_id?: string;
  user_page_views_id?: string;
  view_count?: number | null;
}

/**
 * Validation result for user_page_views
 */
export interface UserPageViewsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    first_viewed_at?: string;
    last_viewed_at?: string;
    page_path?: string;
    updated_at?: string;
    user_id?: string;
    user_page_views_id?: string;
    view_count?: string;
  };
}

