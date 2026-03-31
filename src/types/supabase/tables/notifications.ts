// src/types/supabase/tables/notifications.ts
import type { Database } from '../database.types';
import type { NotificationType } from '../enums';  // ← Add this import

export type Notification = Database['public']['Tables']['notifications']['Row'];
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update'];


// Re-export for convenience
export type { NotificationType };

export interface NotificationWithRelations extends Notification {
  user?: Database['public']['Tables']['profiles']['Row'];
}

export const notificationDefaults = {
  is_read: false,
  metadata: {},
} as const;