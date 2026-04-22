// =====================================================
// FILE: types/generated/aethelred-connections/codex.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.115Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CodexRow = Tables<'codex'>;
export type CodexInsert = TablesInsert<'codex'>;
export type CodexUpdate = TablesUpdate<'codex'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCodex = Omit<CodexRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CodexFormData = Partial<CodexInsert>;

