// =====================================================
// FILE: types/generated/hermes-social/notifications.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.366Z
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

export type NotificationType = Database['public']['Enums']['notification_type'];
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

