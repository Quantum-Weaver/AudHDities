// =====================================================
// FILE: types/generated/athena-gamification/learning_paths.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T17:34:19.682Z
// SOURCE: database.types.ts lines 2945-3017
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type DifficultyLevel = Database['public']['Enums']['difficulty_level'];
export type CouncilHouse = Database['public']['Enums']['council_house'];

// =====================================================
// CORE TYPES
// =====================================================

export type LearningPathsRow = Database['public']['Tables']['learning_paths']['Row'];
export type LearningPathsInsert = Database['public']['Tables']['learning_paths']['Insert'];
export type LearningPathsUpdate = Database['public']['Tables']['learning_paths']['Update'];

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
    id?: string;
    is_published?: string;
    prerequisite_path_id?: string;
    slug?: string;
    title?: string;
    updated_at?: string;
  };
}

