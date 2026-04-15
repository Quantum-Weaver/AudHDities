// =====================================================
// FILE: types/generated/hermes-social/notifications.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.497Z
// SOURCE: database.types.ts lines 3353-3418
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type NotificationType = Database['public']['Enums']['notification_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type NotificationsRow = Database['public']['Tables']['notifications']['Row'];
export type NotificationsInsert = Database['public']['Tables']['notifications']['Insert'];
export type NotificationsUpdate = Database['public']['Tables']['notifications']['Update'];

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
  "read_at": string | null;
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

