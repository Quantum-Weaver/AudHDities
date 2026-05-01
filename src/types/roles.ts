// src/types/roles.ts
// =====================================================
// ROLES & PERMISSIONS - Based on user_tier and profile flags
// =====================================================

import type { Database } from './supabase/database.types';

export type UserTier = Database['public']['Enums']['user_tier'];

// =====================================================
// TIER DEFINITIONS
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
    value: 'community', 
    label: 'Community', 
    description: 'Subsidized access for neurodivergent members. The heart of the Sanctuary.',
    color: 'green',
    icon: '🌱',
    order: 1
  },
  { 
    value: 'ally', 
    label: 'Ally', 
    description: 'Standard pricing for supporters who fund community access.',
    color: 'purple',
    icon: '🤝',
    order: 2
  },
  { 
    value: 'corporate', 
    label: 'Corporate', 
    description: 'Premium pricing for organizations. Includes Bigot Tax™ where applicable.',
    color: 'pink',
    icon: '🏢',
    order: 3
  },
  { 
    value: 'council', 
    label: 'Council', 
    description: 'Sovereign collaborators, founding members, and the 9 entities.',
    color: 'gold',
    icon: '🏛️',
    order: 4
  }
];

export const USER_TIER_MAP = new Map(
  USER_TIERS.map(tier => [tier.value, tier])
);

// =====================================================
// ROLE TYPES
// =====================================================

export type UserRole = 'creator' | 'vendor' | 'admin' | 'community' | 'quantum_weaver' | 'council_entity';

export interface RoleFlags {
  isCreator: boolean;
  isVendor: boolean;
  isAdmin: boolean;
  isQuantumWeaver: boolean;              // From profiles.is_quantum_weaver
  userTier: UserTier;
}

export interface UserPermissions {
  canCreateProducts: boolean;
  canSellProducts: boolean;
  canModerate: boolean;
  canApprove: boolean;
  canAccessAdmin: boolean;
  canManageUsers: boolean;
  canAccessCouncilChamber: boolean;      // Special council-only spaces
  canCreateCouncilEntities: boolean;      // For Aethelred and the 9
  canSetBigotTax: boolean;               // Admin power to apply corporate pricing
}

// =====================================================
// PERMISSION CALCULATIONS
// =====================================================

export function getUserPermissions(flags: RoleFlags): UserPermissions {
  const { isCreator, isVendor, isAdmin, isQuantumWeaver, userTier } = flags;
  const isCouncilTier = userTier === 'council';
  
  return {
    // Creator capabilities
    canCreateProducts: isCreator || isAdmin || isQuantumWeaver,
    canSellProducts: isVendor || isAdmin || isQuantumWeaver,
    
    // Moderation & governance
    canModerate: isAdmin || isCouncilTier,
    canApprove: isAdmin || isCouncilTier,
    canAccessAdmin: isAdmin,
    canManageUsers: isAdmin,
    
    // Council & sovereign privileges
    canAccessCouncilChamber: isCouncilTier || isQuantumWeaver || isAdmin,
    canCreateCouncilEntities: isQuantumWeaver || isAdmin,  // Only Quantum Weaver creates entities
    canSetBigotTax: isAdmin,  // Only admins set corporate pricing rules
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
    userTier: isAdmin ? 'council' : isCreator ? 'ally' : 'community'
  });
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export function getTierLabel(tier: UserTier | string | null): string {
  if (!tier) return 'Community';
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
// TIER QUALIFICATION LOGIC
// =====================================================

export function qualifiesForCommunityTier(
  isDisabled: boolean,
  isNeurodivergent: boolean,
  isLowIncome: boolean
): boolean {
  return isDisabled || isNeurodivergent || isLowIncome;
}

export function getSuggestedTier(
  isDisabled: boolean,
  isNeurodivergent: boolean,
  isLowIncome: boolean,
  isOrganization: boolean
): UserTier {
  if (isOrganization) return 'corporate';
  if (qualifiesForCommunityTier(isDisabled, isNeurodivergent, isLowIncome)) return 'community';
  return 'ally';
}

// =====================================================
// ROLE CHECK FUNCTIONS
// =====================================================

export function isCouncilMember(userTier: UserTier | null): boolean {
  return userTier === 'council';
}

export function isQuantumWeaver(isQuantumWeaver: boolean): boolean {
  return isQuantumWeaver === true;
}

export function isCreator(isCreator: boolean): boolean {
  return isCreator === true;
}

export function isVendor(isVendor: boolean): boolean {
  return isVendor === true;
}

export function isAdmin(isAdmin: boolean): boolean {
  return isAdmin === true;
}