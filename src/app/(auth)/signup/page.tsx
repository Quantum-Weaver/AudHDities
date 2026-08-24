/* @/app/(auth)/signup/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SIGNUP PAGE                                            ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import SignupForm from '@/components/asgard/auth/SignupForm';
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
  title: AUTH_METADATA.SIGNUP.title,
  description: AUTH_METADATA.SIGNUP.description,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function SignupPage() {
  return (
    <Page environment={AUTH_ENVIRONMENT} showForeground={false}>
      <AuthGuard requireAuth={false}>
        <main className={authPageVariants()}>
          <div className={authPageContentVariants()}>
            <SignupForm />
          </div>
        </main>
      </AuthGuard>
    </Page>
  );
}
