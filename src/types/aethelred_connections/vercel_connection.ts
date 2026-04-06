// =====================================================
// FILE: types/aethelred_connections/vercel_connection.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T21:55:13.129Z
// SOURCE: database.types.ts lines 5580-5641
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type DeploymentStatus = Database['public']['Enums']['deployment_status'];

export type VercelConnectionRow = Database['public']['Tables']['vercel_connection']['Row'];
export type VercelConnectionInsert = Database['public']['Tables']['vercel_connection']['Insert'];
export type VercelConnectionUpdate = Database['public']['Tables']['vercel_connection']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of vercel_connection
 */
export interface PublicVercelConnection {
  created_at: string | null;
  deployment_status: string | null;
  deployment_url: string;
  domain_config: Json | null;
  environment_variables: Json | null;
  id: string;
  last_deployment_at: string | null;
  last_deployment_id: string | null;
  operated_by: string | null;
  preview_urls: Json | null;
  project_id: string;
  project_name: string;
  updated_at: string | null;
}

/**
 * Form data for vercel_connection
 * All fields are optional for partial updates
 */
export interface VercelConnectionFormData {
  created_at?: string | null;
  deployment_url?: string;
  domain_config?: Json | null;
  environment_variables?: Json | null;
  id?: string;
  last_deployment_at?: string | null;
  last_deployment_id?: string | null;
  operated_by?: string | null;
  preview_urls?: Json | null;
  project_id?: string;
  project_name?: string;
  updated_at?: string | null;
}

/**
 * Validation result for vercel_connection
 */
export interface VercelConnectionValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    deployment_status?: string;
    deployment_url?: string;
    domain_config?: string;
    environment_variables?: string;
    id?: string;
    last_deployment_at?: string;
    last_deployment_id?: string;
    operated_by?: string;
    preview_urls?: string;
    project_id?: string;
    project_name?: string;
    updated_at?: string;
  };
}

