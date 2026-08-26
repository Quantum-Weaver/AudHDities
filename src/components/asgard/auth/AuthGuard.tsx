/* @/components/asgard/auth/AuthGuard.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH GUARD                                             ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { AuthGuardProps } from '@/types/components/asgard/auth/auth.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  AUTH_ERRORS,
  AUTH_ERROR_PARAM,
  AUTH_LABELS,
  AUTH_ROUTES,
} from '@/lib/constants/components/asgard/auth/auth.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  authLoadingVariants,
  authSpinnerVariants,
  authLoadingTextVariants,
} from '@/lib/constants/components/asgard/auth/auth.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = AUTH_ROUTES.LOGIN,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const signedInOnArrival = useRef<boolean | null>(null);

  useEffect(() => {
    if (loading) return;

    if (signedInOnArrival.current === null) signedInOnArrival.current = !!user;

    if (requireAuth && !user) {
      const target = buildRedirectUrl(redirectTo, pathname);
      router.push(
        pathname === AUTH_ROUTES.RESET_PASSWORD
          ? `${target}&${AUTH_ERROR_PARAM}=${AUTH_ERRORS.RECOVERY_MISSING}`
          : target
      );
    } else if (!requireAuth && user && signedInOnArrival.current) {
      router.push(AUTH_ROUTES.DASHBOARD);
    }
  }, [user, loading, requireAuth, redirectTo, router, pathname]);

  if (loading) {
    return (
      <div className={authLoadingVariants()}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className={authSpinnerVariants({ size: 'default' })} />
          <span className={authLoadingTextVariants()}>
            {AUTH_LABELS.LOADING}
          </span>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) return null;

  return <>{children}</>;
}