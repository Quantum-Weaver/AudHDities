// =====================================================
// FILE: types/generated/mnemosyne-assessment/folksonomy.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.411Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type FolksonomyRow = Tables<'folksonomy'>;
export type FolksonomyInsert = TablesInsert<'folksonomy'>;
export type FolksonomyUpdate = TablesUpdate<'folksonomy'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicFolksonomy = Omit<FolksonomyRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type FolksonomyFormData = Partial<FolksonomyInsert>;

