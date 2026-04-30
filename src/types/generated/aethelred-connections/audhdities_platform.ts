// =====================================================
// FILE: types/generated/aethelred-connections/audhdities_platform.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T04:17:47.009Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PlatformEnvironment = Enums<'platform_environment'>;
export type PlatformStatus = Enums<'platform_status'>;

export type AudhditiesPlatformRow = Tables<'audhdities_platform'>;
export type AudhditiesPlatformInsert = TablesInsert<'audhdities_platform'>;
export type AudhditiesPlatformUpdate = TablesUpdate<'audhdities_platform'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of audhdities_platform
 */
export interface PublicAudhditiesPlatform {
  active_users: number | null;
  audhdities_platform_id: string;
  created_at: string | null;
  created_by: string | null;
  environment: PlatformEnvironment | null;
  last_release_at: string | null;
  operated_by: string | null;
  release_name: string | null;
  release_notes: string | null;
  status: PlatformStatus | null;
  total_products: number | null;
  total_sales: number | null;
  total_users: number | null;
  updated_at: string | null;
  uptime_percent: number | null;
  version: string;
}

/**
 * Form data for audhdities_platform
 * All fields are optional for partial updates
 */
export interface AudhditiesPlatformFormData {
  active_users?: number | null;
  audhdities_platform_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  last_release_at?: string | null;
  operated_by?: string | null;
  release_name?: string | null;
  release_notes?: string | null;
  status?: PlatformStatus | null;
  total_products?: number | null;
  total_sales?: number | null;
  total_users?: number | null;
  updated_at?: string | null;
  uptime_percent?: number | null;
  version?: string;
}

/**
 * Validation result for audhdities_platform
 */
export interface AudhditiesPlatformValidationResult {
  valid: boolean;
  errors: {
    active_users?: string;
    audhdities_platform_id?: string;
    created_at?: string;
    created_by?: string;
    environment?: string;
    last_release_at?: string;
    operated_by?: string;
    release_name?: string;
    release_notes?: string;
    status?: string;
    total_products?: string;
    total_sales?: string;
    total_users?: string;
    updated_at?: string;
    uptime_percent?: string;
    version?: string;
  };
}

