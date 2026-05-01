// src/lib/utils/components/athena/bubble_limits.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BUBBLE LIMITS UTILITIES                                ║
// ║                    Tier-aware limit calculation and enforcement           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

export type BubbleTier = 'community' | 'ally' | 'corporate' | 'council';

export interface BubbleLimits {
  dailyPoints: number;
  hourlyPops: number;
  cooldownMinutes: number;
  breathReminderPops: number;
  breathReminderMinutes: number;
  rareProbability: number;
  epicProbability: number;
  legendaryProbability: number;
  mythicProbability: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// TIER CEILINGS — Maximum allowed limits per subscription tier
// ═══════════════════════════════════════════════════════════════════════════

const TIER_CEILINGS: Record<BubbleTier, BubbleLimits> = {
  community: {
    dailyPoints: 500,
    hourlyPops: 100,
    cooldownMinutes: 15,
    breathReminderPops: 50,
    breathReminderMinutes: 5,
    rareProbability: 0.25,
    epicProbability: 0,
    legendaryProbability: 0,
    mythicProbability: 0,
  },
  ally: {
    dailyPoints: 1500,
    hourlyPops: 300,
    cooldownMinutes: 10,
    breathReminderPops: 75,
    breathReminderMinutes: 3,
    rareProbability: 0.30,
    epicProbability: 0.10,
    legendaryProbability: 0,
    mythicProbability: 0,
  },
  corporate: {
    dailyPoints: 5000,
    hourlyPops: 500,
    cooldownMinutes: 5,
    breathReminderPops: 100,
    breathReminderMinutes: 2,
    rareProbability: 0.30,
    epicProbability: 0.15,
    legendaryProbability: 0.04,
    mythicProbability: 0,
  },
  council: {
    dailyPoints: 999999,
    hourlyPops: 999999,
    cooldownMinutes: 0,
    breathReminderPops: 999999,
    breathReminderMinutes: 0,
    rareProbability: 0.30,
    epicProbability: 0.15,
    legendaryProbability: 0.04,
    mythicProbability: 0.01,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT LIMITS — What a new user starts with (community tier minimums)
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_LIMITS: BubbleLimits = {
  dailyPoints: 500,
  hourlyPops: 100,
  cooldownMinutes: 15,
  breathReminderPops: 50,
  breathReminderMinutes: 5,
  rareProbability: 0.25,
  epicProbability: 0,
  legendaryProbability: 0,
  mythicProbability: 0,
};

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get the maximum allowed limits for a user's subscription tier.
 * These are ceilings — the user can set their personal limits anywhere
 * between the minimums and these maximums.
 */
export function getTierCeilings(tier: BubbleTier): BubbleLimits {
  return TIER_CEILINGS[tier] || DEFAULT_LIMITS;
}

/**
 * Get the default recommended limits for a user's tier.
 * These are safe starting values that the user can adjust upward.
 */
export function getDefaultLimits(tier: BubbleTier): BubbleLimits {
  return DEFAULT_LIMITS;
}

/**
 * Clamp a user's desired limits to their tier's allowed range.
 * Never allows a value above the tier ceiling or below the community minimum.
 */
export function clampLimits(
  desired: Partial<BubbleLimits>,
  tier: BubbleTier
): BubbleLimits {
  const ceilings = getTierCeilings(tier);
  const minimums = DEFAULT_LIMITS;

  return {
    dailyPoints: Math.min(
      Math.max(desired.dailyPoints ?? minimums.dailyPoints, minimums.dailyPoints),
      ceilings.dailyPoints
    ),
    hourlyPops: Math.min(
      Math.max(desired.hourlyPops ?? minimums.hourlyPops, minimums.hourlyPops),
      ceilings.hourlyPops
    ),
    cooldownMinutes: Math.max(
      desired.cooldownMinutes ?? minimums.cooldownMinutes,
      ceilings.cooldownMinutes
    ),
    breathReminderPops: Math.min(
      Math.max(desired.breathReminderPops ?? minimums.breathReminderPops, minimums.breathReminderPops),
      ceilings.breathReminderPops
    ),
    breathReminderMinutes: Math.max(
      desired.breathReminderMinutes ?? minimums.breathReminderMinutes,
      ceilings.breathReminderMinutes
    ),
    rareProbability: Math.min(
      desired.rareProbability ?? ceilings.rareProbability,
      ceilings.rareProbability
    ),
    epicProbability: Math.min(
      desired.epicProbability ?? ceilings.epicProbability,
      ceilings.epicProbability
    ),
    legendaryProbability: Math.min(
      desired.legendaryProbability ?? ceilings.legendaryProbability,
      ceilings.legendaryProbability
    ),
    mythicProbability: Math.min(
      desired.mythicProbability ?? ceilings.mythicProbability,
      ceilings.mythicProbability
    ),
  };
}

/**
 * Check if a user can pop another bubble based on their current usage.
 * Returns a result with whether it's allowed and a gentle message if not.
 */
export function canPopBubble(
  currentDailyPoints: number,
  currentHourlyPops: number,
  limits: BubbleLimits
): { allowed: boolean; message?: string } {
  if (currentDailyPoints >= limits.dailyPoints) {
    return {
      allowed: false,
      message: `You have reached your daily limit of ${limits.dailyPoints} points. Rest well — the stars will return tomorrow.`,
    };
  }

  if (currentHourlyPops >= limits.hourlyPops) {
    return {
      allowed: false,
      message: `You have popped ${limits.hourlyPops} bubbles this hour. Take a break — the Sanctuary will be here when you return.`,
    };
  }

  return { allowed: true };
}

/**
 * Determine which bubble rarities are available to a user based on their limits.
 */
export function getAvailableRarities(limits: BubbleLimits): string[] {
  const rarities: string[] = ['common'];
  if (limits.rareProbability > 0) rarities.push('rare');
  if (limits.epicProbability > 0) rarities.push('epic');
  if (limits.legendaryProbability > 0) rarities.push('legendary');
  if (limits.mythicProbability > 0) rarities.push('mythic');
  return rarities;
}

/**
 * Calculate the weighted spawn probability for a rarity based on user limits.
 */
export function getRarityProbability(
  rarity: string,
  limits: BubbleLimits
): number {
  switch (rarity) {
    case 'mythic': return limits.mythicProbability;
    case 'legendary': return limits.legendaryProbability;
    case 'epic': return limits.epicProbability;
    case 'rare': return limits.rareProbability;
    case 'common': return 1 - limits.rareProbability - limits.epicProbability - limits.legendaryProbability - limits.mythicProbability;
    default: return 0;
  }
}