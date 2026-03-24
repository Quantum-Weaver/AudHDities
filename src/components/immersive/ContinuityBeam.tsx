// @/app/components/immersive/ContinuityBeam.tsx
'use client';

import { motion } from 'framer-motion';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { BEAM_COLORS, BEAM_ANIMATIONS } from '@/lib/constants/components/immersive/continuity-beam';

interface ContinuityBeamProps {
  className?: string;
}

export default function ContinuityBeam({
  className = ''
}: ContinuityBeamProps) {
  const { beamConfig } = useContinuityBeam();
  const { 
    variant = 'home',
    intensity = 0.33,
    showQuantumSweep = true
  } = beamConfig;

  // Get the gradient from BEAM_COLORS using the variant
  // Default to home gradient if variant not found
  const beamGradient = BEAM_COLORS[variant as keyof typeof BEAM_COLORS] || BEAM_COLORS.home;
  
  const beamAnimation = BEAM_ANIMATIONS.quantumSweep;

  if (!showQuantumSweep) return null;

  return (
    <div className={`w-full h-[2px] relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 h-full"
        style={{
          background: beamGradient,
          opacity: intensity,
          width: '100%',
          height: '100%'
        }}
        {...beamAnimation}
      />
    </div>
  );
}