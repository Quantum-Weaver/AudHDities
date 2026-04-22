// =====================================================
// FILE: types/generated/aethelred-connections/audhdities_platform.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.054Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type AudhditiesPlatformRow = Tables<'audhdities_platform'>;
export type AudhditiesPlatformInsert = TablesInsert<'audhdities_platform'>;
export type AudhditiesPlatformUpdate = TablesUpdate<'audhdities_platform'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicAudhditiesPlatform = Omit<AudhditiesPlatformRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type AudhditiesPlatformFormData = Partial<AudhditiesPlatformInsert>;

