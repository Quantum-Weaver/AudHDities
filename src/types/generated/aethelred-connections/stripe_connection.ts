// =====================================================
// FILE: types/generated/aethelred-connections/stripe_connection.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.308Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type StripeConnectionRow = Tables<'stripe_connection'>;
export type StripeConnectionInsert = TablesInsert<'stripe_connection'>;
export type StripeConnectionUpdate = TablesUpdate<'stripe_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicStripeConnection = Omit<StripeConnectionRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type StripeConnectionFormData = Partial<StripeConnectionInsert>;

