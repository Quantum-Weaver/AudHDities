// =====================================================
// FILE: types/generated/hephaestus-infrastructure/protocols.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.959Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ProtocolsRow = Tables<'protocols'>;
export type ProtocolsInsert = TablesInsert<'protocols'>;
export type ProtocolsUpdate = TablesUpdate<'protocols'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicProtocols = Omit<ProtocolsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ProtocolsFormData = Partial<ProtocolsInsert>;

