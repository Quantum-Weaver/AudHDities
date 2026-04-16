// app/hooks/useRequireRole.ts
'use client';

import { usePermissions } from './usePermissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RequiredRole = 'admin' | 'creator' | 'vendor';

export function useRequireRole(
  requiredRole: RequiredRole,
  redirectTo: string = '/gateway'
) {
  const { isAdmin, isCreator, isVendor, loading } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    let hasAccess = false;
    
    switch (requiredRole) {
      case 'admin':
        hasAccess = isAdmin;
        break;
      case 'creator':
        hasAccess = isCreator || isAdmin;
        break;
      case 'vendor':
        hasAccess = isVendor || isAdmin;
        break;
    }

    if (!hasAccess) {
      router.push(redirectTo);
    }
  }, [isAdmin, isCreator, isVendor, loading, requiredRole, router, redirectTo]);

  return { isAdmin, isCreator, isVendor, loading };
}