// =====================================================
// FILE: types/generated/aethelred-connections/vercel_connection.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.631Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type VercelConnectionRow = Tables<'vercel_connection'>;
export type VercelConnectionInsert = TablesInsert<'vercel_connection'>;
export type VercelConnectionUpdate = TablesUpdate<'vercel_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicVercelConnection = Omit<VercelConnectionRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type VercelConnectionFormData = Partial<VercelConnectionInsert>;

