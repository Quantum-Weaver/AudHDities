// =====================================================
// FILE: types/generated/hephaestus-infrastructure/platform_config.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T17:49:54.593Z
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

export type PlatformConfigRow = Tables<'platform_config'>;
export type PlatformConfigInsert = TablesInsert<'platform_config'>;
export type PlatformConfigUpdate = TablesUpdate<'platform_config'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of platform_config
 */
export interface PublicPlatformConfig {
  category: string;
  config_key: string;
  config_type: string;
  config_value: Json;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_public: boolean;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for platform_config
 * All fields are optional for partial updates
 */
export interface PlatformConfigFormData {
  category?: string;
  config_key?: string;
  config_type?: string;
  config_value?: Json;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_public?: boolean;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for platform_config
 */
export interface PlatformConfigValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    config_key?: string;
    config_type?: string;
    config_value?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_public?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

