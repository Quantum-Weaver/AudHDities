// =====================================================
// FILE: types/generated/athena-gamification/quests.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.990Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type QuestsRow = Tables<'quests'>;
export type QuestsInsert = TablesInsert<'quests'>;
export type QuestsUpdate = TablesUpdate<'quests'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicQuests = Omit<QuestsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type QuestsFormData = Partial<QuestsInsert>;

