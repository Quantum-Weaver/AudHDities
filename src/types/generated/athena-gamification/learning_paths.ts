// =====================================================
// FILE: types/generated/athena-gamification/learning_paths.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.478Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type LearningPathsRow = Tables<'learning_paths'>;
export type LearningPathsInsert = TablesInsert<'learning_paths'>;
export type LearningPathsUpdate = TablesUpdate<'learning_paths'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicLearningPaths = Omit<LearningPathsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type LearningPathsFormData = Partial<LearningPathsInsert>;

