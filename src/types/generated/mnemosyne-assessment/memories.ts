// =====================================================
// FILE: types/generated/mnemosyne-assessment/memories.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.332Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type MemoriesRow = Tables<'memories'>;
export type MemoriesInsert = TablesInsert<'memories'>;
export type MemoriesUpdate = TablesUpdate<'memories'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of memories
 */
export interface PublicMemories {
  confidence: number | null;
  created_at: string;
  description: string | null;
  id: string;
  memory_data: Json | null;
  memory_type: string | null;
  name: string;
  source_generation_id: string | null;
}

/**
 * Form data for memories
 * All fields are optional for partial updates
 */
export interface MemoriesFormData {
  confidence?: number | null;
  created_at?: string;
  description?: string | null;
  id?: string;
  memory_data?: Json | null;
  memory_type?: string | null;
  name?: string;
  source_generation_id?: string | null;
}

/**
 * Validation result for memories
 */
export interface MemoriesValidationResult {
  valid: boolean;
  errors: {
    confidence?: string;
    created_at?: string;
    description?: string;
    id?: string;
    memory_data?: string;
    memory_type?: string;
    name?: string;
    source_generation_id?: string;
  };
}

