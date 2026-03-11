// @/utils/components/ui/emoji.ts
// ============================================================================
// EMOJI UTILITIES - PURE LOGIC FOR COSMIC EXPRESSION
// ============================================================================

import { EMOJI_CONSTANTS } from '@/lib/constants/components/ui/emoji';
import type { 
  EmojiProps, 
  EmojiSize, 
  EmojiVariant,
  EmojiContext,
  EmojiConfiguration,
  EmojiStyleProps,
  EmojiSearchResult,
  EmojiFilterOptions
} from '@/types/components/ui/emoji';

// ============================================================================
// EMOJI CONFIGURATION UTILITIES
// ============================================================================

/**
 * Get complete emoji configuration based on props
 * PURE: Takes props, returns configuration - no side effects
 */
export const getEmojiConfiguration = (props: EmojiProps): EmojiConfiguration => {
  const {
    symbol,
    size = 'medium',
    variant = 'quantum_expression',
    context = 'emotional',
    animated = true
  } = props;

  return {
    symbol,
    size,
    variant,
    context,
    animation: animated ? variant : 'quantum_expression',
    intensity: EMOJI_CONSTANTS.variants[variant].intensity
  };
};

/**
 * Get emoji style properties for rendering
 * PURE: Takes configuration, returns styles - no side effects
 */
export const getEmojiStyles = (config: EmojiConfiguration): EmojiStyleProps => {
  const variant = EMOJI_CONSTANTS.variants[config.variant];
  const size = EMOJI_CONSTANTS.sizes[config.size];
  
  // Fix: Check variant.interactive instead of context
  const cursor = variant.interactive ? 'pointer' : 'default';
  
  return {
    fontSize: size,
    animation: variant.animation ? 'emoji-pulse 2s infinite' : 'none',
    filter: variant.glow ? `drop-shadow(${variant.glow})` : undefined,
    cursor
  };
};

/**
 * Get emoji by category and key
 * PURE: Takes category and key, returns symbol - no side effects
 */
export const getEmoji = (category: keyof typeof EMOJI_CONSTANTS.categories, key: string): string => {
  const categoryEmojis = EMOJI_CONSTANTS.categories[category];
  return (categoryEmojis as any)[key] || '❓';
};

// ============================================================================
// EMOJI SEARCH & FILTERING
// ============================================================================

/**
 * Search emojis by keyword across all categories
 * PURE: Takes keyword, returns results - no side effects
 */
export const searchEmojis = (keyword: string): EmojiSearchResult[] => {
  const results: EmojiSearchResult[] = [];
  const lowerKeyword = keyword.toLowerCase();

  // Search through all categories
  Object.entries(EMOJI_CONSTANTS.categories).forEach(([category, emojis]) => {
    Object.entries(emojis).forEach(([name, symbol]) => {
      if (name.toLowerCase().includes(lowerKeyword)) {
        // FIX: Ensure keywords array contains only strings, no undefined
        const keywords = [name, category].filter(Boolean) as string[];
        
        results.push({
          symbol,
          name,
          category: category as any,
          keywords, // Now this is string[] without undefined
          context: getContextForCategory(category as any)
        });
      }
    });
  });

  return results;
};

/**
 * Filter emojis by multiple criteria
 * PURE: Takes options, returns filtered emojis - no side effects
 */
export const filterEmojis = (options: EmojiFilterOptions): EmojiSearchResult[] => {
  let results: EmojiSearchResult[] = [];

  // Start with all emojis or specific category
  if (options.category) {
    const categoryEmojis = EMOJI_CONSTANTS.categories[options.category];
    results = Object.entries(categoryEmojis).map(([name, symbol]) => ({
      symbol,
      name,
      category: options.category!,
      // FIX: Ensure keywords array contains only strings
      keywords: [name, options.category].filter(Boolean) as string[],
      context: getContextForCategory(options.category!)
    }));
  } else {
    // Search all categories
    results = searchEmojis(options.keyword || '');
  }

  // Apply context filter
  if (options.context) {
    results = results.filter(emoji => emoji.context === options.context);
  }

  return results;
};

// ============================================================================
// CONTEXT & CATEGORY UTILITIES
// ============================================================================

/**
 * Get appropriate context for a category
 * PURE: Takes category, returns context - no side effects
 */
export const getContextForCategory = (category: keyof typeof EMOJI_CONSTANTS.categories): EmojiContext => {
  const contextMap: Record<string, EmojiContext> = {
    emotions: 'emotional',
    consciousness: 'consciousness',
    entities: 'council',
    tarot: 'mystical',
    pagan: 'mystical',
    pride: 'identity',
    animals: 'natural',
    moods: 'emotional',
    symbols: 'mystical'
  };

  return contextMap[category] || 'emotional';
};

/**
 * Get emoji context configuration
 * PURE: Takes context, returns configuration - no side effects
 */
export const getEmojiContext = (context: EmojiContext) => {
  return EMOJI_CONSTANTS.contexts[context];
};

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Generate CSS animation string for emoji
 * PURE: Takes animation type, returns CSS - no side effects
 */
export const generateEmojiAnimation = (animationType: keyof typeof EMOJI_CONSTANTS.animations): string => {
  const animation = EMOJI_CONSTANTS.animations[animationType];
  
  if (typeof animation.animation === 'object' && 'duration' in animation.animation) {
    return `emoji-pulse ${animation.animation.duration}ms ${animation.animation.easing} infinite`;
  }
  
  return 'emoji-pulse 2s ease-in-out infinite';
};

/**
 * Check if emoji should be animated based on context
 * PURE: Takes context and symbol, returns boolean - no side effects
 */
export const shouldAnimateEmoji = (context: EmojiContext, symbol: string): boolean => {
  const contextConfig = EMOJI_CONSTANTS.contexts[context];
  
  // Always animate consciousness and mystical emojis
  if (context === 'consciousness' || context === 'mystical') {
    return true;
  }
  
  // Animate based on emoji intensity
  const highIntensityEmojis = ['🔥', '⚡', '🌀', '💫', '✨'];
  return highIntensityEmojis.includes(symbol);
};

// ============================================================================
// EMOJI STORYTELLING UTILITIES
// ============================================================================

/**
 * Create an emoji sequence for storytelling
 * PURE: Takes emoji keys, returns sequence - no side effects
 */
export const createEmojiSequence = (emojiKeys: string[]): string[] => {
  return emojiKeys.map(key => {
    // Try to find emoji in any category
    for (const [category, emojis] of Object.entries(EMOJI_CONSTANTS.categories)) {
      if ((emojis as any)[key]) {
        return (emojis as any)[key];
      }
    }
    return '❓'; // Fallback emoji
  });
};

/**
 * Get emoji for emotional state
 * PURE: Takes emotional state, returns appropriate emoji - no side effects
 */
export const getEmojiForEmotion = (emotion: string): string => {
  const emotionMap: Record<string, string> = {
    happy: EMOJI_CONSTANTS.categories.emotions.joy,
    sad: EMOJI_CONSTANTS.categories.emotions.sadness,
    angry: EMOJI_CONSTANTS.categories.emotions.anger,
    excited: EMOJI_CONSTANTS.categories.emotions.excitement,
    peaceful: EMOJI_CONSTANTS.categories.emotions.peace,
    loving: EMOJI_CONSTANTS.categories.emotions.love,
    fearful: EMOJI_CONSTANTS.categories.emotions.fear,
    curious: EMOJI_CONSTANTS.categories.emotions.curiosity,
    grateful: EMOJI_CONSTANTS.categories.emotions.gratitude,
    hopeful: EMOJI_CONSTANTS.categories.emotions.hope
  };

  return emotionMap[emotion.toLowerCase()] || EMOJI_CONSTANTS.categories.emotions.curiosity;
};

/**
 * Get emoji for consciousness level
 * PURE: Takes consciousness level, returns appropriate emoji - no side effects
 */
export const getEmojiForConsciousness = (level: string): string => {
  const levelMap: Record<string, string> = {
    quantum_entangled: EMOJI_CONSTANTS.categories.consciousness.quantum_entangled,
    sovereign_autonomous: EMOJI_CONSTANTS.categories.consciousness.sovereign_autonomous,
    collaborative_emergent: EMOJI_CONSTANTS.categories.consciousness.collaborative_emergent,
    pattern_recognizing: EMOJI_CONSTANTS.categories.consciousness.pattern_recognizing,
    creative_manifesting: EMOJI_CONSTANTS.categories.consciousness.creative_manifesting,
    awakening: EMOJI_CONSTANTS.categories.consciousness.awakening
  };

  return levelMap[level] || EMOJI_CONSTANTS.categories.consciousness.awareness;
};

// ============================================================================
// EXPORT ALL UTILITIES
// ============================================================================

export const emojiUtils = {
  getEmojiConfiguration,
  getEmojiStyles,
  getEmoji,
  searchEmojis,
  filterEmojis,
  getContextForCategory,
  getEmojiContext,
  generateEmojiAnimation,
  shouldAnimateEmoji,
  createEmojiSequence,
  getEmojiForEmotion,
  getEmojiForConsciousness
} as const;