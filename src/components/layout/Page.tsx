// @/components/ui/layout/Page.tsx - SIMPLIFIED WORKING VERSION
'use client';
import React from 'react';
import PanoramaViewer from '@/components/immersive/PanoramaViewer';
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';

interface PageProps {
  environment: EnvironmentKey;
  variant?: number;
  showForeground?: boolean;
  animated?: boolean;
  title?: string;
  subtitle?:string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  showContinuityBeam?: boolean;
}

export const Page: React.FC<PageProps> = ({
  environment,
  variant = 1,
  showForeground = true,
  animated = true,
  title,
  description,
  children,
  className = ''
}) => {
  return (

    <PanoramaViewer
      environment={environment}
      variant={variant}
      showForeground={showForeground}
      animated={animated}      
      className={className}
    >
      {/* Content Container */}
      <div className="relative z-10 text-center min-h-screen">        
        {/* Main Content */}
        <div className="page-content px-6 pb-20">
          <section className="page-title-section mb-8 pt-20 px-6">
            {children}
          </section>             
        </div>
      </div>
    </PanoramaViewer>
  );
};

export default Page;