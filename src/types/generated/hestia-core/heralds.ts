// =====================================================
// FILE: types/generated/hestia-core/heralds.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-20T04:39:10.619Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type NotificationChannel = Enums<'notification_channel'>;

export type HeraldsRow = Tables<'heralds'>;
export type HeraldsInsert = TablesInsert<'heralds'>;
export type HeraldsUpdate = TablesUpdate<'heralds'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of heralds
 */
export interface PublicHeralds {
  body: string | null;
  channel: NotificationChannel;
  created_at: string;
  created_by: string;
  herald_type: string;
  id: string;
  is_dismissed: boolean;
  is_read: boolean;
  read_at: string | null;
  recipient: string | null;
  reference_id: string | null;
  reference_table: string | null;
  title: string | null;
  updated_by: string | null;
}

/**
 * Form data for heralds
 * All fields are optional for partial updates
 */
export interface HeraldsFormData {
  body?: string | null;
  channel?: NotificationChannel;
  created_at?: string;
  created_by?: string;
  herald_type?: string;
  id?: string;
  is_dismissed?: boolean;
  is_read?: boolean;
  read_at?: string | null;
  recipient?: string | null;
  reference_id?: string | null;
  reference_table?: string | null;
  title?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for heralds
 */
export interface HeraldsValidationResult {
  valid: boolean;
  errors: {
    body?: string;
    channel?: string;
    created_at?: string;
    created_by?: string;
    herald_type?: string;
    id?: string;
    is_dismissed?: string;
    is_read?: string;
    read_at?: string;
    recipient?: string;
    reference_id?: string;
    reference_table?: string;
    title?: string;
    updated_by?: string;
  };
}

