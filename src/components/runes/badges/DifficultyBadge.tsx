// src/components/runes/badges/DifficultyBadge.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getDifficultyColor } from '@/lib/utils/components/runes/card.utils';

// ============================================================================
// TYPES
// ============================================================================

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'master';

export interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const difficultyLabels: Record<DifficultyLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  master: 'Master',
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * DifficultyBadge — Color-coded difficulty indicator for quest cards.
 * Colors are derived from COSMIC tokens via getDifficultyColor().
 */
export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const colorClass = getDifficultyColor(difficulty);
  
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorClass)}>
      {difficultyLabels[difficulty]}
    </span>
  );
};

DifficultyBadge.displayName = 'DifficultyBadge';