// =====================================================
// FILE: types/generated/athena-gamification/learning_paths.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-05-01T03:24:41.542Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type DifficultyLevel = Enums<'difficulty_level'>;
export type CouncilHouse = Enums<'council_house'>;

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
  is_published: boolean | null;
  learning_paths_id: string;
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
  is_published?: boolean | null;
  learning_paths_id?: string;
  prerequisite_path_id?: string | null;
  slug?: string;
  title?: string;
  updated_at?: string | null;
}

/**
 * Validation result for learning_paths
 */
export interface LearningPathsValidationResult {
  valid: boolean;
  errors: {
    cover_image?: string;
    created_at?: string;
    created_by?: string;
    creator_id?: string;
    description?: string;
    difficulty?: string;
    estimated_duration_hours?: string;
    house?: string;
    is_published?: string;
    learning_paths_id?: string;
    prerequisite_path_id?: string;
    slug?: string;
    title?: string;
    updated_at?: string;
  };
}

