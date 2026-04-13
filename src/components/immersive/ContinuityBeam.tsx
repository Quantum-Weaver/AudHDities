/* @/components/immersive/ContinuityBeam.tsx */
'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { getBeamAnimation } from '@/lib/constants/components/immersive/continuity-beam';
import { GLOW_EFFECTS } from '@/lib/constants/cosmic/effects';
import { cn } from '@/lib/utils';

interface ContinuityBeamProps extends HTMLMotionProps<'div'> {
  /** Override beam intensity (0-1) - overrides the calculated intensity */
  intensityOverride?: number;
  /** Custom className */
  className?: string;
  /** Disable the beam entirely */
  disabled?: boolean;
}

export default function ContinuityBeam({
  intensityOverride,
  className = '',
  disabled = false,
  ...props
}: ContinuityBeamProps) {
  const { beamConfig, activationState } = useContinuityBeam();

  if (disabled || !activationState.active) return null;

  // Get the animation from the beam config
  const beamAnimation = getBeamAnimation(beamConfig);
  
  // Calculate final intensity (override > config intensity mapping)
  const getIntensityValue = (intensity: string): number => {
    if (intensityOverride !== undefined) return intensityOverride;
    switch (beamConfig.intensity) {
      case 'quantum': return 0.85;
      case 'high': return 0.66;
      case 'medium': return 0.47;
      case 'low': return 0.33;
      default: return 0.47;
    }
  };
  
  const finalIntensity = getIntensityValue(beamConfig.intensity);
  
  // Apply speed multiplier from activation state
  const adjustedDuration = (beamConfig.duration || 3) / (activationState.speedMultiplier || 1);
  
  // Get glow effect (fallback to quantum glow)
  const glowEffect = beamConfig.glow || GLOW_EFFECTS.quantum;

  return (
    <div
      className={cn(
        'continuity-beam-container',
        'fixed top-0 left-0 w-full h-[3px] overflow-hidden pointer-events-none z-40',
        className
      )}
      data-beam-variant={beamConfig.variant}
      data-beam-intensity={beamConfig.intensity}
      data-beam-active={activationState.active}
      data-beam-speed-multiplier={activationState.speedMultiplier}
    >
      <motion.div
        className="absolute h-full w-full"
        style={{
          background: beamConfig.gradient,
          opacity: finalIntensity * activationState.glowMultiplier,
          boxShadow: glowEffect,
        }}
        animate={beamAnimation.animate}
        transition={{
          ...beamAnimation.transition,
          duration: adjustedDuration,
        }}
        {...props}
      />
    </div>
  );
}