// =====================================================
// FILE: types/athena_gamification/scenes.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T19:46:33.110Z
// SOURCE: database.types.ts lines 4261-4326
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type SceneType = Database['public']['Enums']['scene_type'];

export type ScenesRow = Database['public']['Tables']['scenes']['Row'];
export type ScenesInsert = Database['public']['Tables']['scenes']['Insert'];
export type ScenesUpdate = Database['public']['Tables']['scenes']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scenes
 */
export interface PublicScenes {
  created_at: string | null
  creator_id: string
  description: string
  house: CouncilHouse | null
  id: string
  instructions: string | null
  is_active: boolean | null
  mythology_id: string | null
  participant_count: number | null
  scheduled_for: string | null
  slug: string
  title: string
  type: SceneType
  updated_at: string | null
}

/**
 * Form data for scenes
 * All fields are optional for partial updates
 */
export interface ScenesFormData {
  created_at?: string | null;
  creator_id?: string;
  description?: string;
  house?: CouncilHouse | null;
  id?: string;
  instructions?: string | null;
  is_active?: boolean | null;
  mythology_id?: string | null;
  participant_count?: number | null;
  scheduled_for?: string | null;
  slug?: string;
  title?: string;
  type?: SceneType;
  updated_at?: string | null;
}

/**
 * Validation result for scenes
 */
export interface ScenesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    creator_id?: string;
    description?: string;
    house?: string;
    id?: string;
    instructions?: string;
    is_active?: string;
    mythology_id?: string;
    participant_count?: string;
    scheduled_for?: string;
    slug?: string;
    title?: string;
    type?: string;
    updated_at?: string;
  };
}

