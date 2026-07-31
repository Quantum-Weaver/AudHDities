// =====================================================
// FILE: types/generated/daedalus-meta/blueprints.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-07-31T00:35:01.210Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type BlueprintsRow = Tables<'blueprints'>;
export type BlueprintsInsert = TablesInsert<'blueprints'>;
export type BlueprintsUpdate = TablesUpdate<'blueprints'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of blueprints
 */
export interface PublicBlueprints {
  blueprint_config: Json | null;
  blueprint_type: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  file_extension: string | null;
  id: string;
  name: string;
  output_path: string | null;
  slug: string;
  status: ContentStatus;
  template_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for blueprints
 * All fields are optional for partial updates
 */
export interface BlueprintsFormData {
  blueprint_config?: Json | null;
  blueprint_type?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  file_extension?: string | null;
  id?: string;
  name?: string;
  output_path?: string | null;
  slug?: string;
  status?: ContentStatus;
  template_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for blueprints
 */
export interface BlueprintsValidationResult {
  valid: boolean;
  errors: {
    blueprint_config?: string;
    blueprint_type?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    file_extension?: string;
    id?: string;
    name?: string;
    output_path?: string;
    slug?: string;
    status?: string;
    template_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

