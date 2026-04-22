// =====================================================
// FILE: types/generated/hermes-social/emeralds.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.328Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type EmeraldsRow = Tables<'emeralds'>;
export type EmeraldsInsert = TablesInsert<'emeralds'>;
export type EmeraldsUpdate = TablesUpdate<'emeralds'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicEmeralds = Omit<EmeraldsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type EmeraldsFormData = Partial<EmeraldsInsert>;

