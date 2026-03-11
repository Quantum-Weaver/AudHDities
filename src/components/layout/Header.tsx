// src/components/layout/Header.tsx - WITH ANCIENT ONES' QUOTE
'use client';
import Link from 'next/link';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import ContinuityBeam from '@/components/immersive/ContinuityBeam';
import { SupabaseContinuityBridge } from '@/components/immersive/SupabaseContinuityBridge';
import { HEADER_DATA } from '@/data/interfaces/header-data';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { beamConfig } = useContinuityBeam();
  const pathname = usePathname();
  // Simple environment detection (you might have a better method)
  const currentEnvironment = pathname.split('/')[1] as keyof typeof HEADER_DATA.environmentTitles || 'home';
  
  const title = HEADER_DATA.environmentTitles[currentEnvironment];
  const subtitle = HEADER_DATA.environmentSubtitles[currentEnvironment];

  return (
    <header className="sticky top-0 w-full bg-deep-space/80 backdrop-blur-xl border-b border-white/5 z-40">
      {/* Header content */}
      <SupabaseContinuityBridge />
      <div className="container mx-auto px-6 h-20 flex items-center justify-center">
        <div className="text-center cursor-pointer group relative">
          <div className="text-xl cosmic-icon opacity-42 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
            <Link href="/" className="text-center cursor-pointer group relative">
              <div className="text-xl cosmic-icon opacity-42 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {title}
              </div>
              {subtitle && (
                <div className="text-xs text-star-dust/70 mt-1">
                  {subtitle}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* CONTINUITY BEAM - Now part of header */}
      <ContinuityBeam className="absolute bottom-0 left-0 right-0" />
    </header>
  );
}