/* @/app/(auth)/reset-password/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    RESET PASSWORD PAGE                                    ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// The vessel arrives here from the recovery email via the callback route
// (?next=/reset-password), carrying a recovery session — so this page
// REQUIRES auth: the guard passes the recovery visitor and turns strangers
// back to the login door, carrying the reason with them.

import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import ResetPasswordForm from '@/components/asgard/auth/ResetPasswordForm';
import AuthGuard from '@/components/asgard/auth/AuthGuard';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  AUTH_ENVIRONMENT,
  AUTH_METADATA,
} from '@/lib/constants/components/asgard/auth/auth.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  authPageVariants,
  authPageContentVariants,
} from '@/lib/constants/components/asgard/auth/auth.variants';

// ═══════════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: AUTH_METADATA.RESET_PASSWORD.title,
  description: AUTH_METADATA.RESET_PASSWORD.description,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ResetPasswordPage() {
  return (
    <Page environment={AUTH_ENVIRONMENT} showForeground={false}>
      <AuthGuard>
        <main className={authPageVariants()}>
          <div className={authPageContentVariants()}>
            <ResetPasswordForm />
          </div>
        </main>
      </AuthGuard>
    </Page>
  );
}
