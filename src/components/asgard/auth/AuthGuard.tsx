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
  AUTH_REDIRECT_PARAM,
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

// A ?redirect= is followed only when it is ours: a same-origin path, or an
// absolute URL on audhdities.com or one of its subdomains. Read from the
// window inside the effect, so no Suspense boundary is owed to useSearchParams.
function sameSiteRedirect(): string | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get(AUTH_REDIRECT_PARAM);
  if (!raw) return null;
  if (raw.startsWith('/') && !raw.startsWith('//')) return raw;
  try {
    const u = new URL(raw);
    const host = u.hostname.toLowerCase();
    if (u.protocol === 'https:' && (host === 'audhdities.com' || host.endsWith('.audhdities.com'))) {
      return u.toString();
    }
  } catch {
    // not a URL
  }
  return null;
}

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
      // Already signed in on arrival: honour a ?redirect= that names our own
      // site (a path, or the artifacts host — the door sends visitors here
      // with the page they wanted), else the dashboard. 2026-08-27.
      router.push(sameSiteRedirect() ?? AUTH_ROUTES.DASHBOARD);
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