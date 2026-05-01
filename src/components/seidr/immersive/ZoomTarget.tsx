// @/components/immersive/ZoomTarget.tsx
// NEW - Zoom to specific element/area

"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ZoomTargetProps {
  target: string;
  scale?: number;
  duration?: number;
  onZoom?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ZoomTarget({
  target,
  scale = 1.5,
  duration = 300,
  onZoom,
  children,
  className,
}: ZoomTargetProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
    onZoom?.();
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <motion.div
        animate={{
          scale: isZoomed ? scale : 1,
          zIndex: isZoomed ? 50 : 0,
        }}
        transition={{ duration: duration / 1000, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
      <button
        onClick={handleZoom}
        className="absolute bottom-4 right-4 z-10 p-2 bg-black/50 rounded-full text-star-dust/80 hover:text-star-dust transition-colors"
        aria-label={isZoomed ? "Zoom out" : "Zoom in"}
      >
        {isZoomed ? "−" : "+"}
      </button>
    </div>
  );
}