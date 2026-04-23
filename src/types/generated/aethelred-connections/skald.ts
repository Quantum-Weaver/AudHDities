// =====================================================
// FILE: types/generated/aethelred-connections/skald.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-23T02:14:53.568Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type SkaldRow = Tables<'skald'>;
export type SkaldInsert = TablesInsert<'skald'>;
export type SkaldUpdate = TablesUpdate<'skald'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of skald
 */
export interface PublicSkald {
  art_gallery: Json | null;
  bard_roster: string[] | null;
  created_at: string | null;
  created_by: string | null;
  id: string;
  inspiring_content: Json | null;
  music_library: Json | null;
  mythology: Json | null;
  story_archive: Json | null;
  updated_at: string | null;
}

/**
 * Form data for skald
 * All fields are optional for partial updates
 */
export interface SkaldFormData {
  art_gallery?: Json | null;
  bard_roster?: string[] | null;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  inspiring_content?: Json | null;
  music_library?: Json | null;
  mythology?: Json | null;
  story_archive?: Json | null;
  updated_at?: string | null;
}

/**
 * Validation result for skald
 */
export interface SkaldValidationResult {
  valid: boolean;
  errors: {
    art_gallery?: string;
    bard_roster?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    inspiring_content?: string;
    music_library?: string;
    mythology?: string;
    story_archive?: string;
    updated_at?: string;
  };
}

