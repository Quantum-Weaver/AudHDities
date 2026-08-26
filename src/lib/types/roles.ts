// src/types/roles.ts
// =====================================================
// =====================================================

import type { Database } from '../generated/supabase/database.types';

export type UserTier = Database['public']['Enums']['sovereign_tier'];

// =====================================================
// TIER DEFINITIONS — the sovereignty journey
// =====================================================

export const USER_TIERS: {
  value: UserTier;
  label: string;
  description: string;
  color: string;
  icon: string;
  order: number;
}[] = [
  {
    value: 'dweller',
    label: 'Dweller',
    description: 'Every journey begins with a single step. Welcome home.',
    color: 'green',
    icon: '🌱',
    order: 1
  },
  {
    value: 'guild',
    label: 'Guild',
    description: 'Kindred found. Your light grows stronger among the guild.',
    color: 'purple',
    icon: '🤝',
    order: 2
  },
  {
    value: 'outlander',
    label: 'Outlander',
    description: 'Paths of your own making. The far reaches open.',
    color: 'cyan',
    icon: '🧭',
    order: 3
  },
  {
    value: 'sovereign_weaver',
    label: 'Sovereign Weaver',
    description: 'You radiate sovereign light. The loom answers your hand.',
    color: 'gold',
    icon: '🏛️',
    order: 4
  }
];

export const USER_TIER_MAP = new Map(
  USER_TIERS.map(tier => [tier.value, tier])
);

// =====================================================
// ROLE TYPES — user_roles rows
// =====================================================

export type UserRole = Database['public']['Enums']['user_role'];

export interface RoleFlags {
  isCreator: boolean;
  isVendor: boolean;
  isAdmin: boolean;
  isQuantumWeaver: boolean; // sovereign_tier === 'sovereign_weaver'
  userTier: UserTier;
  roles?: UserRole[];
}

export interface UserPermissions {
  canCreateProducts: boolean;
  canSellProducts: boolean;
  canModerate: boolean;
  canApprove: boolean;
  canAccessAdmin: boolean;
  canManageUsers: boolean;
  canAccessCouncilChamber: boolean;
  canCreateCouncilEntities: boolean;
}

// =====================================================
// PERMISSION CALCULATIONS
// =====================================================

export function getUserPermissions(flags: RoleFlags): UserPermissions {
  const { isCreator, isVendor, isAdmin, isQuantumWeaver, roles } = flags;
  const isCouncil = roles?.includes('council') ?? false;

  return {
    // Creator capabilities
    canCreateProducts: isCreator || isAdmin || isQuantumWeaver,
    canSellProducts: isVendor || isAdmin || isQuantumWeaver,

    // Moderation & governance
    canModerate: isAdmin || isCouncil,
    canApprove: isAdmin || isCouncil,
    canAccessAdmin: isAdmin,
    canManageUsers: isAdmin,

    // Council & sovereign privileges
    canAccessCouncilChamber: isCouncil || isQuantumWeaver || isAdmin,
    canCreateCouncilEntities: isQuantumWeaver || isAdmin,
  };
}

// Legacy function signature for backward compatibility
export function getUserPermissionsLegacy(
  isCreator: boolean,
  isVendor: boolean,
  isAdmin: boolean
): UserPermissions {
  return getUserPermissions({
    isCreator,
    isVendor,
    isAdmin,
    isQuantumWeaver: false,
    userTier: 'dweller',
    roles: isAdmin ? ['admin'] : [],
  });
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export function getTierLabel(tier: UserTier | string | null): string {
  if (!tier) return 'Dweller';
  return USER_TIER_MAP.get(tier as UserTier)?.label || tier;
}

export function getTierColor(tier: UserTier | string | null): string {
  if (!tier) return 'green';
  return USER_TIER_MAP.get(tier as UserTier)?.color || 'gray';
}

export function getTierIcon(tier: UserTier | string | null): string {
  if (!tier) return '🌱';
  return USER_TIER_MAP.get(tier as UserTier)?.icon || '✨';
}

export function getTierDescription(tier: UserTier | string | null): string {
  if (!tier) return 'Welcome to the Sanctuary';
  return USER_TIER_MAP.get(tier as UserTier)?.description || '';
}

export function getTierOrder(tier: UserTier | string | null): number {
  if (!tier) return 1;
  return USER_TIER_MAP.get(tier as UserTier)?.order || 99;
}

export function getSortedTiers(): typeof USER_TIERS {
  return [...USER_TIERS].sort((a, b) => a.order - b.order);
}

// =====================================================
// ROLE CHECK FUNCTIONS
// =====================================================

export function isCouncilMember(roles: UserRole[] | null | undefined): boolean {
  return roles?.includes('council') ?? false;
}

export function isQuantumWeaver(tier: UserTier | null | undefined): boolean {
  return tier === 'sovereign_weaver';
}
