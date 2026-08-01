// =====================================================
// FILE: types/generated/hestia-core/user_page_views.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T16:03:07.059Z
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
  deity_domain: string | null;
  first_visited_at: string;
  icon_emoji: string | null;
  id: string;
  last_visited_at: string;
  page_name: string | null;
  page_path: string;
  updated_at: string;
  user_id: string;
  visit_count: number;
}

/**
 * Form data for user_page_views
 * All fields are optional for partial updates
 */
export interface UserPageViewsFormData {
  created_at?: string;
  deity_domain?: string | null;
  first_visited_at?: string;
  icon_emoji?: string | null;
  id?: string;
  last_visited_at?: string;
  page_name?: string | null;
  page_path?: string;
  updated_at?: string;
  user_id?: string;
  visit_count?: number;
}

/**
 * Validation result for user_page_views
 */
export interface UserPageViewsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    deity_domain?: string;
    first_visited_at?: string;
    icon_emoji?: string;
    id?: string;
    last_visited_at?: string;
    page_name?: string;
    page_path?: string;
    updated_at?: string;
    user_id?: string;
    visit_count?: string;
  };
}

