// =====================================================
// FILE: types/generated/athena-gamification/mythology.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-07-18T21:42:54.326Z
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

export type MythologyRow = Tables<'mythology'>;
export type MythologyInsert = TablesInsert<'mythology'>;
export type MythologyUpdate = TablesUpdate<'mythology'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of mythology
 */
export interface PublicMythology {
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  myth_type: string | null;
  name: string;
  related_entity: string | null;
  related_entity_type: string | null;
  slug: string;
  status: ContentStatus;
  story: string | null;
  teachings: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for mythology
 * All fields are optional for partial updates
 */
export interface MythologyFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  myth_type?: string | null;
  name?: string;
  related_entity?: string | null;
  related_entity_type?: string | null;
  slug?: string;
  status?: ContentStatus;
  story?: string | null;
  teachings?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for mythology
 */
export interface MythologyValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    myth_type?: string;
    name?: string;
    related_entity?: string;
    related_entity_type?: string;
    slug?: string;
    status?: string;
    story?: string;
    teachings?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

