// =====================================================
// FILE: types/generated/athena-gamification/path_lessons.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.749Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type PathLessonsRow = Tables<'path_lessons'>;
export type PathLessonsInsert = TablesInsert<'path_lessons'>;
export type PathLessonsUpdate = TablesUpdate<'path_lessons'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicPathLessons = Omit<PathLessonsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type PathLessonsFormData = Partial<PathLessonsInsert>;

