// components/asgard/auth/AuthButton.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH BUTTON (UPDATED)                                  ║
// ║                    With hover animation — zero hardcoded values           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useState } from 'react';
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

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  buildAuthButtonHoverHandlers,
} from '@/lib/utils/components/asgard/auth/auth.utils';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function AuthButton() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  // ─── Hover State ─────────────────────────────────────────────────────
  const [isHovered, setIsHovered] = useState(false);
  const hoverHandlers = buildAuthButtonHoverHandlers(setIsHovered);

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
        onMouseEnter={hoverHandlers.handleMouseEnter}
        onMouseLeave={hoverHandlers.handleMouseLeave}
        onFocus={hoverHandlers.handleFocus}
        onBlur={hoverHandlers.handleBlur}
        className={authButtonVariants({
          variant: AUTH_BUTTON_VARIANTS.AUTHENTICATED,
          isHovered,
        })}
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
      onMouseEnter={hoverHandlers.handleMouseEnter}
      onMouseLeave={hoverHandlers.handleMouseLeave}
      onFocus={hoverHandlers.handleFocus}
      onBlur={hoverHandlers.handleBlur}
      className={authButtonVariants({
        variant: AUTH_BUTTON_VARIANTS.UNAUTHENTICATED,
        isHovered,
      })}
    >
      <User size={AUTH_ICON_SIZE} />
      <span className="hidden sm:inline">{AUTH_LABELS.ENTER}</span>
    </Link>
  );
}