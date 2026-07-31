// =====================================================
// FILE: types/generated/iris-communications/personas.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-31T01:03:41.436Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type PersonasRow = Tables<'personas'>;
export type PersonasInsert = TablesInsert<'personas'>;
export type PersonasUpdate = TablesUpdate<'personas'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of personas
 */
export interface PublicPersonas {
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  name: string;
  persona_type: string | null;
  sample_phrases: string[] | null;
  slug: string;
  status: ContentStatus;
  tone: string | null;
  updated_at: string;
  updated_by: string | null;
  voice_characteristics: Json | null;
}

/**
 * Form data for personas
 * All fields are optional for partial updates
 */
export interface PersonasFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  name?: string;
  persona_type?: string | null;
  sample_phrases?: string[] | null;
  slug?: string;
  status?: ContentStatus;
  tone?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  voice_characteristics?: Json | null;
}

/**
 * Validation result for personas
 */
export interface PersonasValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    persona_type?: string;
    sample_phrases?: string;
    slug?: string;
    status?: string;
    tone?: string;
    updated_at?: string;
    updated_by?: string;
    voice_characteristics?: string;
  };
}

