// app/components/auth/ProtectedRoute.tsx
'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRequireRole } from '@/hooks/useRequireRole';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'creator' | 'vendor';
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  redirectTo = '/questionaire' 
}: ProtectedRouteProps) {
  const { loading: authLoading } = useRequireAuth(redirectTo);
  const { loading: roleLoading } = useRequireRole(requiredRole || 'admin', redirectTo);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Loading sanctuary...</div>
      </div>
    );
  }

  return <>{children}</>;
}