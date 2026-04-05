// =====================================================
// FILE: types/aethelred_connections/skald.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T19:46:33.128Z
// SOURCE: database.types.ts lines 4588-4631
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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
  art_gallery: Json | null
  bard_roster: string[] | null
  created_at: string | null
  id: string
  inspiring_content: Json | null
  music_library: Json | null
  mythology: Json | null
  story_archive: Json | null
  updated_at: string | null
}

/**
 * Form data for skald
 * All fields are optional for partial updates
 */
export interface SkaldFormData {
  art_gallery?: Json | null;
  bard_roster?: string[] | null;
  created_at?: string | null;
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
    id?: string;
    inspiring_content?: string;
    music_library?: string;
    mythology?: string;
    story_archive?: string;
    updated_at?: string;
  };
}

