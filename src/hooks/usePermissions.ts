// src/hooks/usePermissions.ts
'use client';

import { useAuth } from './useAuth';
import { useMemo } from 'react';

export function usePermissions() {
  const { user, profile, loading } = useAuth();

  const isAdmin = profile?.is_admin === true;
  const isCreator = profile?.is_creator === true;
  const isVendor = profile?.is_vendor === true;
  const isCommunity = profile?.user_tier === 'community' || profile?.user_tier === 'council';

  const can = useMemo(() => ({
    viewAll: isAdmin,
    editAny: isAdmin,
    createProducts: isCreator || isAdmin,
    createVendorItems: isVendor || isAdmin,
    moderate: isAdmin,
    accessCommunityTier: isCommunity,
  }), [isAdmin, isCreator, isVendor, isCommunity]);

  return { isAdmin, isCreator, isVendor, isCommunity, can, loading };
}