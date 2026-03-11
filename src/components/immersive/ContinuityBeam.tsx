// @/app/components/immersive/ContinuityBeam.tsx - FINAL SIMPLE VERSION
'use client';

import { motion } from 'framer-motion';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { BEAM_COLORS, BEAM_ANIMATIONS } from '@/lib/constants/components/immersive/continuity-beam';
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';

interface ContinuityBeamProps {
  className?: string;
}

export default function ContinuityBeam({
  className = ''
}: ContinuityBeamProps) {
  const { beamConfig } = useContinuityBeam();
  const { 
    variant = 'home',
    intensity = 0.8,
    showQuantumSweep = true
  } = beamConfig;

  const beamGradient = BEAM_COLORS.home;
  const beamAnimation = BEAM_ANIMATIONS.quantumSweep;

  if (!showQuantumSweep) return null;

  return (
    <div className={`w-full h-2 relative overflow-hidden ${className}`}>
      <motion.div
        className="h-full"
        style={{
          background: beamGradient,
          opacity: intensity
        }}
        {...beamAnimation}
      />
    </div>
  );
}