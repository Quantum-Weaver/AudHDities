// =====================================================
// FILE: types/hephaestus_infrastructure/scripts.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T21:55:13.078Z
// SOURCE: database.types.ts lines 4446-4504
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ScriptType = Database['public']['Enums']['script_type'];

export type ScriptsRow = Database['public']['Tables']['scripts']['Row'];
export type ScriptsInsert = Database['public']['Tables']['scripts']['Insert'];
export type ScriptsUpdate = Database['public']['Tables']['scripts']['Update'];

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
  id: string;
  is_production_safe: boolean | null;
  last_result: string | null;
  last_run: string | null;
  name: string;
  parameters: Json | null;
  path: string;
  requires_approval: boolean | null;
  run_count: number | null;
  type: ScriptType;
  updated_at: string | null;
}

/**
 * Form data for scripts
 * All fields are optional for partial updates
 */
export interface ScriptsFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_production_safe?: boolean | null;
  last_result?: string | null;
  last_run?: string | null;
  name?: string;
  parameters?: Json | null;
  path?: string;
  requires_approval?: boolean | null;
  run_count?: number | null;
  type?: ScriptType;
  updated_at?: string | null;
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
    id?: string;
    is_production_safe?: string;
    last_result?: string;
    last_run?: string;
    name?: string;
    parameters?: string;
    path?: string;
    requires_approval?: string;
    run_count?: string;
    type?: string;
    updated_at?: string;
  };
}

