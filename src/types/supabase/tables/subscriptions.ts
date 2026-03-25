// src/types/supabase/tables/subscriptions.ts
import type { Database } from '../database.types';

export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert'];
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update'];

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';
export type SubscriptionTier = 'community' | 'ally' | 'corporate' | 'patron';

export interface SubscriptionWithRelations extends Subscription {
  subscriber?: Database['public']['Tables']['profiles']['Row'];
  channel?: Database['public']['Tables']['channels']['Row'];
}

export const subscriptionDefaults = {
  status: 'active' as const,
} as const;