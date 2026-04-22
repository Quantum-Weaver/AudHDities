// =====================================================
// FILE: types/generated/athena-gamification/badges.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.066Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type BadgesRow = Tables<'badges'>;
export type BadgesInsert = TablesInsert<'badges'>;
export type BadgesUpdate = TablesUpdate<'badges'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicBadges = Omit<BadgesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type BadgesFormData = Partial<BadgesInsert>;

