// src/types/components/ui/aspect_ratio.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ASPECT RATIO TYPES                                     ║
// ║                    All type definitions for the AspectRatio component     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  AspectRatioValue,
  ObjectFit,
  AspectRatioRoundedSize,
} from '@/lib/constants/components/hof/aspect_ratio.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { AspectRatioValue, ObjectFit, AspectRatioRoundedSize };

// ─── Root Props ─────────────────────────────────────────────────────────────
export interface AspectRatioProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio value */
  ratio?: AspectRatioValue;
  /** Custom ratio as a number (width/height) */
  customRatio?: number;
  /** Object-fit for inner media */
  objectFit?: ObjectFit;
  /** Inner content (typically an image or video) */
  children?: React.ReactNode;
  /** Background color while loading or for fallback */
  background?: string;
  /** Make rounded corners */
  rounded?: boolean;
  /** Rounded corner size */
  roundedSize?: AspectRatioRoundedSize;
  /** Add a subtle border */
  bordered?: boolean;
  /** Add a glow effect on hover */
  glowOnHover?: boolean;
  /** Optional fallback content when no children */
  fallback?: React.ReactNode;
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

// ─── Variant Shortcut Props ─────────────────────────────────────────────────
export type AspectRatioShortcutProps = Omit<AspectRatioProps, 'ratio'>;

// ─── Composition Props ──────────────────────────────────────────────────────
export interface AspectRatioImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'ratio'> {
  src: string;
  alt: string;
  ratio?: AspectRatioValue;
  rounded?: boolean;
  roundedSize?: AspectRatioRoundedSize;
}

export interface AspectRatioVideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  ratio?: AspectRatioValue;
  rounded?: boolean;
  poster?: string;
}

export interface AspectRatioEmbedProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src: string;
  title: string;
  ratio?: AspectRatioValue;
  rounded?: boolean;
}