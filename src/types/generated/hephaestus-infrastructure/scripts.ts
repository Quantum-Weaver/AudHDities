// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scripts.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-05-01T03:24:42.081Z
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

export type ScriptType = Enums<'script_type'>;

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
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  is_production_safe: boolean | null;
  last_result: string | null;
  last_run: string | null;
  name: string;
  parameters: Json | null;
  path: string;
  requires_approval: boolean | null;
  run_count: number | null;
  scripts_id: string;
  type: ScriptType;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for scripts
 * All fields are optional for partial updates
 */
export interface ScriptsFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  is_production_safe?: boolean | null;
  last_result?: string | null;
  last_run?: string | null;
  name?: string;
  parameters?: Json | null;
  path?: string;
  requires_approval?: boolean | null;
  run_count?: number | null;
  scripts_id?: string;
  type?: ScriptType;
  updated_at?: string | null;
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
    is_production_safe?: string;
    last_result?: string;
    last_run?: string;
    name?: string;
    parameters?: string;
    path?: string;
    requires_approval?: string;
    run_count?: string;
    scripts_id?: string;
    type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

