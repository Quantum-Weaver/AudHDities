// @/components/immersive/EnvironmentPortal.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { EnvironmentKey } from "@/lib/constants/systems/assets/mapper";

export interface EnvironmentPortalProps {
  from: EnvironmentKey;
  to: EnvironmentKey;
  duration?: number;
  onComplete?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function EnvironmentPortal({
  from,
  to,
  duration = 800,
  onComplete,
  children,
  className,
}: EnvironmentPortalProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentEnv, setCurrentEnv] = useState(from);

  useEffect(() => {
    if (from !== to && !isTransitioning) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentEnv(to);
        setIsTransitioning(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [from, to, duration, isTransitioning, onComplete]);

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEnv}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: duration / 1000, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}