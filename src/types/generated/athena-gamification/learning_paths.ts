// =====================================================
// FILE: types/generated/athena-gamification/learning_paths.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.994Z
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

export type DifficultyLevel = Database['public']['Enums']['difficulty_level'];
export type CouncilHouse = Database['public']['Enums']['council_house'];
export type LearningPathsRow = Tables<'learning_paths'>;
export type LearningPathsInsert = TablesInsert<'learning_paths'>;
export type LearningPathsUpdate = TablesUpdate<'learning_paths'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of learning_paths
 */
export interface PublicLearningPaths {
  cover_image: string | null;
  created_at: string | null;
  created_by: string | null;
  creator_id: string;
  description: string;
  difficulty: DifficultyLevel;
  estimated_duration_hours: number | null;
  house: CouncilHouse | null;
  id: string;
  is_published: boolean | null;
  prerequisite_path_id: string | null;
  slug: string;
  title: string;
  updated_at: string | null;
}

/**
 * Form data for learning_paths
 * All fields are optional for partial updates
 */
export interface LearningPathsFormData {
  cover_image?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  creator_id?: string;
  description?: string;
  difficulty?: DifficultyLevel;
  estimated_duration_hours?: number | null;
  house?: CouncilHouse | null;
  id?: string;
  is_published?: boolean | null;
  prerequisite_path_id?: string | null;
  slug?: string;
  title?: string;
  updated_at?: string | null;
}

