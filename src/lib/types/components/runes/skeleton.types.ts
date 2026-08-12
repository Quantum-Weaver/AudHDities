// src/lib/types/components/runes/skeleton.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SKELETON TYPES                                         ║
// ║                    All type definitions for the Skeleton component        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SkeletonVariant,
  SkeletonAnimation,
  SkeletonSize,
// Repointed 2026-08-11: this file moved src/types → src/lib/types on 08-08,
// which left this relative climb one level short. The alias below is the
// style its own next line already keeps.
} from '@/lib/constants/components/runes/skeleton.variants';
import type { BORDER_RADII } from '@/lib/constants/cosmic';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { SkeletonVariant, SkeletonAnimation, SkeletonSize };

// ─── Rounded Size ──────────────────────────────────────────────────────────
export type SkeletonRoundedSize = keyof typeof BORDER_RADII;

// ─── Main Props ────────────────────────────────────────────────────────────
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the skeleton */
  variant?: SkeletonVariant;
  /** Animation type */
  animation?: SkeletonAnimation;
  /** Size of the skeleton */
  size?: SkeletonSize;
  /** Custom width (overrides size) */
  width?: string | number;
  /** Custom height (overrides size) */
  height?: string | number;
  /** Whether to apply rounded corners */
  rounded?: boolean;
  /** Rounded corner size */
  roundedSize?: SkeletonRoundedSize;
  /** Number of lines for text variant */
  lines?: number;
  /** Line height for text variant */
  lineHeight?: string;
  /** Last line width percentage (for text variant) */
  lastLineWidth?: number;
}

// ─── Composition Props ─────────────────────────────────────────────────────
export interface CardSkeletonProps {
  /** Number of text lines in the card */
  textLines?: number;
  /** Show avatar in card */
  showAvatar?: boolean;
  /** Show image in card */
  showImage?: boolean;
  /** Image height */
  imageHeight?: string;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

export interface ListSkeletonProps {
  /** Number of items in the list */
  items?: number;
  /** Show avatar in each item */
  showAvatar?: boolean;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

export interface ProfileSkeletonProps {
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

export interface DashboardSkeletonProps {
  /** Number of stat cards */
  statCards?: number;
  /** Number of chart rows */
  chartRows?: number;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}

export interface ChatSkeletonProps {
  /** Number of messages */
  messages?: number;
  /** Animation type */
  animation?: SkeletonAnimation;
  className?: string;
}