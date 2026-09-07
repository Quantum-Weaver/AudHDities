// src/hooks/usePermissions.ts
'use client';

import { useUser } from './useUser';
import { useMemo } from 'react';

export function usePermissions() {
  const { roles, sovereignTier, isLoading } = useUser();

  const isAdmin = roles.includes('admin');
  const isArtisan = roles.includes('artisan');
  const isMerchant = roles.includes('merchant');
  const isCommunity = roles.includes('community') || roles.includes('council') || sovereignTier !== null;

  const can = useMemo(() => ({
    viewAll: isAdmin,
    editAny: isAdmin,
    createProducts: isArtisan || isAdmin,
    createVendorItems: isMerchant || isAdmin,
    moderate: isAdmin,
    accessCommunityTier: isCommunity,
  }), [isAdmin, isArtisan, isMerchant, isCommunity]);

  return { isAdmin, isArtisan, isMerchant, isCommunity, can, loading: isLoading };
}
