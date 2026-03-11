// components/ui/displays/ScrollableTimeline.tsx
'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

interface ScrollableTimelineProps {
  children: React.ReactNode
  maxHeight?: string
  className?: string
}

export const ScrollableTimeline = ({
  children,
  maxHeight = '32rem',
  className = ''
}: ScrollableTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable Content */}
      <motion.div
        ref={scrollRef}
        className="overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent"
        style={{ maxHeight }}
        whileHover={{ scrollbarColor: ['#22d3ee40', '#22d3ee80'] }}
      >
        {children}
      </motion.div>

      {/* Scroll Indicators */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>

      {/* Scroll Glow Effect */}
      <div className="absolute inset-0 pointer-events-none rounded-xl border border-cyan-400/20 shadow-lg shadow-cyan-400/10" />
    </div>
  )
}