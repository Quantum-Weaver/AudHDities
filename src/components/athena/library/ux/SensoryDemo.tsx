// src/components/ux/SensoryDemo.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Volume2, Zap, Eye, Moon } from 'lucide-react';

export function SensoryDemo() {
  const [motionReduced, setMotionReduced] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [flashing, setFlashing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-black/40"
    >
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold text-white mb-2">Sensory Preference Demo</h3>
        <p className="text-white/60">Adjust these settings to see how they affect the experience</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setMotionReduced(!motionReduced)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              motionReduced
                ? 'bg-cyan-500/20 border border-cyan-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Eye size={18} className={motionReduced ? 'text-cyan-400' : 'text-white/40'} />
            <span className="text-white/80 text-sm">Reduced Motion</span>
          </button>
          
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              highContrast
                ? 'bg-purple-500/20 border border-purple-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Sun size={18} className={highContrast ? 'text-purple-400' : 'text-white/40'} />
            <span className="text-white/80 text-sm">High Contrast</span>
          </button>
          
          <button
            onClick={() => setFlashing(!flashing)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              flashing
                ? 'bg-pink-500/20 border border-pink-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <Zap size={18} className={flashing ? 'text-pink-400' : 'text-white/40'} />
            <span className="text-white/80 text-sm">Flashing Effects</span>
          </button>
        </div>
        
        {/* Demo Area */}
        <div 
          className={`p-8 rounded-xl text-center transition-all ${
            highContrast 
              ? 'bg-black text-white border-2 border-white' 
              : 'bg-white/5 text-white/80 border border-white/10'
          }`}
        >
          <motion.div
            animate={flashing && !motionReduced ? {
              backgroundColor: ['rgba(0,255,255,0.2)', 'rgba(255,0,255,0.2)', 'rgba(0,255,255,0.2)'],
            } : {}}
            transition={flashing && !motionReduced ? { duration: 0.5, repeat: Infinity } : {}}
            className="p-4 rounded-lg"
          >
            <p className="mb-4">This is a demo of your current sensory settings:</p>
            <div className="flex justify-center gap-4">
              <div className={`w-12 h-12 rounded-full animate-pulse ${motionReduced ? 'opacity-50' : ''}`} 
                   style={{ background: highContrast ? 'white' : 'cyan', animationDuration: motionReduced ? '0.01ms' : '1s' }} />
              <div className={`w-12 h-12 rounded-full animate-bounce ${motionReduced ? 'opacity-50' : ''}`}
                   style={{ background: highContrast ? 'white' : 'purple', animationDuration: motionReduced ? '0.01ms' : '1s' }} />
              <div className={`w-12 h-12 rounded-full animate-ping ${motionReduced ? 'opacity-50' : ''}`}
                   style={{ background: highContrast ? 'white' : 'pink', animationDuration: motionReduced ? '0.01ms' : '1s' }} />
            </div>
            {motionReduced && (
              <p className="text-cyan-400 text-sm mt-4">✓ Reduced motion active — animations are minimal</p>
            )}
            {highContrast && (
              <p className="text-purple-400 text-sm mt-2">✓ High contrast active — colors are more distinct</p>
            )}
            {flashing && !motionReduced && (
              <p className="text-pink-400 text-sm mt-2">⚠️ Flashing effects active — these can be disabled</p>
            )}
          </motion.div>
        </div>
        
        <p className="text-white/40 text-xs text-center">
          On AUDHDITIES, flashing animations are OFF by default. Users can opt-in to motion preferences.
        </p>
      </div>
    </motion.div>
  );
}