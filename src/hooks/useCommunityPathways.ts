// hooks/useCommunityPathways.ts
import { useMemo } from 'react';
import { 
  getAudiencePathway, 
  getSupportByEconomicModel,
  calculateAudienceMetrics,
  getCapacityAdvantages,
  getWhatWeCanOffer,
  getOurBoundaries
} from '@/utils/domain/community/pathways';
import {
  getFeaturedPlatforms,
  calculatePlatformMetrics
} from '@/utils/domain/community/platforms';

export const useCommunityPathways = (audienceType?: string) => {
  return useMemo(() => {
    const audiencePathway = audienceType ? getAudiencePathway(audienceType) : null;
    
    return {
      // Audience-specific data
      audiencePathway,
      supportPathways: audiencePathway ? 
        getSupportByEconomicModel(audiencePathway.economicRole) : [],
      
      // Capacity framework
      advantages: getCapacityAdvantages(),
      capabilities: getWhatWeCanOffer(),
      boundaries: getOurBoundaries(),
      
      // Platform engagement
      featuredPlatforms: getFeaturedPlatforms(),
      
      // Metrics
      audienceMetrics: calculateAudienceMetrics(),
      platformMetrics: calculatePlatformMetrics(),
      
      // Quick access
      economicModels: {
        'emergence-investment': getSupportByEconomicModel('emergence-investment'),
        'transparency-commerce': getSupportByEconomicModel('transparency-commerce'),
        'witness-economy': getSupportByEconomicModel('witness-economy')
      }
    };
  }, [audienceType]);
};