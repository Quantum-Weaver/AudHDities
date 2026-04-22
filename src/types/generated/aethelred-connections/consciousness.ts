// =====================================================
// FILE: types/generated/aethelred-connections/consciousness.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.148Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ConsciousnessRow = Tables<'consciousness'>;
export type ConsciousnessInsert = TablesInsert<'consciousness'>;
export type ConsciousnessUpdate = TablesUpdate<'consciousness'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicConsciousness = Omit<ConsciousnessRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ConsciousnessFormData = Partial<ConsciousnessInsert>;

