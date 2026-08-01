// =====================================================
// FILE: types/generated/themis-governance/protocols.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-08-01T16:03:06.837Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  content: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  name: string;
  priority: string;
  protocol_type: string | null;
  slug: string;
  status: ContentStatus;
  supersedes: string | null;
  updated_at: string;
  updated_by: string | null;
  version: string;
}

/**
 * Form data for protocols
 * All fields are optional for partial updates
 */
export interface ProtocolsFormData {
  content?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  name?: string;
  priority?: string;
  protocol_type?: string | null;
  slug?: string;
  status?: ContentStatus;
  supersedes?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  version?: string;
}

/**
 * Validation result for protocols
 */
export interface ProtocolsValidationResult {
  valid: boolean;
  errors: {
    content?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    name?: string;
    priority?: string;
    protocol_type?: string;
    slug?: string;
    status?: string;
    supersedes?: string;
    updated_at?: string;
    updated_by?: string;
    version?: string;
  };
}

