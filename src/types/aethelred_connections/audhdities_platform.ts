// =====================================================
// FILE: types/aethelred_connections/audhdities_platform.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T21:55:12.927Z
// SOURCE: database.types.ts lines 571-638
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PlatformEnvironment = Database['public']['Enums']['platform_environment'];
export type PlatformStatus = Database['public']['Enums']['platform_status'];

export type AudhditiesPlatformRow = Database['public']['Tables']['audhdities_platform']['Row'];
export type AudhditiesPlatformInsert = Database['public']['Tables']['audhdities_platform']['Insert'];
export type AudhditiesPlatformUpdate = Database['public']['Tables']['audhdities_platform']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of audhdities_platform
 */
export interface PublicAudhditiesPlatform {
  active_users: number | null;
  created_at: string | null;
  environment: string | null;
  id: string;
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
  created_at?: string | null;
  id?: string;
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
    created_at?: string;
    environment?: string;
    id?: string;
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

