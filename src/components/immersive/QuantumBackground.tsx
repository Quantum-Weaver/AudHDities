// components/environment/QuantumBackground.tsx
'use client';
import { motion } from 'framer-motion';
import { AssetMapper, EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import { SCALING_CONFIG, backgroundScales, foregroundScales  } from '@/lib/constants/components/immersive/quantum-background';

export interface QuantumBackgroundProps {
  environment: EnvironmentKey;
  variant?: number;
  showForeground?: boolean;
  animated?: boolean;
  parallaxIntensity?: number;
  interactiveSpots?: Array<{
    x: number;
    y: number; 
    component: React.ReactNode;
    trigger?: 'hover' | 'click';
  }>;
  className?: string;
}
const scales = typeof SCALING_CONFIG.baseArray

export function QuantumBackground({
  environment,
  variant = 1,
  showForeground = false,
  animated = true,
  parallaxIntensity = 0.112358,
  interactiveSpots = [],
  className = ''
}: QuantumBackgroundProps) {
  const assets = AssetMapper.utils.getEnvironment(environment, variant);
  parallaxIntensity = 0.112358;
  return (
    <div className={`quantum-environment-stack relative w-full h-full overflow-hidden ${className}`}>
      
      {/* LAYER 1: Base Environment */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.background})`,
          backgroundSize: 'cover'
        }}
        animate={animated ? {
          scale: scales,
          
          transition: {
            duration: SCALING_CONFIG.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : {}}
      />
      
      {/* LAYER 2: Extracted Foreground Elements (Your brilliant -1b system) */}
      {showForeground && assets.foreground && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${assets.foreground})`,
            backgroundSize: 'cover'
          }}
          animate={animated ? {
            scale: foregroundScales,
            transition: {
              duration: SCALING_CONFIG.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }
          } : {}}
        />
      )}
      
      {/* LAYER 3: Parallax Scrolling Effect */}
      <motion.div
        className="absolute inset-0 "
        whileHover={animated ? {
          scale: 1.05,
          transition: { duration: 2 }
        } : {}}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      />
      
      {/* LAYER 4: Interactive Hotspots */}
      {interactiveSpots.map((spot, index) => (
        <motion.div
          key={index}
          className="absolute interactive-hotspot"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {spot.component}
        </motion.div>
      ))}
      
      {/* LAYER 5: Ambient Particles */}
      {animated && (
        <div className="absolute inset-0 particle-field">
          {/* Particle effects would go here */}
        </div>
      )}
    </div>
  );
}