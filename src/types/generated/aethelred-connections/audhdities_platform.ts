// =====================================================
// FILE: types/generated/aethelred-connections/audhdities_platform.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.734Z
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

export type PlatformEnvironment = Database['public']['Enums']['platform_environment'];
export type PlatformStatus = Database['public']['Enums']['platform_status'];
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
  created_at: string | null;
  created_by: string | null;
  environment:;
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
  created_by?: string | null;
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

