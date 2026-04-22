// =====================================================
// FILE: types/generated/aethelred-connections/supabase_connection.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.338Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SupabaseConnectionRow = Tables<'supabase_connection'>;
export type SupabaseConnectionInsert = TablesInsert<'supabase_connection'>;
export type SupabaseConnectionUpdate = TablesUpdate<'supabase_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSupabaseConnection = Omit<SupabaseConnectionRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SupabaseConnectionFormData = Partial<SupabaseConnectionInsert>;

