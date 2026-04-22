// =====================================================
// FILE: types/generated/hephaestus-infrastructure/protocols.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.447Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ProtocolType = Database['public']['Enums']['protocol_type'];
export type ProtocolsRow = Tables<'protocols'>;
export type ProtocolsInsert = TablesInsert<'protocols'>;
export type ProtocolsUpdate = TablesUpdate<'protocols'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of protocols
 */
export interface PublicProtocols {
  created_at: string | null;
  created_by: string | null;
  description: string;
  id: string;
  is_active: boolean | null;
  last_reviewed: string | null;
  name: string;
  next_review: string | null;
  owners: string[] | null;
  review_frequency_days: number | null;
  reviewed_by: string | null;
  slug: string;
  steps: Json;
  type: ProtocolType;
  updated_at: string | null;
  version: number | null;
}

/**
 * Form data for protocols
 * All fields are optional for partial updates
 */
export interface ProtocolsFormData {
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  id?: string;
  is_active?: boolean | null;
  last_reviewed?: string | null;
  name?: string;
  next_review?: string | null;
  owners?: string[] | null;
  review_frequency_days?: number | null;
  reviewed_by?: string | null;
  slug?: string;
  steps?: Json;
  type?: ProtocolType;
  updated_at?: string | null;
  version?: number | null;
}

