// src/components/asgard/domains/hephaestus/docs/interactive/DocCategoryCrystal.tsx
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/runes/Card';
import type { CardData } from '@/types/components/runes/card.types';

// ─── Types ─────────────────────────────────────────────────────────────────

export type CategoryColor = 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber';

export interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: CategoryColor;
  pages: DocPage[];
}

export interface DocPage {
  title: string;
  path: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: CategoryColor;
}

export interface DocCategoryCrystalProps {
  category: DocCategory;
  position: { x: number; y: number };
  depth: 'near' | 'mid' | 'far';
  delay?: number;
  isExpanded: boolean;
  onActivate: (category: DocCategory) => void;
  onClose: () => void;
}

// ─── COSMIC-Derived Color Map ──────────────────────────────────────────────

const crystalColors: Record<CategoryColor, { glow: string; bg: string; border: string; text: string }> = {
  cyan: {
    glow: 'shadow-[var(--glow-cosmic)]',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
  },
  purple: {
    glow: 'shadow-[var(--glow-quantum)]',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  pink: {
    glow: 'shadow-[var(--glow-fire)]',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
  },
  emerald: {
    glow: 'shadow-[var(--glow-success)]',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
  },
  amber: {
    glow: 'shadow-[var(--glow-warning)]',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
  },
};

const depthFactors = {
  near: { scale: 1, blur: 'blur-0', speed: 1 },
  mid: { scale: 0.85, blur: 'blur-[1px]', speed: 0.7 },
  far: { scale: 0.7, blur: 'blur-[2px]', speed: 0.5 },
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function DocCategoryCrystal({
  category,
  position,
  depth,
  delay = 0,
  isExpanded,
  onActivate,
  onClose,
}: DocCategoryCrystalProps) {
  const colors = crystalColors[category.color];
  const depthConfig = depthFactors[depth];
  const Icon = category.icon;

  const crystalData: CardData = {
    id: `crystal-${category.id}`,
    type: 'value',
    title: category.title,
    value: category.description,
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: depthConfig.scale }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.175, 0.885, 0.32, 1.275],
      }}
    >
      {/* ── Crystal (Collapsed State) ─────────────────────────────────── */}
      <motion.div
        className={`relative cursor-pointer ${depthConfig.blur}`}
        whileHover={{ scale: 1.1, y: -8 }}
        onClick={() => onActivate(category)}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay * 0.5,
          },
        }}
      >
        {/* Glow Ring */}
        <motion.div
          className={`absolute -inset-3 rounded-full opacity-60 ${colors.glow}`}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay * 0.3,
          }}
        />

        {/* Crystal Body */}
        <div
          className={`relative w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} border-2 backdrop-blur-md flex items-center justify-center shadow-lg`}
        >
          <Icon className={`${colors.text} h-7 w-7`} />
        </div>

        {/* Category Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <span className="text-xs text-star-dust/80 bg-deep-space/80 px-2 py-1 rounded-full border border-white/10">
            {category.title}
          </span>
        </div>
      </motion.div>

      {/* ── Expanded Panel ────────────────────────────────────────────── */}
      {isExpanded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-deep-space/95 backdrop-blur-xl shadow-2xl p-8"
            initial={{ scale: 0.7, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 60, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 15,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                <Icon className={`${colors.text} h-7 w-7`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-star-dust">{category.title}</h2>
                <p className="text-star-dust/50 text-sm">{category.description}</p>
              </div>
            </div>

            {/* Page Cards */}
            <div className="grid gap-4">
              {category.pages.map((page) => {
                const pageColors = crystalColors[page.badgeColor || category.color];
                const PageIcon = page.icon;

                return (
                  <a key={page.path} href={page.path} className="group block">
                    <Card
                      data={{
                        id: `doc-${page.path}`,
                        type: 'value',
                        title: page.title,
                        value: page.description,
                      }}
                      variant="glass"
                      radius="lg"
                      shadow="sm"
                      className="p-5 border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg ${pageColors.bg} flex items-center justify-center flex-shrink-0`}>
                          <PageIcon className={`${pageColors.text} h-5 w-5`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-star-dust group-hover:text-neurospark transition-colors">
                              {page.title}
                            </h3>
                            {page.badge && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${pageColors.bg} ${pageColors.text} border ${pageColors.border} whitespace-nowrap`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-star-dust/50 line-clamp-2">
                            {page.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </a>
                );
              })}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-star-dust/60 hover:text-star-dust flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}