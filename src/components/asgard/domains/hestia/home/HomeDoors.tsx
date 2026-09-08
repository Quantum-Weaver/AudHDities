// src/components/asgard/domains/hestia/home/HomeDoors.tsx
'use client';

import Link from 'next/link';
import { Anchor, ArrowRight, Hammer, LogIn } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/yggdrasil/Button';
import {
  HOME_LABELS,
  HOME_ROUTES,
  HOME_DIMENSIONS,
} from '@/lib/constants/components/asgard/domains/hestia/home/home.constants';
import {
  homeCtaContainerVariants,
  homeCtaIconVariants,
} from '@/lib/constants/components/asgard/domains/hestia/home/home.variants';

// The doors below the hero: the Sanctuary for everyone; the Vessel for a
// signed-in reader; the Forge and Log in / Sign up for a visitor.
export default function HomeDoors() {
  const { user, isLoading } = useUser();
  const iconSize = HOME_DIMENSIONS.CTA_ICON_SIZE;

  return (
    <div className={homeCtaContainerVariants()}>
      <Link href={HOME_ROUTES.SANCTUARY}>
        <Button size="lg" className="group">
          {HOME_LABELS.CTA}
          <ArrowRight size={iconSize} className={homeCtaIconVariants()} />
        </Button>
      </Link>

      {!isLoading && user && (
        <Link href={HOME_ROUTES.VESSEL}>
          <Button size="lg" variant="outline" className="group">
            {HOME_LABELS.CTA_VESSEL}
            <Anchor size={iconSize} className={homeCtaIconVariants()} />
          </Button>
        </Link>
      )}

      {!isLoading && !user && (
        <>
          <Link href={HOME_ROUTES.FORGE}>
            <Button size="lg" variant="outline" className="group">
              {HOME_LABELS.CTA_FORGE}
              <Hammer size={iconSize} className={homeCtaIconVariants()} />
            </Button>
          </Link>
          <Link href={HOME_ROUTES.LOGIN}>
            <Button size="lg" variant="outline" className="group">
              {HOME_LABELS.CTA_LOGIN}
              <LogIn size={iconSize} className={homeCtaIconVariants()} />
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
