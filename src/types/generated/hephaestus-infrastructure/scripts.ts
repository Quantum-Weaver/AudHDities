// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scripts.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.849Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ScriptType = Database['public']['Enums']['script_type'];
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

