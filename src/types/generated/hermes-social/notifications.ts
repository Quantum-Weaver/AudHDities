// =====================================================
// FILE: types/generated/hermes-social/notifications.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.704Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type NotificationsRow = Tables<'notifications'>;
export type NotificationsInsert = TablesInsert<'notifications'>;
export type NotificationsUpdate = TablesUpdate<'notifications'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicNotifications = Omit<NotificationsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type NotificationsFormData = Partial<NotificationsInsert>;

