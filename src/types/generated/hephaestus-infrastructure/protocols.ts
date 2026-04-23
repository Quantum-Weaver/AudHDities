// =====================================================
// FILE: types/generated/hephaestus-infrastructure/protocols.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-23T02:14:53.301Z
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

export type ProtocolType = Enums<'protocol_type'>;

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

/**
 * Validation result for protocols
 */
export interface ProtocolsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_active?: string;
    last_reviewed?: string;
    name?: string;
    next_review?: string;
    owners?: string;
    review_frequency_days?: string;
    reviewed_by?: string;
    slug?: string;
    steps?: string;
    type?: string;
    updated_at?: string;
    version?: string;
  };
}

