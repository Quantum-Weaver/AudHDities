// components/asgard/auth/AuthButton.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH BUTTON                                            ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  AUTH_BUTTON_VARIANTS,
  AUTH_LABELS,
  AUTH_ICON_SIZE,
  AUTH_ROUTES,
} from '@/lib/constants/components/asgard/auth/auth.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  authButtonVariants,
} from '@/lib/constants/components/asgard/auth/auth.variants';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function AuthButton() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push(AUTH_ROUTES.HOME);
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className={authButtonVariants({ variant: AUTH_BUTTON_VARIANTS.AUTHENTICATED })}
        aria-label={AUTH_LABELS.EXIT}
      >
        <LogOut size={AUTH_ICON_SIZE} />
        <span className="hidden sm:inline">{AUTH_LABELS.EXIT}</span>
      </button>
    );
  }

  return (
    <Link
      href={AUTH_ROUTES.LOGIN}
      className={authButtonVariants({ variant: AUTH_BUTTON_VARIANTS.UNAUTHENTICATED })}
    >
      <User size={AUTH_ICON_SIZE} />
      <span className="hidden sm:inline">{AUTH_LABELS.ENTER}</span>
    </Link>
  );
}