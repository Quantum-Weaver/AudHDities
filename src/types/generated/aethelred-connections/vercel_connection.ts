// =====================================================
// FILE: types/generated/aethelred-connections/vercel_connection.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.999Z
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

export type DeploymentStatus = Database['public']['Enums']['deployment_status'];
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
  created_by?: string | null;
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

