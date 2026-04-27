// @/components/bifrost/Header.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HEADER COMPONENT                                       ║
// ║                    With hover animation on title                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { getPageMetadata } from '@/lib/constants/systems/environments/page_mapping';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { HeaderProps } from '@/types/components/bifrost/header.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  HEADER_VARIANTS,
} from '@/lib/constants/components/bifrost/header.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  headerVariants,
  headerContentVariants,
  headerTitleVariants,
  headerSubtitleVariants,
} from '@/lib/constants/components/bifrost/header.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  buildHeaderHoverHandlers,
} from '@/lib/utils/components/bifrost/header.utils';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function Header({
  variant = HEADER_VARIANTS.SOVEREIGN,
  className,
}: HeaderProps) {
  const { setEnvironment } = useContinuityBeam();
  const pathname = usePathname();

  const metadata = getPageMetadata(pathname);

  useEffect(() => {
    setEnvironment(metadata.environment);
  }, [metadata.environment, setEnvironment]);

  // ─── Hover State ─────────────────────────────────────────────────────
  const [isHovered, setIsHovered] = useState(false);
  const { hoverHandlers } = buildHeaderHoverHandlers(setIsHovered);

  return (
    <header className={cn(headerVariants({ variant }), className)}>
      <div className={headerContentVariants({ variant })}>
        <Link
          href="/sanctum"
          className="group"
          onMouseEnter={hoverHandlers.handleMouseEnter}
          onMouseLeave={hoverHandlers.handleMouseLeave}
          onFocus={hoverHandlers.handleFocus}
          onBlur={hoverHandlers.handleBlur}
        >
          <div className="flex flex-col space-y-0.5 py-3">
            <span
              className={cn(
                headerTitleVariants({ variant, isHovered }),
                'cosmic-icon'
              )}
            >
              {metadata.title}
            </span>
            {metadata.subtitle && (
              <span className={headerSubtitleVariants({ variant })}>
                {metadata.subtitle}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}