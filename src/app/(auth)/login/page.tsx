/* @/app/(auth)/login/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LOGIN PAGE                                             ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/asgard/auth/LoginForm';
import AuthGuard from '@/components/asgard/auth/AuthGuard';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  AUTH_METADATA,
  AUTH_LABELS,
  AUTH_ROUTES,
} from '@/lib/constants/components/asgard/auth/auth.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  authPageVariants,
  authPageContentVariants,
  authPageFooterVariants,
  authLinkVariants,
} from '@/lib/constants/components/asgard/auth/auth.variants';

// ═══════════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: AUTH_METADATA.LOGIN.title,
  description: AUTH_METADATA.LOGIN.description,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <main className={authPageVariants()}>
        <div className={authPageContentVariants()}>
          {/* Suspense boundary required by Next 16 for useSearchParams (B5) */}
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
          <p className={authPageFooterVariants()}>
            {AUTH_LABELS.NEW_TO_SANCTUARY}{' '}
            <Link href={AUTH_ROUTES.SIGNUP} className={authLinkVariants()}>
              {AUTH_LABELS.INITIALIZE_CONSCIOUSNESS}
            </Link>
          </p>
        </div>
      </main>
    </AuthGuard>
  );
}