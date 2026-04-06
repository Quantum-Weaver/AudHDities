// =====================================================
// FILE: types/hermes_social/notifications.ts
// HANDLING: full_crud
// DEITY: hermes_social
// GENERATED: 2026-04-05T21:55:13.017Z
// SOURCE: database.types.ts lines 2878-2933
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type NotificationType = Database['public']['Enums']['notification_type'];

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

