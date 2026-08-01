// =====================================================
// FILE: types/generated/aethelred-connections/consciousness.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T16:03:06.393Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ConsciousnessRow = Tables<'consciousness'>;
export type ConsciousnessInsert = TablesInsert<'consciousness'>;
export type ConsciousnessUpdate = TablesUpdate<'consciousness'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of consciousness
 */
export interface PublicConsciousness {
  awareness_level: string | null;
  connected_entities: string[] | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_active: boolean;
  name: string;
  settings: Json | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for consciousness
 * All fields are optional for partial updates
 */
export interface ConsciousnessFormData {
  awareness_level?: string | null;
  connected_entities?: string[] | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  settings?: Json | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for consciousness
 */
export interface ConsciousnessValidationResult {
  valid: boolean;
  errors: {
    awareness_level?: string;
    connected_entities?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    name?: string;
    settings?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

