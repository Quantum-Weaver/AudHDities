// =====================================================
// FILE: types/generated/hestia-core/seed_types.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T17:46:58.452Z
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

export type SeedTypesRow = Tables<'seed_types'>;
export type SeedTypesInsert = TablesInsert<'seed_types'>;
export type SeedTypesUpdate = TablesUpdate<'seed_types'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of seed_types
 */
export interface PublicSeedTypes {
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  growth_duration: string | null;
  harvest_rewards: Json | null;
  icon_url: string | null;
  id: string;
  name: string;
  rarity: string | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for seed_types
 * All fields are optional for partial updates
 */
export interface SeedTypesFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  growth_duration?: string | null;
  harvest_rewards?: Json | null;
  icon_url?: string | null;
  id?: string;
  name?: string;
  rarity?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for seed_types
 */
export interface SeedTypesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    growth_duration?: string;
    harvest_rewards?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

