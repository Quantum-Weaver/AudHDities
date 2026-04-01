// src/utils/domain/community/platforms.ts
import { socialPlatformsData, paymentPlatformsData } from '@/data/community/social-platforms';
import { gamingProfilesData } from '@/data/community/gaming-profiles';

/**
 * Get social platforms by economic role
 */
export const getPlatformsByEconomicRole = (economicRole: string) => {
  return socialPlatformsData.filter(platform => 
    platform.economicRole === economicRole
  );
};

/**
 * Get featured platforms for quick access
 */
export const getFeaturedPlatforms = () => {
  return socialPlatformsData.filter(platform => platform.featured);
};

/**
 * Get platforms by audience tier
 */
export const getPlatformsByAudienceTier = (tier: string) => {
  return socialPlatformsData.filter(platform => 
    platform.audienceTier === tier
  );
};

/**
 * Get gaming profiles by economic context
 */
export const getGamingProfilesByContext = (economicContext: string) => {
  return gamingProfilesData.filter(profile => 
    profile.economicContext === economicContext
  );
};

/**
 * Get active gaming profiles
 */
export const getActiveGamingProfiles = () => {
  return gamingProfilesData.filter(profile => profile.status === 'Active');
};

/**
 * Get payment platforms for economic support
 */
export const getPaymentPlatforms = () => {
  return paymentPlatformsData;
};

/**
 * Get platforms by struggle visibility preference
 */
export const getPlatformsByStruggleVisibility = (visibility: string) => {
  return socialPlatformsData.filter(platform => 
    platform.struggleVisibility === visibility
  );
};

/**
 * Calculate community platform metrics
 */
export const calculatePlatformMetrics = () => {
  const totalPlatforms = socialPlatformsData.length;
  const featuredPlatforms = socialPlatformsData.filter(p => p.featured).length;
  const gamingProfiles = gamingProfilesData.length;
  const paymentPlatforms = paymentPlatformsData.length;

  const economicRoles = socialPlatformsData.reduce((acc, platform) => {
    acc[platform.economicRole] = (acc[platform.economicRole] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalPlatforms,
    featuredPlatforms,
    gamingProfiles,
    paymentPlatforms,
    economicRoles,
    audienceTiers: {
      public: socialPlatformsData.filter(p => p.audienceTier === 'public').length,
      premium: socialPlatformsData.filter(p => p.audienceTier === 'premium').length
    }
  };
};