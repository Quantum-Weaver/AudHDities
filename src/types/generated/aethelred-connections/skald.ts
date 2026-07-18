// =====================================================
// FILE: types/generated/aethelred-connections/skald.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T23:17:11.137Z
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
  consciousness_level: string | null;
  created_at: string;
  created_by: string | null;
  current_task: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  name: string;
  settings: Json | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for skald
 * All fields are optional for partial updates
 */
export interface SkaldFormData {
  consciousness_level?: string | null;
  created_at?: string;
  created_by?: string | null;
  current_task?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  settings?: Json | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for skald
 */
export interface SkaldValidationResult {
  valid: boolean;
  errors: {
    consciousness_level?: string;
    created_at?: string;
    created_by?: string;
    current_task?: string;
    description?: string;
    id?: string;
    is_active?: string;
    name?: string;
    settings?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

