// =====================================================
// FILE: types/generated/aethelred-connections/curator.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T15:32:13.413Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type CuratorRow = Tables<'curator'>;
export type CuratorInsert = TablesInsert<'curator'>;
export type CuratorUpdate = TablesUpdate<'curator'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of curator
 */
export interface PublicCurator {
  archived_content: Json | null;
  collection_themes: Json | null;
  created_at: string | null;
  created_by: string | null;
  curation_queue: Json | null;
  curator_id: string;
  featured_content: Json | null;
  preservation_policy: Json | null;
  quality_standards: Json | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for curator
 * All fields are optional for partial updates
 */
export interface CuratorFormData {
  archived_content?: Json | null;
  collection_themes?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  curation_queue?: Json | null;
  curator_id?: string;
  featured_content?: Json | null;
  preservation_policy?: Json | null;
  quality_standards?: Json | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for curator
 */
export interface CuratorValidationResult {
  valid: boolean;
  errors: {
    archived_content?: string;
    collection_themes?: string;
    created_at?: string;
    created_by?: string;
    curation_queue?: string;
    curator_id?: string;
    featured_content?: string;
    preservation_policy?: string;
    quality_standards?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

