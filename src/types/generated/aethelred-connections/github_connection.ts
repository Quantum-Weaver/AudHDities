// =====================================================
// FILE: types/generated/aethelred-connections/github_connection.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.427Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type GithubConnectionRow = Tables<'github_connection'>;
export type GithubConnectionInsert = TablesInsert<'github_connection'>;
export type GithubConnectionUpdate = TablesUpdate<'github_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicGithubConnection = Omit<GithubConnectionRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type GithubConnectionFormData = Partial<GithubConnectionInsert>;

