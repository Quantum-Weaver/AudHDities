// src/types/roles.ts
// types/roles.ts
// Based on Database['public']['Enums']['user_tier'] and profile flags

import type { Database } from './supabase/database.types';

export type UserTier = Database['public']['Enums']['user_tier'];

export const USER_TIERS: { value: UserTier; label: string; description: string; color: string }[] = [
  { 
    value: 'community', 
    label: 'Community', 
    description: 'Subsidized access for neurodivergent members',
    color: 'green'
  },
  { 
    value: 'ally', 
    label: 'Ally', 
    description: 'Standard pricing for supporters',
    color: 'purple'
  },
  { 
    value: 'corporate', 
    label: 'Corporate', 
    description: 'Premium pricing for organizations',
    color: 'pink'
  }
];

export const USER_TIER_MAP = new Map(
  USER_TIERS.map(tier => [tier.value, tier])
);

export type UserRole = 'creator' | 'vendor' | 'admin' | 'community';

export interface UserPermissions {
  canCreateProducts: boolean;
  canSellProducts: boolean;
  canModerate: boolean;
  canApprove: boolean;
  canAccessAdmin: boolean;
  canManageUsers: boolean;
}

export function getUserPermissions(
  isCreator: boolean,
  isVendor: boolean,
  isAdmin: boolean
): UserPermissions {
  return {
    canCreateProducts: isCreator || isAdmin,
    canSellProducts: isVendor || isAdmin,
    canModerate: isAdmin,
    canApprove: isAdmin,
    canAccessAdmin: isAdmin,
    canManageUsers: isAdmin,
  };
}