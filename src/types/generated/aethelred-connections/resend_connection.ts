// =====================================================
// FILE: types/generated/aethelred-connections/resend_connection.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.076Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ResendConnectionRow = Tables<'resend_connection'>;
export type ResendConnectionInsert = TablesInsert<'resend_connection'>;
export type ResendConnectionUpdate = TablesUpdate<'resend_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicResendConnection = Omit<ResendConnectionRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ResendConnectionFormData = Partial<ResendConnectionInsert>;

