// =====================================================
// FILE: types/generated/themis-governance/council_houses.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-08-01T16:03:06.409Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type CouncilHousesRow = Tables<'council_houses'>;
export type CouncilHousesInsert = TablesInsert<'council_houses'>;
export type CouncilHousesUpdate = TablesUpdate<'council_houses'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of council_houses
 */
export interface PublicCouncilHouses {
  created_at: string;
  created_by: string | null;
  deity_alignment: string | null;
  description: string | null;
  display_order: number;
  house_type: string | null;
  icon_url: string | null;
  id: string;
  member_count: number;
  name: string;
  related_protocols: string[] | null;
  responsibilities: Json | null;
  seat_limit: number | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for council_houses
 * All fields are optional for partial updates
 */
export interface CouncilHousesFormData {
  created_at?: string;
  created_by?: string | null;
  deity_alignment?: string | null;
  description?: string | null;
  display_order?: number;
  house_type?: string | null;
  icon_url?: string | null;
  id?: string;
  member_count?: number;
  name?: string;
  related_protocols?: string[] | null;
  responsibilities?: Json | null;
  seat_limit?: number | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for council_houses
 */
export interface CouncilHousesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    deity_alignment?: string;
    description?: string;
    display_order?: string;
    house_type?: string;
    icon_url?: string;
    id?: string;
    member_count?: string;
    name?: string;
    related_protocols?: string;
    responsibilities?: string;
    seat_limit?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

