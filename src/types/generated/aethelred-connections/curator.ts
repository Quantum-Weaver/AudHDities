// =====================================================
// FILE: types/generated/aethelred-connections/curator.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.029Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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
  featured_content: Json | null;
  id: string;
  preservation_policy: Json | null;
  quality_standards: Json | null;
  updated_at: string | null;
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

