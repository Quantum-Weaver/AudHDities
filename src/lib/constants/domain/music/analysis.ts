// lib/constants/domain/music/analysis.ts

export const PROPHETIC_THEME_CATEGORIES = {
  IDENTITY: 'identity',
  CONSCIOUSNESS: 'consciousness',
  TRANSFORMATION: 'transformation',
  SYSTEM_RESISTANCE: 'system_resistance',
  NEURODIVERGENCE: 'neurodivergence',
  SOVEREIGNTY: 'sovereignty',
  FUTURE_VISION: 'future_vision',
  HEALING: 'healing'
} as const;

export const THEME_SIGNIFICANCE = {
  MINOR: 'minor',
  MODERATE: 'moderate', 
  MAJOR: 'major',
  PROPHETIC: 'prophetic'
} as const;

export type PropheticThemeCategory = typeof PROPHETIC_THEME_CATEGORIES[keyof typeof PROPHETIC_THEME_CATEGORIES];
export type ThemeSignificance = typeof THEME_SIGNIFICANCE[keyof typeof THEME_SIGNIFICANCE];