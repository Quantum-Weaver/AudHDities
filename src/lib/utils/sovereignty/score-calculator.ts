/* src/lib/utils/sovereignty/score-calculator.ts */
import type { PublicProfiles } from 'src/types/hestia-core/profiles';

export const calculateSovereigntyScore = (profile: Partial<PublicProfiles>): number => {
  let score = 0;
  
  // Base score for profile completeness
  if (profile.avatar_url) score += 10;
  if (profile.bio && profile.bio.length > 50) score += 10;
  if (profile.display_name) score += 5;
  
  // Role bonuses
  if (profile.is_creator) score += 50;
  if (profile.is_vendor) score += 50;
  if (profile.is_admin) score += 100;
  if (profile.is_quantum_weaver) score += 500;
  
  // Tier bonuses
  if (profile.user_tier === 'ally') score += 25;
  if (profile.user_tier === 'corporate') score += 50;
  if (profile.user_tier === 'council') score += 200;
  
  // House affiliation
  if (profile.primary_house) score += 30;
  
  return Math.min(score, 1000); // Cap at 1000
};