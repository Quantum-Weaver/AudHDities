// =====================================================
// FILE: types/generated/aethelred-connections/skald.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.891Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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

