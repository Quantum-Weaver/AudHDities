// =====================================================
// FILE: types/generated/hermes-social/notifications.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-04-30T00:26:46.178Z
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

export type NotificationType = Enums<'notification_type'>;

export type NotificationsRow = Tables<'notifications'>;
export type NotificationsInsert = TablesInsert<'notifications'>;
export type NotificationsUpdate = TablesUpdate<'notifications'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of notifications
 */
export interface PublicNotifications {
  action_label: string | null;
  action_url: string | null;
  body: string;
  created_at: string | null;
  created_by: string | null;
  id: string;
  is_read: boolean | null;
  metadata: Json | null;
  read_at: string | null;
  related_entity_id: string | null;
  related_entity_type: string | null;
  title: string;
  type: NotificationType;
  user_id: string;
}

/**
 * Form data for notifications
 * All fields are optional for partial updates
 */
export interface NotificationsFormData {
  action_label?: string | null;
  action_url?: string | null;
  body?: string;
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  is_read?: boolean | null;
  metadata?: Json | null;
  read_at?: string | null;
  related_entity_id?: string | null;
  related_entity_type?: string | null;
  title?: string;
  type?: NotificationType;
  user_id?: string;
}

/**
 * Validation result for notifications
 */
export interface NotificationsValidationResult {
  valid: boolean;
  errors: {
    action_label?: string;
    action_url?: string;
    body?: string;
    created_at?: string;
    created_by?: string;
    id?: string;
    is_read?: string;
    metadata?: string;
    read_at?: string;
    related_entity_id?: string;
    related_entity_type?: string;
    title?: string;
    type?: string;
    user_id?: string;
  };
}

