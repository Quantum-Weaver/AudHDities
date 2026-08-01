// components/asgard/auth/AuthButton.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH BUTTON (UPDATED)                                  ║
// ║                    With hover animation — zero hardcoded values           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import FarewellCeremony from './FarewellCeremony';

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
  const { user, profile, signOut } = useAuth();

  // ─── Hover State ─────────────────────────────────────────────────────
  const [isHovered, setIsHovered] = useState(false);
  const hoverHandlers = buildAuthButtonHoverHandlers(setIsHovered);

  // ─── The farewell choice (Movement IV, stroke 5) ─────────────────────
  // Read once per signed-in mount from vessel_config. The column is opt-in,
  // default false (migrations/20260729_ceremony_choices.sql); read
  // defensively so a not-yet-migrated base simply means OFF — absence of
  // choice always means OFF, which is THE OPT-IN LAW behaving as designed.
  const [farewellChosen, setFarewellChosen] = useState(false);
  const [departing, setDeparting] = useState(false);

  useEffect(() => {
    if (!user) {
      setFarewellChosen(false);
      return;
    }
    fetch(`/api/generated/hestia-core/vessel_config?created_by=${user.id}&limit=1`)
      .then((r) => r.json())
      .then((res) => {
        const row = res.success ? (res.data?.data ?? [])[0] : undefined;
        setFarewellChosen(
          !!row && (row as Record<string, unknown>).ceremony_farewell === true
        );
      })
      .catch(() => setFarewellChosen(false));
  }, [user]);

  const completeSignOut = async () => {
    try {
      await signOut();
      router.push(AUTH_ROUTES.HOME);
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setDeparting(false);
    }
  };

  const handleLogout = async () => {
    // The vessel's own chosen ceremony, or the plain going — never both,
    // never imposed. Gweld ti'n fuan speaks only where it was invited.
    if (farewellChosen) {
      setDeparting(true);
      return;
    }
    await completeSignOut();
  };

  if (user && departing) {
    return (
      <FarewellCeremony
        vesselName={profile?.display_name}
        onComplete={completeSignOut}
      />
    );
  }

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