// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scripts.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-20T04:39:10.834Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ScriptsRow = Tables<'scripts'>;
export type ScriptsInsert = TablesInsert<'scripts'>;
export type ScriptsUpdate = TablesUpdate<'scripts'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scripts
 */
export interface PublicScripts {
  created_at: string;
  created_by: string | null;
  description: string | null;
  file_path: string;
  icon_emoji: string | null;
  id: string;
  input_requires: Json | null;
  is_active: boolean;
  name: string;
  output_produces: Json | null;
  script_type: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for scripts
 * All fields are optional for partial updates
 */
export interface ScriptsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  file_path?: string;
  icon_emoji?: string | null;
  id?: string;
  input_requires?: Json | null;
  is_active?: boolean;
  name?: string;
  output_produces?: Json | null;
  script_type?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for scripts
 */
export interface ScriptsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    file_path?: string;
    icon_emoji?: string;
    id?: string;
    input_requires?: string;
    is_active?: string;
    name?: string;
    output_produces?: string;
    script_type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

