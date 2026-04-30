// =====================================================
// FILE: types/generated/aethelred-connections/skald.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T04:17:48.253Z
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
  inspiring_content: Json | null;
  music_library: Json | null;
  mythology: Json | null;
  skald_id: string;
  story_archive: Json | null;
  updated_at: string | null;
  updated_by: string | null;
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
  inspiring_content?: Json | null;
  music_library?: Json | null;
  mythology?: Json | null;
  skald_id?: string;
  story_archive?: Json | null;
  updated_at?: string | null;
  updated_by?: string | null;
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
    inspiring_content?: string;
    music_library?: string;
    mythology?: string;
    skald_id?: string;
    story_archive?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

