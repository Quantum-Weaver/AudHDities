// =====================================================
// FILE: types/generated/hestia-core/views.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T21:41:40.333Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ViewsRow = Tables<'views'>;
export type ViewsInsert = TablesInsert<'views'>;
export type ViewsUpdate = TablesUpdate<'views'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of views
 */
export interface PublicViews {
  archived_at: string | null;
  created_at: string;
  created_by: string | null;
  definition: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  last_seen_at: string | null;
  log: Json;
  name: string;
  updated_at: string;
}

/**
 * Form data for views
 * All fields are optional for partial updates
 */
export interface ViewsFormData {
  archived_at?: string | null;
  created_at?: string;
  created_by?: string | null;
  definition?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  last_seen_at?: string | null;
  log?: Json;
  name?: string;
  updated_at?: string;
}

/**
 * Validation result for views
 */
export interface ViewsValidationResult {
  valid: boolean;
  errors: {
    archived_at?: string;
    created_at?: string;
    created_by?: string;
    definition?: string;
    description?: string;
    id?: string;
    is_active?: string;
    last_seen_at?: string;
    log?: string;
    name?: string;
    updated_at?: string;
  };
}

