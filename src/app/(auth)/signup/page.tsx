/* @/app/(auth)/signup/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SIGNUP PAGE                                            ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { Metadata } from 'next';
import Link from 'next/link';
import SignupForm from '@/components/asgard/auth/SignupForm';
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
  title: AUTH_METADATA.SIGNUP.title,
  description: AUTH_METADATA.SIGNUP.description,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function SignupPage() {
  return (
    <AuthGuard requireAuth={false}>
      <main className={authPageVariants()}>
        <div className={authPageContentVariants()}>
          <SignupForm />
          <p className={authPageFooterVariants()}>
            {AUTH_LABELS.ALREADY_MANIFESTED}{' '}
            <Link href={AUTH_ROUTES.LOGIN} className={authLinkVariants()}>
              {AUTH_LABELS.RETURN_TO_SANCTUARY}
            </Link>
          </p>
        </div>
      </main>
    </AuthGuard>
  );
}