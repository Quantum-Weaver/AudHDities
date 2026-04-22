// =====================================================
// FILE: types/generated/athena-gamification/lessons.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.510Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type LessonsRow = Tables<'lessons'>;
export type LessonsInsert = TablesInsert<'lessons'>;
export type LessonsUpdate = TablesUpdate<'lessons'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicLessons = Omit<LessonsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type LessonsFormData = Partial<LessonsInsert>;

