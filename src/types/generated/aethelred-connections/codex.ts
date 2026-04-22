// =====================================================
// FILE: types/generated/aethelred-connections/codex.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.803Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CodexRow = Tables<'codex'>;
export type CodexInsert = TablesInsert<'codex'>;
export type CodexUpdate = TablesUpdate<'codex'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of codex
 */
export interface PublicCodex {
  created_at: string | null;
  created_by: string | null;
  glossary: Json | null;
  id: string;
  knowledge_base: Json | null;
  learning_paths: Json | null;
  ontology_graph: Json | null;
  taxonomy_tree: Json | null;
  updated_at: string | null;
  wisdom_queue: Json | null;
}

/**
 * Form data for codex
 * All fields are optional for partial updates
 */
export interface CodexFormData {
  created_at?: string | null;
  created_by?: string | null;
  glossary?: Json | null;
  id?: string;
  knowledge_base?: Json | null;
  learning_paths?: Json | null;
  ontology_graph?: Json | null;
  taxonomy_tree?: Json | null;
  updated_at?: string | null;
  wisdom_queue?: Json | null;
}

