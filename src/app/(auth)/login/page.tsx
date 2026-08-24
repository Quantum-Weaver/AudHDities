/* @/app/(auth)/login/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LOGIN PAGE                                             ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { Metadata } from 'next';
import { Suspense } from 'react';
import { Page } from '@/components/bifrost/Page';
import LoginForm from '@/components/asgard/auth/LoginForm';
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
  title: AUTH_METADATA.LOGIN.title,
  description: AUTH_METADATA.LOGIN.description,
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function LoginPage() {
  return (
    <Page environment={AUTH_ENVIRONMENT} showForeground={false}>
      <AuthGuard requireAuth={false}>
        <main className={authPageVariants()}>
          <div className={authPageContentVariants()}>
            {/* Suspense boundary required by Next 16 for useSearchParams (B5) */}
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </main>
      </AuthGuard>
    </Page>
  );
}
