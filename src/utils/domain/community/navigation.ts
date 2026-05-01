// src/utils/domain/community/navigation.ts
import { APP_ROUTES } from '@/lib/constants/systems/navigation/paths';
import { getFeaturedPlatforms, getPaymentPlatforms } from './platforms';
import { getAudiencePathway, getSupportByEconomicModel } from './pathways';

/**
 * Get community navigation items with audience pathways
 */
export const getCommunityNavigation = () => {
  const featuredPlatforms = getFeaturedPlatforms();
  const paymentPlatforms = getPaymentPlatforms();
  
  return {
    main: {
      pathway: APP_ROUTES.community,
      description: 'Join our emergence economy and witness human potential unfolding'
    },
    audiencePathways: {
      investors: getAudiencePathway('Emergence Investors'),
      partners: getAudiencePathway('Collaborative Partners'),
      witnesses: getAudiencePathway('Transformation Witnesses')
    },
    supportPathways: {
      investment: getSupportByEconomicModel('emergence-investment'),
      coCreation: getSupportByEconomicModel('transparency-commerce'),
      amplification: getSupportByEconomicModel('witness-economy')
    },
    platforms: {
      featured: featuredPlatforms,
      payment: paymentPlatforms
    }
  };
};

/**
 * Get emergency support navigation
 */
export const getEmergencySupportNavigation = () => {
  return {
    direct: APP_ROUTES.support,
    economic: '/emergence-investment',
    collaborative: '/transparent-development',
    amplification: '/emergence-story'
  };
};

/**
 * Get invitation pathways for different audiences
 */
export const getInvitationPathways = () => {
  return {
    investors: {
      primary: '/emergence-investment',
      secondary: '/premium-access',
      description: 'Front row seats to capability emergence'
    },
    partners: {
      primary: '/transparent-development', 
      secondary: '/collaboration-portal',
      description: 'Co-create while we learn publicly'
    },
    witnesses: {
      primary: '/emergence-story',
      secondary: '/community-amplification',
      description: 'Share our transformation story'
    }
  };
};