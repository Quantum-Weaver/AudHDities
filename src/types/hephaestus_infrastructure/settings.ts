// =====================================================
// FILE: types/hephaestus_infrastructure/settings.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T21:55:13.083Z
// SOURCE: database.types.ts lines 4549-4587
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SettingScope = Database['public']['Enums']['setting_scope'];

export type SettingsRow = Database['public']['Tables']['settings']['Row'];
export type SettingsInsert = Database['public']['Tables']['settings']['Insert'];
export type SettingsUpdate = Database['public']['Tables']['settings']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of settings
 */
export interface PublicSettings {
  created_at: string | null;
  description: string | null;
  id: string;
  is_public: boolean | null;
  key: string;
  scope: SettingScope;
  scope_id: string | null;
  type: string;
  updated_at: string | null;
  value: Json;
}

/**
 * Form data for settings
 * All fields are optional for partial updates
 */
export interface SettingsFormData {
  created_at?: string | null;
  description?: string | null;
  id?: string;
  is_public?: boolean | null;
  key?: string;
  scope?: SettingScope;
  scope_id?: string | null;
  type?: string;
  updated_at?: string | null;
  value?: Json;
}

/**
 * Validation result for settings
 */
export interface SettingsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    description?: string;
    id?: string;
    is_public?: string;
    key?: string;
    scope?: string;
    scope_id?: string;
    type?: string;
    updated_at?: string;
    value?: string;
  };
}

