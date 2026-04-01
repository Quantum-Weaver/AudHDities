// src/types/supabase/tables/subscriptions.ts
import type { Database } from '../database.types';
import type { SubscriptionStatus, SubscriptionTier } from '../enums';  // ← Add

export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert'];
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update'];

// Re-export for convenience
export type { SubscriptionStatus, SubscriptionTier };

export interface SubscriptionWithRelations extends Subscription {
  subscriber?: Database['public']['Tables']['profiles']['Row'];
  channel?: Database['public']['Tables']['channels']['Row'];
}

export const subscriptionDefaults = {
  status: 'active' as SubscriptionStatus,
} as const;