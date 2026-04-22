// =====================================================
// FILE: types/generated/athena-gamification/scenes.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.807Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type SceneType = Database['public']['Enums']['scene_type'];
export type ScenesRow = Tables<'scenes'>;
export type ScenesInsert = TablesInsert<'scenes'>;
export type ScenesUpdate = TablesUpdate<'scenes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scenes
 */
export interface PublicScenes {
  created_at: string | null;
  created_by: string | null;
  creator_id: string;
  description: string;
  house: CouncilHouse | null;
  id: string;
  instructions: string | null;
  is_active: boolean | null;
  mythology_id: string | null;
  participant_count: number | null;
  scheduled_for: string | null;
  slug: string;
  title: string;
  type: SceneType;
  updated_at: string | null;
}

/**
 * Form data for scenes
 * All fields are optional for partial updates
 */
export interface ScenesFormData {
  created_at?: string | null;
  created_by?: string | null;
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

