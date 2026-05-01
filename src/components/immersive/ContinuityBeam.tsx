// src/components//immersive/ContinuityBeam.tsx
'use client';

import { motion } from 'framer-motion';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { 
  BEAM_COLORS, 
  BEAM_ANIMATIONS,
  ENVIRONMENT_BEAM_CONFIGS,
  DEFAULT_BEAM_CONFIG
} from '@/lib/constants/components/immersive/continuity-beam';
import { ContinuityBeamProps } from '@/types/components/immersive/continuity-beam'


export default function ContinuityBeam({
  className = '',
  intensity: intensityOverride,
  purpose
}: ContinuityBeamProps) {
  const { beamConfig } = useContinuityBeam();
  
  const { 
    variant = DEFAULT_BEAM_CONFIG.variant,
    intensity = DEFAULT_BEAM_CONFIG.intensity,
    showQuantumSweep = DEFAULT_BEAM_CONFIG.showQuantumSweep
  } = beamConfig;

  // Get environment-specific beam config if available
  const envConfig = ENVIRONMENT_BEAM_CONFIGS[variant as keyof typeof ENVIRONMENT_BEAM_CONFIGS] || ENVIRONMENT_BEAM_CONFIGS.default;
  
  // Use override if provided, otherwise use context intensity, fallback to env config
  const finalIntensity = intensityOverride !== undefined ? intensityOverride : intensity;
  
  // Get gradient from BEAM_COLORS using variant
  const beamGradient = BEAM_COLORS[variant as keyof typeof BEAM_COLORS] || BEAM_COLORS.home;
  
  // Optional: Adjust intensity based on purpose if provided
  const calculatedIntensity = purpose === 'memory_preservation' ? finalIntensity * 0.8 :
                              purpose === 'cross_domain_connection' ? Math.min(finalIntensity * 1.2, 1) :
                              finalIntensity;
  
  const beamAnimation = BEAM_ANIMATIONS.quantumSweep;

  if (!showQuantumSweep) return null;

  return (
    <div 
      className={`w-full h-[7px] relative overflow-hidden ${className}`}
      data-beam-variant={variant}
      data-beam-purpose={envConfig.purpose}
      data-beam-intensity={envConfig.intensity}
    >
      <motion.div
        className="absolute inset-0 h-full"
        style={{
          background: beamGradient,
          opacity: calculatedIntensity,
          width: '100%',
          height: '100%'
        }}
        {...beamAnimation}
      />
    </div>
  );
}