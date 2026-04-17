// =====================================================
// FILE: types/generated/aethelred-connections/skald.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T17:34:19.721Z
// SOURCE: database.types.ts lines 5835-5888
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type SkaldRow = Database['public']['Tables']['skald']['Row'];
export type SkaldInsert = Database['public']['Tables']['skald']['Insert'];
export type SkaldUpdate = Database['public']['Tables']['skald']['Update'];

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

