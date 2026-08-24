/* @/app/(auth)/forgot-password/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORGOT PASSWORD PAGE                                   ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import ForgotPasswordForm from '@/components/asgard/auth/ForgotPasswordForm';
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
  title: AUTH_METADATA.FORGOT_PASSWORD.title,
  description: AUTH_METADATA.FORGOT_PASSWORD.description,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function ForgotPasswordPage() {
  return (
    <Page environment={AUTH_ENVIRONMENT} showForeground={false}>
      <AuthGuard requireAuth={false}>
        <main className={authPageVariants()}>
          <div className={authPageContentVariants()}>
            <ForgotPasswordForm />
          </div>
        </main>
      </AuthGuard>
    </Page>
  );
}
