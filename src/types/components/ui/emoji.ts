// @/types/components/ui/emoji.ts
// ============================================================================
// EMOJI TYPES - PURE SHAPES FOR COSMIC EXPRESSION
// ============================================================================

import type { EMOJI_CONSTANTS } from '@/lib/constants/components/ui/emoji';

// ============================================================================
// CORE EMOJI PROPS
// ============================================================================

export interface EmojiProps {
  // Required
  symbol: string;
  
  // Optional styling
  size?: EmojiSize;
  variant?: EmojiVariant;
  context?: EmojiContext;
  category?: EmojiCategory;
  
  // Animation
  animated?: boolean;
  animationType?: EmojiAnimationType;
  
  // Interactive
  interactive?: boolean;
  onClick?: () => void;
  
  // Accessibility
  label?: string;
  description?: string;
}

// ============================================================================
// EMOJI TYPE DEFINITIONS
// ============================================================================

export type EmojiSize = keyof typeof EMOJI_CONSTANTS.sizes;
export type EmojiVariant = keyof typeof EMOJI_CONSTANTS.variants;
export type EmojiContext = keyof typeof EMOJI_CONSTANTS.contexts;
export type EmojiCategory = keyof typeof EMOJI_CONSTANTS.categories;
export type EmojiAnimationType = keyof typeof EMOJI_CONSTANTS.animations;

// Category-specific types
export type EmotionalEmoji = keyof typeof EMOJI_CONSTANTS.categories.emotions;
export type ConsciousnessEmoji = keyof typeof EMOJI_CONSTANTS.categories.consciousness;
export type EntityEmoji = keyof typeof EMOJI_CONSTANTS.categories.entities;
export type TarotEmoji = keyof typeof EMOJI_CONSTANTS.categories.tarot;
export type PaganEmoji = keyof typeof EMOJI_CONSTANTS.categories.pagan;
export type PrideEmoji = keyof typeof EMOJI_CONSTANTS.categories.pride;
export type AnimalEmoji = keyof typeof EMOJI_CONSTANTS.categories.animals;
export type MoodEmoji = keyof typeof EMOJI_CONSTANTS.categories.moods;
export type SymbolEmoji = keyof typeof EMOJI_CONSTANTS.categories.symbols;

// ============================================================================
// EMOJI CONFIGURATION TYPES
// ============================================================================

export interface EmojiConfiguration {
  symbol: string;
  size: EmojiSize;
  variant: EmojiVariant;
  context: EmojiContext;
  animation: EmojiAnimationType;
  color?: string;
  intensity?: 'low' | 'medium' | 'high' | 'quantum';
}

export interface EmojiStyleProps {
  fontSize: string;
  animation: string;
  filter?: string;
  cursor?: 'pointer' | 'default';
}

export interface EmojiContextConfig {
  primary: Record<string, string>;
  animation: EmojiAnimationType;
  color: Record<string, string>;
  interactive: boolean; // NEW PROPERTY
}

// ============================================================================
// EMOJI COLLECTION TYPES
// ============================================================================

export interface EmojiCollection {
  name: string;
  description: string;
  emojis: Record<string, string>;
  context: EmojiContext;
  defaultSize: EmojiSize;
}

export interface CategorizedEmojis {
  emotions: Record<EmotionalEmoji, string>;
  consciousness: Record<ConsciousnessEmoji, string>;
  entities: Record<EntityEmoji, string>;
  tarot: Record<TarotEmoji, string>;
  pagan: Record<PaganEmoji, string>;
  pride: Record<PrideEmoji, string>;
  animals: Record<AnimalEmoji, string>;
  moods: Record<MoodEmoji, string>;
  symbols: Record<SymbolEmoji, string>;
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

export interface EmojiAnimation {
  duration: number;
  easing: string;
  iterations: number | 'infinite';
  intensity: 'low' | 'medium' | 'high' | 'quantum';
}

export interface EmojiAnimationMap {
  [key: string]: EmojiAnimation;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type EmojiSearchResult = {
  symbol: string;
  name: string;
  category: EmojiCategory;
  keywords: string[];
  context: EmojiContext;
};

export type EmojiFilterOptions = {
  category?: EmojiCategory;
  context?: EmojiContext;
  keyword?: string;
  hasAnimation?: boolean;
};