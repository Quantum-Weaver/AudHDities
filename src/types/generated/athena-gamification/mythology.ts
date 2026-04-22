// =====================================================
// FILE: types/generated/athena-gamification/mythology.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.352Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type MythType = Database['public']['Enums']['myth_type'];
export type MythologyRow = Tables<'mythology'>;
export type MythologyInsert = TablesInsert<'mythology'>;
export type MythologyUpdate = TablesUpdate<'mythology'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of mythology
 */
export interface PublicMythology {
  author_id: string;
  content: string;
  created_at: string | null;
  created_by: string | null;
  house: CouncilHouse | null;
  id: string;
  is_published: boolean | null;
  order_index: number | null;
  series_id: string | null;
  slug: string;
  title: string;
  type: MythType;
  updated_at: string | null;
}

/**
 * Form data for mythology
 * All fields are optional for partial updates
 */
export interface MythologyFormData {
  author_id?: string;
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  house?: CouncilHouse | null;
  id?: string;
  is_published?: boolean | null;
  order_index?: number | null;
  series_id?: string | null;
  slug?: string;
  title?: string;
  type?: MythType;
  updated_at?: string | null;
}

