// =====================================================
// FILE: types/generated/hestia-core/entity_state_log.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.342Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type EntityStateLogRow = Tables<'entity_state_log'>;
export type EntityStateLogInsert = TablesInsert<'entity_state_log'>;
export type EntityStateLogUpdate = TablesUpdate<'entity_state_log'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicEntityStateLog = Omit<EntityStateLogRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type EntityStateLogFormData = Partial<EntityStateLogInsert>;

