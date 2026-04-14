// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scripts.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T19:39:30.046Z
// SOURCE: database.types.ts lines 5458-5516
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ScriptType = Database['public']['Enums']['script_type'];

// =====================================================
// CORE TYPES
// =====================================================

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
  "created_at": "string | null";
  created_by: string | null;
  description: string | null;
  id: string;
  is_production_safe: boolean | null;
  "last_result": "string | null";
  "last_run": "string | null";
  name: string;
  parameters: Json | null;
  path: string;
  requires_approval: boolean | null;
  run_count: number | null;
  type: ScriptType;
  "updated_at": "string | null";
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

