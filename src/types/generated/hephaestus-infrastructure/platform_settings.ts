// =====================================================
// FILE: types/generated/hephaestus-infrastructure/platform_settings.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T21:41:40.295Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type PlatformSettingsRow = Tables<'platform_settings'>;
export type PlatformSettingsInsert = TablesInsert<'platform_settings'>;
export type PlatformSettingsUpdate = TablesUpdate<'platform_settings'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of platform_settings
 */
export interface PublicPlatformSettings {
  category: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_public: boolean;
  setting_key: string;
  setting_type: string | null;
  setting_value: Json | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for platform_settings
 * All fields are optional for partial updates
 */
export interface PlatformSettingsFormData {
  category?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_public?: boolean;
  setting_key?: string;
  setting_type?: string | null;
  setting_value?: Json | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for platform_settings
 */
export interface PlatformSettingsValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_public?: string;
    setting_key?: string;
    setting_type?: string;
    setting_value?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

