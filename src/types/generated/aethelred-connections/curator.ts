// =====================================================
// FILE: types/generated/aethelred-connections/curator.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T18:11:44.196Z
// SOURCE: database.types.ts lines 1886-1939
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CuratorRow = Database['public']['Tables']['curator']['Row'];
export type CuratorInsert = Database['public']['Tables']['curator']['Insert'];
export type CuratorUpdate = Database['public']['Tables']['curator']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of curator
 */
export interface PublicCurator {
  archived_content: Json | null;
  collection_themes: Json | null;
  "created_at": "string | null";
  created_by: string | null;
  curation_queue: Json | null;
  featured_content: Json | null;
  id: string;
  preservation_policy: Json | null;
  quality_standards: Json | null;
  "updated_at": "string | null";
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
  featured_content?: Json | null;
  id?: string;
  preservation_policy?: Json | null;
  quality_standards?: Json | null;
  updated_at?: string | null;
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
    featured_content?: string;
    id?: string;
    preservation_policy?: string;
    quality_standards?: string;
    updated_at?: string;
  };
}

