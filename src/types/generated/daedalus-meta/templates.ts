// =====================================================
// FILE: types/generated/daedalus-meta/templates.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-07-31T23:16:54.874Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type TemplatesRow = Tables<'templates'>;
export type TemplatesInsert = TablesInsert<'templates'>;
export type TemplatesUpdate = TablesUpdate<'templates'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of templates
 */
export interface PublicTemplates {
  category: string;
  created_at: string;
  created_by: string | null;
  default_columns: Json | null;
  default_indexes: Json | null;
  default_triggers: Json | null;
  description: string | null;
  has_display_name: boolean;
  has_slug: boolean;
  has_status: boolean;
  has_visual_anchors: boolean;
  icon_emoji: string | null;
  id: string;
  log: Json;
  name: string;
  pk_pattern: string;
  rls_pattern: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for templates
 * All fields are optional for partial updates
 */
export interface TemplatesFormData {
  category?: string;
  created_at?: string;
  created_by?: string | null;
  default_columns?: Json | null;
  default_indexes?: Json | null;
  default_triggers?: Json | null;
  description?: string | null;
  has_display_name?: boolean;
  has_slug?: boolean;
  has_status?: boolean;
  has_visual_anchors?: boolean;
  icon_emoji?: string | null;
  id?: string;
  log?: Json;
  name?: string;
  pk_pattern?: string;
  rls_pattern?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for templates
 */
export interface TemplatesValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    created_at?: string;
    created_by?: string;
    default_columns?: string;
    default_indexes?: string;
    default_triggers?: string;
    description?: string;
    has_display_name?: string;
    has_slug?: string;
    has_status?: string;
    has_visual_anchors?: string;
    icon_emoji?: string;
    id?: string;
    log?: string;
    name?: string;
    pk_pattern?: string;
    rls_pattern?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

