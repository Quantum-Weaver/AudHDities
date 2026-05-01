// =====================================================
// FILE: types/generated/aethelred-connections/vercel_connection.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T15:31:59.975Z
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

export type DeploymentStatus = Enums<'deployment_status'>;

export type VercelConnectionRow = Tables<'vercel_connection'>;
export type VercelConnectionInsert = TablesInsert<'vercel_connection'>;
export type VercelConnectionUpdate = TablesUpdate<'vercel_connection'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vercel_connection
 */
export interface PublicVercelConnection {
  created_at: string | null;
  created_by: string | null;
  deployment_status:;
  deployment_url: string;
  domain_config: Json | null;
  environment_variables: Json | null;
  last_deployment_at: string | null;
  last_deployment_id: string | null;
  operated_by: string | null;
  preview_urls: Json | null;
  project_id: string;
  project_name: string;
  updated_at: string | null;
  vercel_connection_id: string;
}

/**
 * Form data for vercel_connection
 * All fields are optional for partial updates
 */
export interface VercelConnectionFormData {
  created_at?: string | null;
  created_by?: string | null;
  deployment_url?: string;
  domain_config?: Json | null;
  environment_variables?: Json | null;
  last_deployment_at?: string | null;
  last_deployment_id?: string | null;
  operated_by?: string | null;
  preview_urls?: Json | null;
  project_id?: string;
  project_name?: string;
  updated_at?: string | null;
  vercel_connection_id?: string;
}

/**
 * Validation result for vercel_connection
 */
export interface VercelConnectionValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    deployment_status?: string;
    deployment_url?: string;
    domain_config?: string;
    environment_variables?: string;
    last_deployment_at?: string;
    last_deployment_id?: string;
    operated_by?: string;
    preview_urls?: string;
    project_id?: string;
    project_name?: string;
    updated_at?: string;
    vercel_connection_id?: string;
  };
}

