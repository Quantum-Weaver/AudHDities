// src/components/ux/FocusDemo.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Save, ArrowRight, Lightbulb } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';

export function FocusDemo() {
  const [focusMode, setFocusMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const startTimer = () => {
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-black/40"
    >
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold text-white mb-2">Executive Function Support Demo</h3>
        <p className="text-white/60">Experience features designed to support focus and reduce overwhelm</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Focus Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <Lightbulb size={20} className="text-cyan-400" />
            <div>
              <p className="text-white font-medium">Focus Mode</p>
              <p className="text-white/40 text-sm">Removes distractions, highlights the current task</p>
            </div>
          </div>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`px-4 py-2 rounded-lg transition-all ${
              focusMode
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {focusMode ? 'On' : 'Off'}
          </button>
        </div>
        
        {/* Demo Content */}
        <div className={`p-6 rounded-lg transition-all ${focusMode ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-white/5'}`}>
          <h4 className="text-white font-bold mb-2">Current Task: Complete this form</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50"
            />
            <Textarea
              placeholder="Your message"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          
          {/* Auto-save Indicator */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Save size={14} className="text-green-400" />
              <p className="text-green-400 text-xs">Auto-saving...</p>
            </div>
            <button className="text-cyan-400 text-sm flex items-center gap-1">
              <ArrowRight size={12} />
              Continue Later
            </button>
          </div>
        </div>
        
        {/* Visual Timer Demo */}
        <div className="p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Timer size={20} className="text-purple-400" />
            <div>
              <p className="text-white font-medium">Visual Timer</p>
              <p className="text-white/40 text-sm">Time awareness without anxiety</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-1000"
                style={{ width: `${(30 - timeLeft) / 30 * 100}%` }}
              />
            </div>
            <span className="text-white font-mono">{timeLeft}s</span>
            <button
              onClick={startTimer}
              disabled={timerActive}
              className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm transition-all disabled:opacity-50"
            >
              Start
            </button>
          </div>
        </div>
        
        <p className="text-white/40 text-xs text-center">
          On AUDHDITIES, forms auto-save, timers are optional, and you can always "continue later"
        </p>
      </div>
    </motion.div>
  );
}