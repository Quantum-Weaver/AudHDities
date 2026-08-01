// =====================================================
// FILE: types/generated/aethelred-connections/life_cycles.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T21:41:40.283Z
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

export type LifeCyclesRow = Tables<'life_cycles'>;
export type LifeCyclesInsert = TablesInsert<'life_cycles'>;
export type LifeCyclesUpdate = TablesUpdate<'life_cycles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of life_cycles
 */
export interface PublicLifeCycles {
  category: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  icon_emoji: string | null;
  id: string;
  name: string;
  slug: string;
  stage_order: number;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for life_cycles
 * All fields are optional for partial updates
 */
export interface LifeCyclesFormData {
  category?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  icon_emoji?: string | null;
  id?: string;
  name?: string;
  slug?: string;
  stage_order?: number;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for life_cycles
 */
export interface LifeCyclesValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    icon_emoji?: string;
    id?: string;
    name?: string;
    slug?: string;
    stage_order?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

