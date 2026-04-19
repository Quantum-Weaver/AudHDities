// @/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { getPageMetadata } from '@/lib/constants/systems/environments/page_mapping';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { VStack } from '@/components/ui/Stack';

export default function Header() {
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
    <header className="sticky top-0 w-full bg-deep-space/80 backdrop-blur-xl border-b border-white/5 z-40">
      <div className="container mx-auto px-6 h-20 flex items-center justify-center">
        <div className="h-16 flex items-center justify-center">
          <Link href="/sanctum" className="group">
            <VStack align="center" space="xs">
              <div className="text-xl cosmic-icon opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {title}
              </div>
              {subtitle && (
                <div className="text-xs text-star-dust/70">
                  {subtitle}
                </div>
              )}
            </VStack>
          </Link>
        </div>
      </div>
    </header>
  );
}