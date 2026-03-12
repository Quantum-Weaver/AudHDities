// @/types/components/ui/carousel.ts
// ============================================================================
// CAROUSEL TYPES - PURE SHAPES ONLY
// ============================================================================

export interface QuotesCarouselProps {
  quotes: string[];
  autoRotate?: boolean;
  rotationInterval?: number;
  showAuthor?: boolean;
  variant?: 'quantum' | 'cosmic' | 'sovereign' | 'holographic';
  className?: string;
  onQuoteChange?: (quote: string, index: number) => void;
}

export interface CarouselState {
  currentIndex: number;
  isPlaying: boolean;
  direction: 'forward' | 'backward';
}

export interface CarouselAnimation {
  enter: any; // framer-motion config
  exit: any;
  transition: any;
}