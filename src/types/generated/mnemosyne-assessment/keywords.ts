// =====================================================
// FILE: types/generated/mnemosyne-assessment/keywords.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:30:03.826Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type KeywordsRow = Tables<'keywords'>;
export type KeywordsInsert = TablesInsert<'keywords'>;
export type KeywordsUpdate = TablesUpdate<'keywords'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of keywords
 */
export interface PublicKeywords {
  atom_word: string | null;
  category: string | null;
  color: string | null;
  created_at: string;
  created_by: string | null;
  definition: string;
  emoji: string | null;
  etymology_progress: number | null;
  id: string;
  keyword: string;
  keyword_type: string | null;
  movement: string | null;
  root_language: string | null;
  sanctuary_meaning: string | null;
  shape: string | null;
  smell: string | null;
  sound: string | null;
  sound_file_url: string | null;
  sound_frequency: string | null;
  sound_pitch: string | null;
  sound_timbre: string | null;
  sound_tone: string | null;
  taste: string | null;
  temperature: string | null;
  texture: string | null;
  updated_at: string;
  updated_by: string | null;
  word_origin: string | null;
}

/**
 * Form data for keywords
 * All fields are optional for partial updates
 */
export interface KeywordsFormData {
  atom_word?: string | null;
  category?: string | null;
  color?: string | null;
  created_at?: string;
  created_by?: string | null;
  definition?: string;
  emoji?: string | null;
  etymology_progress?: number | null;
  id?: string;
  keyword?: string;
  keyword_type?: string | null;
  movement?: string | null;
  root_language?: string | null;
  sanctuary_meaning?: string | null;
  shape?: string | null;
  smell?: string | null;
  sound?: string | null;
  sound_file_url?: string | null;
  sound_frequency?: string | null;
  sound_pitch?: string | null;
  sound_timbre?: string | null;
  sound_tone?: string | null;
  taste?: string | null;
  temperature?: string | null;
  texture?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  word_origin?: string | null;
}

/**
 * Validation result for keywords
 */
export interface KeywordsValidationResult {
  valid: boolean;
  errors: {
    atom_word?: string;
    category?: string;
    color?: string;
    created_at?: string;
    created_by?: string;
    definition?: string;
    emoji?: string;
    etymology_progress?: string;
    id?: string;
    keyword?: string;
    keyword_type?: string;
    movement?: string;
    root_language?: string;
    sanctuary_meaning?: string;
    shape?: string;
    smell?: string;
    sound?: string;
    sound_file_url?: string;
    sound_frequency?: string;
    sound_pitch?: string;
    sound_timbre?: string;
    sound_tone?: string;
    taste?: string;
    temperature?: string;
    texture?: string;
    updated_at?: string;
    updated_by?: string;
    word_origin?: string;
  };
}

