// =====================================================
// FILE: types/generated/hermes-social/messages.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.580Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type MessagesRow = Tables<'messages'>;
export type MessagesInsert = TablesInsert<'messages'>;
export type MessagesUpdate = TablesUpdate<'messages'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicMessages = Omit<MessagesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type MessagesFormData = Partial<MessagesInsert>;

