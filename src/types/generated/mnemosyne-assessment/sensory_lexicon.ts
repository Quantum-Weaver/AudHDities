// =====================================================
// FILE: types/generated/mnemosyne-assessment/sensory_lexicon.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:09:31.509Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type SensoryLexiconRow = Tables<'sensory_lexicon'>;
export type SensoryLexiconInsert = TablesInsert<'sensory_lexicon'>;
export type SensoryLexiconUpdate = TablesUpdate<'sensory_lexicon'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of sensory_lexicon
 */
export interface PublicSensoryLexicon {
  atom_id: string | null;
  atom_word: string | null;
  color_hex: string | null;
  color_name: string | null;
  created_at: string;
  created_by: string | null;
  emoji: string | null;
  id: string;
  is_primary: boolean;
  keyword_id: string | null;
  movement: string | null;
  shape: string | null;
  smell: string | null;
  sound_description: string | null;
  sound_file_url: string | null;
  sound_frequency: string | null;
  sound_pitch: string | null;
  sound_timbre: string | null;
  sound_tone: string | null;
  status: ContentStatus;
  taste: string | null;
  temperature: string | null;
  texture: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for sensory_lexicon
 * All fields are optional for partial updates
 */
export interface SensoryLexiconFormData {
  atom_id?: string | null;
  atom_word?: string | null;
  color_hex?: string | null;
  color_name?: string | null;
  created_at?: string;
  created_by?: string | null;
  emoji?: string | null;
  id?: string;
  is_primary?: boolean;
  keyword_id?: string | null;
  movement?: string | null;
  shape?: string | null;
  smell?: string | null;
  sound_description?: string | null;
  sound_file_url?: string | null;
  sound_frequency?: string | null;
  sound_pitch?: string | null;
  sound_timbre?: string | null;
  sound_tone?: string | null;
  status?: ContentStatus;
  taste?: string | null;
  temperature?: string | null;
  texture?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for sensory_lexicon
 */
export interface SensoryLexiconValidationResult {
  valid: boolean;
  errors: {
    atom_id?: string;
    atom_word?: string;
    color_hex?: string;
    color_name?: string;
    created_at?: string;
    created_by?: string;
    emoji?: string;
    id?: string;
    is_primary?: string;
    keyword_id?: string;
    movement?: string;
    shape?: string;
    smell?: string;
    sound_description?: string;
    sound_file_url?: string;
    sound_frequency?: string;
    sound_pitch?: string;
    sound_timbre?: string;
    sound_tone?: string;
    status?: string;
    taste?: string;
    temperature?: string;
    texture?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

