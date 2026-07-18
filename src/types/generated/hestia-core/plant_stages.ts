// =====================================================
// FILE: types/generated/hestia-core/plant_stages.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-18T23:30:03.932Z
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

export type PlantStagesRow = Tables<'plant_stages'>;
export type PlantStagesInsert = TablesInsert<'plant_stages'>;
export type PlantStagesUpdate = TablesUpdate<'plant_stages'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of plant_stages
 */
export interface PublicPlantStages {
  animation_url: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  duration_hours: number | null;
  icon_url: string | null;
  id: string;
  name: string;
  slug: string;
  stage_order: number;
  stage_rewards: Json | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for plant_stages
 * All fields are optional for partial updates
 */
export interface PlantStagesFormData {
  animation_url?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  duration_hours?: number | null;
  icon_url?: string | null;
  id?: string;
  name?: string;
  slug?: string;
  stage_order?: number;
  stage_rewards?: Json | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for plant_stages
 */
export interface PlantStagesValidationResult {
  valid: boolean;
  errors: {
    animation_url?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    duration_hours?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    slug?: string;
    stage_order?: string;
    stage_rewards?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

