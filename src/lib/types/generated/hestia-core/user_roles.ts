// =====================================================
// FILE: types/generated/hestia-core/user_roles.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T21:41:40.323Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type UserRole = Enums<'user_role'>;

export type UserRolesRow = Tables<'user_roles'>;
export type UserRolesInsert = TablesInsert<'user_roles'>;
export type UserRolesUpdate = TablesUpdate<'user_roles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of user_roles
 */
export interface PublicUserRoles {
  assigned_by: string | null;
  created_at: string;
  created_by: string | null;
  icon_emoji: string | null;
  id: string;
  role: UserRole;
  updated_at: string;
  updated_by: string | null;
  user_id: string;
}

/**
 * Form data for user_roles
 * All fields are optional for partial updates
 */
export interface UserRolesFormData {
  assigned_by?: string | null;
  created_at?: string;
  created_by?: string | null;
  icon_emoji?: string | null;
  id?: string;
  role?: UserRole;
  updated_at?: string;
  updated_by?: string | null;
  user_id?: string;
}

/**
 * Validation result for user_roles
 */
export interface UserRolesValidationResult {
  valid: boolean;
  errors: {
    assigned_by?: string;
    created_at?: string;
    created_by?: string;
    icon_emoji?: string;
    id?: string;
    role?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
  };
}

