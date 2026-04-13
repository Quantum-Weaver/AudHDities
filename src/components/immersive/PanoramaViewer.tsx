/* src/components/immersive/PanoramaViewer.tsx */
'use client';
import { useEffect } from 'react';
import { QuantumBackground } from './QuantumBackground';
import { useContinuityBeam } from 'src/contexts/ContinuityBeamContext';
import { EnvironmentKey } from 'src/lib/constants/systems/assets/mapper';

interface PanoramaViewerProps {
  environment: EnvironmentKey;
  variant?: number;
  showForeground?: boolean;
  animated?: boolean;
  children?: React.ReactNode;
  className?: string;
  parallaxIntensity?: number;
}

export default function PanoramaViewer({ 
  environment,
  variant = 1,
  showForeground = true,
  animated = true,
  children,
  className = ''
}: PanoramaViewerProps) {
  const { setEnvironment } = useContinuityBeam();
  
  useEffect(() => {
    setEnvironment(environment);
  }, [environment, setEnvironment])
  
  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      
      {/* FULL SCREEN IMMERSIVE BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <QuantumBackground 
          environment={environment}
          variant={variant}
          showForeground={showForeground}          
          animated={animated}
          className="w-full h-full"          
        />
      </div>

      {/* CONTENT - Full screen, scrolls over background */}
      <div className="relative w-full min-h-screen z-10">
        {children}
      </div>
    </div>
  );
}