// =====================================================
// FILE: types/generated/athena-gamification/learning_paths.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-07-20T04:39:10.643Z
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
  created_at: string;
  created_by: string | null;
  description: string | null;
  difficulty: string | null;
  display_order: number;
  estimated_duration: string | null;
  icon_url: string | null;
  id: string;
  name: string;
  path_type: string | null;
  prerequisites: Json | null;
  rewards: Json | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for learning_paths
 * All fields are optional for partial updates
 */
export interface LearningPathsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  difficulty?: string | null;
  display_order?: number;
  estimated_duration?: string | null;
  icon_url?: string | null;
  id?: string;
  name?: string;
  path_type?: string | null;
  prerequisites?: Json | null;
  rewards?: Json | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for learning_paths
 */
export interface LearningPathsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    difficulty?: string;
    display_order?: string;
    estimated_duration?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    path_type?: string;
    prerequisites?: string;
    rewards?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

