// =====================================================
// FILE: types/generated/themis-governance/moderation_actions.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.601Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ModerationActionsRow = Tables<'moderation_actions'>;
export type ModerationActionsInsert = TablesInsert<'moderation_actions'>;
export type ModerationActionsUpdate = TablesUpdate<'moderation_actions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicModerationActions = Omit<ModerationActionsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ModerationActionsFormData = Partial<ModerationActionsInsert>;

