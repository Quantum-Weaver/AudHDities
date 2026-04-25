// @/components/bifrost/Header.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HEADER COMPONENT                                       ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { getPageMetadata } from '@/lib/constants/systems/environments/page_mapping';

import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { HeaderProps } from '@/types/components/bifrost/header.types';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  headerVariants,
  headerContentVariants,
  headerTitleVariants,
  headerSubtitleVariants,
} from '@/lib/constants/components/bifrost/header.variants';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function Header({
  variant = 'sovereign',
  className,
}: HeaderProps) {
  const { setEnvironment } = useContinuityBeam();
  const pathname = usePathname();

  const metadata = getPageMetadata(pathname);
  const currentEnvironment = metadata.environment;

  useEffect(() => {
    setEnvironment(currentEnvironment);
  }, [currentEnvironment, setEnvironment]);

  const title = metadata.title;
  const subtitle = metadata.subtitle;

  return (
    <header className={cn(headerVariants({ variant }), className)}>
      <div className={headerContentVariants({ variant })}>
        <div className="h-16 flex items-center justify-center">
          <Link href="/sanctum" className="group">
            <div className="flex flex-col items-center space-y-0.5">
              <span className={cn(headerTitleVariants({ variant }), 'cosmic-icon')}>
                {title}
              </span>
              {subtitle && (
                <span className={headerSubtitleVariants({ variant })}>
                  {subtitle}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}