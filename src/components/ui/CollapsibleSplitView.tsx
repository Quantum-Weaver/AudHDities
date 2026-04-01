// src/components/ui/CollapsibleSplitView.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface CollapsibleSplitViewProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  defaultExpanded?: 'left' | 'right' | null;
}

export function CollapsibleSplitView({
  leftPanel,
  rightPanel,
  leftLabel = 'Guide',
  rightLabel = 'Application',
  defaultExpanded = null
}: CollapsibleSplitViewProps) {
  const [expanded, setExpanded] = useState<'left' | 'right' | null>(defaultExpanded);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  const toggleLeftExpand = () => {
    if (expanded === 'left') {
      setExpanded(null);
      setLeftCollapsed(false);
      setRightCollapsed(false);
    } else {
      setExpanded('left');
      setLeftCollapsed(false);
      setRightCollapsed(true);
    }
  };

  const toggleRightExpand = () => {
    if (expanded === 'right') {
      setExpanded(null);
      setLeftCollapsed(false);
      setRightCollapsed(false);
    } else {
      setExpanded('right');
      setLeftCollapsed(true);
      setRightCollapsed(false);
    }
  };

  const toggleLeftCollapse = () => {
    if (expanded === 'left') {
      setExpanded(null);
      setLeftCollapsed(false);
      setRightCollapsed(false);
    } else {
      setLeftCollapsed(!leftCollapsed);
      if (!leftCollapsed) {
        setRightCollapsed(false);
        setExpanded(null);
      }
    }
  };

  const toggleRightCollapse = () => {
    if (expanded === 'right') {
      setExpanded(null);
      setLeftCollapsed(false);
      setRightCollapsed(false);
    } else {
      setRightCollapsed(!rightCollapsed);
      if (!rightCollapsed) {
        setLeftCollapsed(false);
        setExpanded(null);
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">{leftLabel}</span>
          <button
            onClick={toggleLeftExpand}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title={expanded === 'left' ? 'Reset view' : 'Focus on guide'}
          >
            {expanded === 'left' ? (
              <Minimize2 size={16} className="text-cyan-400" />
            ) : (
              <Maximize2 size={16} className="text-white/40 hover:text-cyan-400" />
            )}
          </button>
          <button
            onClick={toggleLeftCollapse}
            className="p-1 hover:bg-white/10 rounded transition-colors ml-2"
            title={leftCollapsed ? 'Show guide' : 'Hide guide'}
          >
            <ChevronLeft
              size={16}
              className={`transition-transform ${
                leftCollapsed ? 'rotate-180 text-cyan-400' : 'text-white/40'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleRightCollapse}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title={rightCollapsed ? 'Show form' : 'Hide form'}
          >
            <ChevronRight
              size={16}
              className={`transition-transform ${
                rightCollapsed ? 'rotate-180 text-purple-400' : 'text-white/40'
              }`}
            />
          </button>
          <button
            onClick={toggleRightExpand}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title={expanded === 'right' ? 'Reset view' : 'Focus on form'}
          >
            {expanded === 'right' ? (
              <Minimize2 size={16} className="text-purple-400" />
            ) : (
              <Maximize2 size={16} className="text-white/40 hover:text-purple-400" />
            )}
          </button>
          <span className="text-sm text-white/60">{rightLabel}</span>
        </div>
      </div>

      {/* Split View Container */}
      <div className="relative flex gap-4 min-h-[600px]">
        {/* Left Panel */}
        <motion.div
          className="relative"
          animate={{
            width: leftCollapsed ? '48px' : rightCollapsed ? '100%' : '50%',
            opacity: leftCollapsed ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {leftCollapsed ? (
            <Card className="h-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <ChevronRight
                size={24}
                className="text-cyan-400 animate-pulse"
                onClick={toggleLeftCollapse}
              />
            </Card>
          ) : (
            <Card className="h-full overflow-hidden">
              <div className="h-full overflow-y-auto p-4">
                {leftPanel}
              </div>
            </Card>
          )}
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="relative"
          animate={{
            width: rightCollapsed ? '48px' : leftCollapsed ? '100%' : '50%',
            opacity: rightCollapsed ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {rightCollapsed ? (
            <Card className="h-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <ChevronLeft
                size={24}
                className="text-purple-400 animate-pulse"
                onClick={toggleRightCollapse}
              />
            </Card>
          ) : (
            <Card className="h-full overflow-hidden">
              <div className="h-full overflow-y-auto p-4">
                {rightPanel}
              </div>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Keyboard hint */}
      <p className="text-xs text-white/30 text-center mt-4">
        Use the controls to focus on guide, form, or view both side by side
      </p>
    </div>
  );
}