// lib/constants/systems/environments/rules.ts

import type { EnvironmentRule, EnvironmentContext, BaseEnvironmentKey } from './types';

// User tier based rules — the sovereignty journey
export const userTierRules: EnvironmentRule[] = [
  {
    name: 'sovereign_weaver_premium',
    condition: (ctx) => ctx.userTier === 'sovereign_weaver',
    result: 'council',
    priority: 100,
  },
  {
    name: 'outlander_farsight',
    condition: (ctx) => ctx.userTier === 'outlander',
    result: 'observatory',
    priority: 90,
  },
  {
    name: 'guild_kindred',
    condition: (ctx) => ctx.userTier === 'guild',
    result: 'community',
    priority: 80,
  },
  {
    name: 'dweller_hearth',
    condition: (ctx) => ctx.userTier === 'dweller',
    result: 'home',
    priority: 60,
  },
];

// Sovereignty score based rules
export const sovereigntyRules: EnvironmentRule[] = [
  {
    name: 'master_weaver',
    condition: (ctx) => (ctx.sovereigntyScore || 0) >= 1000,
    result: 'observatory',
    priority: 90,
  },
  {
    name: 'adept_weaver',
    condition: (ctx) => (ctx.sovereigntyScore || 0) >= 500,
    result: 'library',
    priority: 70,
  },
  {
    name: 'initiate_weaver',
    condition: (ctx) => (ctx.sovereigntyScore || 0) >= 100,
    result: 'home',
    priority: 50,
  },
];

// Energy/mood based rules
export const energyRules: EnvironmentRule[] = [
  {
    name: 'low_energy_rest',
    condition: (ctx) => ctx.currentEnergy === 'low',
    result: 'support',
    priority: 85,
  },
  {
    name: 'high_energy_create',
    condition: (ctx) => ctx.currentEnergy === 'high' || ctx.currentEnergy === 'quantum',
    result: 'music',
    priority: 75,
  },
  {
    name: 'creative_mood',
    condition: (ctx) => ctx.currentMood?.includes('creative') || false,
    result: 'music',
    priority: 65,
  },
  {
    name: 'social_mood',
    condition: (ctx) => ctx.currentMood?.includes('social') || false,
    result: 'community',
    priority: 65,
  },
  {
    name: 'calm_mood',
    condition: (ctx) => ctx.currentMood?.includes('calm') || false,
    result: 'library',
    priority: 65,
  },
];

export const timeRules: EnvironmentRule[] = [
  {
    name: 'night_time',
    condition: (ctx) => ctx.timeOfDay === 'night',
    result: 'observatory',
    priority: 40,
  },
  {
    name: 'evening_wind_down',
    condition: (ctx) => ctx.timeOfDay === 'evening',
    result: 'lounge',
    priority: 35,
  },
  {
    name: 'morning_fresh',
    condition: (ctx) => ctx.timeOfDay === 'morning',
    result: 'home',
    priority: 30,
  },
];

export const seasonRules: EnvironmentRule[] = [
  {
    name: 'winter_cozy',
    condition: (ctx) => ctx.season === 'winter',
    result: 'lounge',
    priority: 25,
  },
  {
    name: 'spring_renewal',
    condition: (ctx) => ctx.season === 'spring',
    result: 'origin',
    priority: 25,
  },
  {
    name: 'summer_energetic',
    condition: (ctx) => ctx.season === 'summer',
    result: 'music',
    priority: 25,
  },
  {
    name: 'autumn_reflective',
    condition: (ctx) => ctx.season === 'autumn',
    result: 'library',
    priority: 25,
  },
];

// Accessibility rules (override most others)
export const accessibilityRules: EnvironmentRule[] = [
  {
    name: 'reduced_motion',
    condition: (ctx) => ctx.reducedMotion === true,
    result: 'home', // home has simpler animations
    priority: 1000, // Highest priority
  },
  {
    name: 'high_contrast',
    condition: (ctx) => ctx.highContrast === true,
    result: 'architecture', // architecture has high contrast naturally
    priority: 1000,
  },
];

export const performanceRules: EnvironmentRule[] = [
  {
    name: 'low_performance',
    condition: (ctx) => ctx.devicePerformance === 'low',
    result: 'home', // home is simplest
    priority: 500,
  },
  {
    name: 'slow_network',
    condition: (ctx) => ctx.networkSpeed === 'slow',
    result: 'home',
    priority: 400,
  },
];

// All rules combined (ordered by priority)
export const ALL_ENVIRONMENT_RULES: EnvironmentRule[] = [
  ...accessibilityRules,
  ...performanceRules,
  ...userTierRules,
  ...sovereigntyRules,
  ...energyRules,
  ...timeRules,
  ...seasonRules,
];

export const DEFAULT_ENVIRONMENT: BaseEnvironmentKey = 'home';