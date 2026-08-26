// src/hooks/usePermissions.ts
'use client';

import { useUser } from './useUser';
import { useMemo } from 'react';

export function usePermissions() {
  const { roles, sovereignTier, isLoading } = useUser();

  const isAdmin = roles.includes('admin');
  const isCreator = roles.includes('creator');
  const isVendor = roles.includes('vendor');
  const isCommunity = roles.includes('community') || roles.includes('council') || sovereignTier !== null;

  const can = useMemo(() => ({
    viewAll: isAdmin,
    editAny: isAdmin,
    createProducts: isCreator || isAdmin,
    createVendorItems: isVendor || isAdmin,
    moderate: isAdmin,
    accessCommunityTier: isCommunity,
  }), [isAdmin, isCreator, isVendor, isCommunity]);

  return { isAdmin, isCreator, isVendor, isCommunity, can, loading: isLoading };
}
