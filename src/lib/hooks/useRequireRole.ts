// src/hooks/useRequireRole.ts
'use client';

import { usePermissions } from './usePermissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RequiredRole = 'admin' | 'artisan' | 'merchant';

export function useRequireRole(
  requiredRole: RequiredRole,
  redirectTo: string = '/sanctuary'
) {
  const { isAdmin, isArtisan, isMerchant, loading } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    let hasAccess = false;
    
    switch (requiredRole) {
      case 'admin':
        hasAccess = isAdmin;
        break;
      case 'artisan':
        hasAccess = isArtisan || isAdmin;
        break;
      case 'merchant':
        hasAccess = isMerchant || isAdmin;
        break;
    }

    if (!hasAccess) {
      router.push(redirectTo);
    }
  }, [isAdmin, isArtisan, isMerchant, loading, requiredRole, router, redirectTo]);

  return { isAdmin, isArtisan, isMerchant, loading };
}