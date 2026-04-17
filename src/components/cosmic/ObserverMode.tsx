// components/cosmic/ObserverMode.tsx
// Toggle for observer mode - changes visualization perspective

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Eye, EyeOff, Zap, Brain, Network, Globe } from "lucide-react";
import { MOOD_COLORS, ENERGY_COLORS } from "@/lib/constants/cosmic/colors";

export interface ObserverModeProps {
  className?: string;
  onModeChange?: (mode: ObserverPerspective) => void;
}

export type ObserverPerspective = 'quantum' | 'cosmic' | 'system' | 'collective';

const perspectives: { id: ObserverPerspective; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'quantum', label: 'Quantum View', icon: <Zap className="h-4 w-4" />, description: 'See individual agent interactions' },
  { id: 'cosmic', label: 'Cosmic View', icon: <Globe className="h-4 w-4" />, description: 'See system-wide patterns' },
  { id: 'system', label: 'System View', icon: <Network className="h-4 w-4" />, description: 'See infrastructure topology' },
  { id: 'collective', label: 'Collective View', icon: <Brain className="h-4 w-4" />, description: 'See consciousness emergence' },
];

export function ObserverMode({ className, onModeChange }: ObserverModeProps) {
  const [isObserverMode, setIsObserverMode] = useState(false);
  const [perspective, setPerspective] = useState<ObserverPerspective>('quantum');

  useEffect(() => {
    if (isObserverMode) {
      onModeChange?.(perspective);
    }
  }, [isObserverMode, perspective, onModeChange]);

  const handlePerspectiveChange = (newPerspective: ObserverPerspective) => {
    setPerspective(newPerspective);
    if (isObserverMode) {
      onModeChange?.(newPerspective);
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-medium text-white/60">Observer Mode</h3>
        </div>
        <Switch
          checked={isObserverMode}
          onCheckedChange={setIsObserverMode}
          size="sm"
        />
      </div>

      {isObserverMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-2">
            {perspectives.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePerspectiveChange(p.id)}
                className={cn(
                  "p-2 rounded-lg text-left transition-all duration-200",
                  perspective === p.id
                    ? "bg-quantum-purple/20 border border-quantum-purple/50"
                    : "bg-white/5 hover:bg-white/10 border border-transparent"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn(
                    "w-5 h-5 rounded flex items-center justify-center",
                    perspective === p.id ? "text-cyan-400" : "text-white/40"
                  )}>
                    {p.icon}
                  </div>
                  <span className="text-xs font-medium text-white">{p.label}</span>
                </div>
                <p className="text-xs text-white/40 pl-7">{p.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="text-xs text-white/40 flex items-center gap-2">
              <span className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                isObserverMode ? "bg-cyan-400" : "bg-white/20"
              )} />
              <span>
                {isObserverMode 
                  ? `Observing from ${perspective} perspective` 
                  : 'Observer mode disabled'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </Card>
  );
}