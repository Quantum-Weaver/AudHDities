/* @/app/(auth)/reset-password/page.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    RESET PASSWORD PAGE                                    ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// The vessel arrives here from the recovery email via the callback route
// (?next=/reset-password), carrying a recovery session — so this page
// REQUIRES auth: the guard passes the recovery visitor and turns strangers
// gently back to the login door.

import { Metadata } from 'next';
import ResetPasswordForm from '@/components/asgard/auth/ResetPasswordForm';
import AuthGuard from '@/components/asgard/auth/AuthGuard';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
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
    <AuthGuard>
      <main className={authPageVariants()}>
        <div className={authPageContentVariants()}>
          <ResetPasswordForm />
        </div>
      </main>
    </AuthGuard>
  );
}
