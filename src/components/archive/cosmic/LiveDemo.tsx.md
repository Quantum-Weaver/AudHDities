// components/cosmic/LiveDemo.tsx
// Live preview of selected effect with parameters

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { GLOW_EFFECTS, GRADIENTS, PARTICLE_BEHAVIOR } from "@/lib/constants/cosmic/effects";
import type { Parameters } from "./ParameterSliders";

export interface LiveDemoProps {
  effect: string;
  parameters: Parameters;
  className?: string;
}

const effectAnimations: Record<string, any> = {
  'quantum-glow': {
    animate: { 
      boxShadow: [
        GLOW_EFFECTS.quantum,
        GLOW_EFFECTS.quantumDomain,
        GLOW_EFFECTS.quantum
      ]
    },
    transition: { duration: 2, repeat: Infinity }
  },
  'fire-flicker': {
    animate: { 
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.02, 1]
    },
    transition: { duration: 0.5, repeat: Infinity }
  },
  'cosmic-sparkle': PARTICLE_BEHAVIOR.FLOAT,
  'quantum-entanglement': {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  'rainbow-flow': {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: { duration: 4, repeat: Infinity }
  },
  'stardust-float': PARTICLE_BEHAVIOR.DRIFT,
};

const effectBackgrounds: Record<string, string> = {
  'quantum-glow': GLOW_EFFECTS.quantum,
  'fire-flicker': GLOW_EFFECTS.fire,
  'cosmic-sparkle': GLOW_EFFECTS.cosmic,
  'quantum-entanglement': GLOW_EFFECTS.quantum,
  'rainbow-flow': GRADIENTS.prideRainbow,
  'stardust-float': GLOW_EFFECTS.neurospark,
};

export function LiveDemo({ effect, parameters, className }: LiveDemoProps) {
  const animation = effectAnimations[effect] || PARTICLE_BEHAVIOR.PULSE;
  const backgroundStyle = effectBackgrounds[effect] || GLOW_EFFECTS.quantum;
  
  // Apply parameters to animation
  const enhancedAnimation = {
    ...animation,
    transition: {
      ...animation.transition,
      duration: (animation.transition?.duration || 2) / parameters.speed,
    }
  };

  const intensityScale = 0.5 + parameters.intensity * 0.5;

  return (
    <Card className={cn("p-6 text-center", className)}>
      <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
      
      <motion.div
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-deepSpace/50 border border-white/10 flex items-center justify-center"
        style={{
          boxShadow: effect === 'quantum-glow' 
            ? `0 0 ${20 + parameters.intensity * 40}px ${parameters.color}40`
            : undefined,
        }}
      >
        {/* Effect Preview Area */}
        <motion.div
          className={cn(
            "w-32 h-32 rounded-full flex items-center justify-center",
            effect === 'rainbow-flow' && "bg-gradient-to-r"
          )}
          style={{
            ...(effect === 'rainbow-flow' && { backgroundImage: backgroundStyle }),
            ...(effect !== 'rainbow-flow' && { backgroundColor: parameters.color }),
            boxShadow: effect !== 'rainbow-flow' ? backgroundStyle : undefined,
            opacity: intensityScale,
          }}
          {...enhancedAnimation}
        >
          <span className="text-4xl mix-blend-difference">
            {effect === 'quantum-glow' && '✨'}
            {effect === 'fire-flicker' && '🔥'}
            {effect === 'cosmic-sparkle' && '⭐'}
            {effect === 'quantum-entanglement' && '🌀'}
            {effect === 'rainbow-flow' && '🌈'}
            {effect === 'stardust-float' && '💫'}
          </span>
        </motion.div>

        {/* Particle effects overlay */}
        {effect === 'cosmic-sparkle' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-neurospark rounded-full"
                initial={{ x: '50%', y: '50%', opacity: 0 }}
                animate={{
                  x: `${50 + Math.sin(i) * 40}%`,
                  y: `${50 + Math.cos(i * 2) * 40}%`,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 / parameters.speed,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Effect Info */}
      <div className="mt-4 text-left">
        <p className="text-sm text-white/60">
          <span className="text-cyan-400">Intensity:</span> {Math.round(parameters.intensity * 100)}%
        </p>
        <p className="text-sm text-white/60">
          <span className="text-cyan-400">Speed:</span> {parameters.speed.toFixed(1)}x
        </p>
        <p className="text-sm text-white/60">
          <span className="text-cyan-400">Color:</span> {parameters.color}
        </p>
      </div>
    </Card>
  );
}