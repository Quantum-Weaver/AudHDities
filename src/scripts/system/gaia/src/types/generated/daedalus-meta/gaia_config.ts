// =====================================================
// FILE: types/generated/daedalus-meta/gaia_config.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T17:46:58.415Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GaiaConfigRow = Tables<'gaia_config'>;
export type GaiaConfigInsert = TablesInsert<'gaia_config'>;
export type GaiaConfigUpdate = TablesUpdate<'gaia_config'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of gaia_config
 */
export interface PublicGaiaConfig {
  api_access: string;
  archived_at: string | null;
  composite_refs: Json | null;
  created_at: string;
  created_by: string | null;
  deity_group: string;
  deity_name: string | null;
  enum_refs: Json | null;
  family_id: string | null;
  generation_dependencies: Json | null;
  generation_flags: Json | null;
  generation_targets: Json | null;
  human_verified_tags: Json | null;
  icon_emoji: string | null;
  id: string;
  is_active: boolean;
  last_seen_at: string | null;
  log: Json;
  notes: string | null;
  schema_columns_count: number | null;
  schema_hash: string | null;
  schema_indexes_count: number | null;
  schema_notes: string | null;
  schema_policies_count: number | null;
  schema_triggers_count: number | null;
  schema_verified_at: string | null;
  script_id: string | null;
  sort_order: number;
  status: string;
  table_name: string;
  taxonomy_id: string | null;
  taxonomy_notes: string | null;
  template_id: string | null;
  updated_at: string;
  updated_by: string | null;
  visibility: string;
}

/**
 * Form data for gaia_config
 * All fields are optional for partial updates
 */
export interface GaiaConfigFormData {
  api_access?: string;
  archived_at?: string | null;
  composite_refs?: Json | null;
  created_at?: string;
  created_by?: string | null;
  deity_group?: string;
  deity_name?: string | null;
  enum_refs?: Json | null;
  family_id?: string | null;
  generation_dependencies?: Json | null;
  generation_flags?: Json | null;
  generation_targets?: Json | null;
  human_verified_tags?: Json | null;
  icon_emoji?: string | null;
  id?: string;
  is_active?: boolean;
  last_seen_at?: string | null;
  log?: Json;
  notes?: string | null;
  schema_columns_count?: number | null;
  schema_hash?: string | null;
  schema_indexes_count?: number | null;
  schema_notes?: string | null;
  schema_policies_count?: number | null;
  schema_triggers_count?: number | null;
  schema_verified_at?: string | null;
  script_id?: string | null;
  sort_order?: number;
  status?: string;
  table_name?: string;
  taxonomy_id?: string | null;
  taxonomy_notes?: string | null;
  template_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  visibility?: string;
}

/**
 * Validation result for gaia_config
 */
export interface GaiaConfigValidationResult {
  valid: boolean;
  errors: {
    api_access?: string;
    archived_at?: string;
    composite_refs?: string;
    created_at?: string;
    created_by?: string;
    deity_group?: string;
    deity_name?: string;
    enum_refs?: string;
    family_id?: string;
    generation_dependencies?: string;
    generation_flags?: string;
    generation_targets?: string;
    human_verified_tags?: string;
    icon_emoji?: string;
    id?: string;
    is_active?: string;
    last_seen_at?: string;
    log?: string;
    notes?: string;
    schema_columns_count?: string;
    schema_hash?: string;
    schema_indexes_count?: string;
    schema_notes?: string;
    schema_policies_count?: string;
    schema_triggers_count?: string;
    schema_verified_at?: string;
    script_id?: string;
    sort_order?: string;
    status?: string;
    table_name?: string;
    taxonomy_id?: string;
    taxonomy_notes?: string;
    template_id?: string;
    updated_at?: string;
    updated_by?: string;
    visibility?: string;
  };
}

