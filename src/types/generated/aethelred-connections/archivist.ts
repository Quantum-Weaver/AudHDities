// =====================================================
// FILE: types/generated/aethelred-connections/archivist.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.043Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ArchivistRow = Tables<'archivist'>;
export type ArchivistInsert = TablesInsert<'archivist'>;
export type ArchivistUpdate = TablesUpdate<'archivist'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicArchivist = Omit<ArchivistRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ArchivistFormData = Partial<ArchivistInsert>;

