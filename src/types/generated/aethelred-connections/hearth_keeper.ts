// =====================================================
// FILE: types/generated/aethelred-connections/hearth_keeper.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.968Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type HearthKeeperRow = Tables<'hearth_keeper'>;
export type HearthKeeperInsert = TablesInsert<'hearth_keeper'>;
export type HearthKeeperUpdate = TablesUpdate<'hearth_keeper'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of hearth_keeper
 */
export interface PublicHearthKeeper {
  accessibility_standards: Json | null;
  created_at: string | null;
  created_by: string | null;
  crisis_resources: Json | null;
  id: string;
  moderators: string[] | null;
  reported_content_queue: Json | null;
  safety_protocols: Json | null;
  safety_score: number | null;
  updated_at: string | null;
  welcome_messages: Json | null;
}

/**
 * Form data for hearth_keeper
 * All fields are optional for partial updates
 */
export interface HearthKeeperFormData {
  accessibility_standards?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  crisis_resources?: Json | null;
  id?: string;
  moderators?: string[] | null;
  reported_content_queue?: Json | null;
  safety_protocols?: Json | null;
  safety_score?: number | null;
  updated_at?: string | null;
  welcome_messages?: Json | null;
}

