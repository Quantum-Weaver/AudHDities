/* @/app/(auth)/forgot-password/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORGOT PASSWORD PAGE                                   ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { Metadata } from 'next';
import Link from 'next/link';
import ForgotPasswordForm from '@/components/asgard/auth/ForgotPasswordForm';
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
  title: AUTH_METADATA.FORGOT_PASSWORD.title,
  description: AUTH_METADATA.FORGOT_PASSWORD.description,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ForgotPasswordPage() {
  return (
    <AuthGuard requireAuth={false}>
      <main className={authPageVariants()}>
        <div className={authPageContentVariants()}>
          <ForgotPasswordForm />
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
