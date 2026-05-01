// src/utils/domain/community/pathways.ts
import { audiencePathways, collaborationFrameworks, supportPathways } from '@/data/community/audience-pathways-data';
import { callToActions } from '@/data/community/call-to-actions';
import { capacityItems } from '@/data/community/capacity-boundaries';
import { sanctuaryInvitations } from '@/data/community/invitation-templates';
import { AUDIENCE_TYPES, COMMITMENT_LEVELS, SUPPORT_TYPES } from '@/lib/constants/domain/community/engagement';

/**
 * Get audience pathway by type with full economic context
 */
export const getAudiencePathway = (audienceType: string) => {
  return audiencePathways.find(pathway => 
    pathway.economicRole?.includes(audienceType) || 
    pathway.title.toLowerCase().includes(audienceType.toLowerCase())
  );
};

/**
 * Get all pathways for a commitment level
 */
export const getPathwaysByCommitment = (commitmentLevel: string) => {
  return audiencePathways.filter(pathway => 
    pathway.commitmentLevel === commitmentLevel
  );
};

/**
 * Get support pathways by economic model
 */
export const getSupportByEconomicModel = (economicModel: string) => {
  return supportPathways.filter(pathway => 
    pathway.economicValue === economicModel
  );
};

/**
 * Get collaboration frameworks by principle
 */
export const getCollaborationFramework = (principle: string) => {
  return collaborationFrameworks.find(framework => 
    framework.principle.toLowerCase().includes(principle.toLowerCase())
  );
};

/**
 * Get call-to-actions by audience role
 */
export const getCTAsByAudienceRole = (audienceRole: string) => {
  return callToActions.filter(cta => 
    cta.audienceRole === audienceRole
  );
};

/**
 * Get capacity items by type and priority
 */
export const getCapacityItems = (type?: string, priority?: string) => {
  let items = capacityItems;
  if (type) items = items.filter(item => item.type === type);
  if (priority) items = items.filter(item => item.priority === priority);
  return items;
};

/**
 * Get sanctuary invitations by audience
 */
export const getSanctuaryInvitations = (audience: string) => {
  return sanctuaryInvitations.filter(invitation => 
    invitation.audience === audience
  );
};


/**
 * Calculate audience engagement metrics
 */
export const calculateAudienceMetrics = () => {
  const totalPathways = audiencePathways.length;
  const totalSupport = supportPathways.length;
  const totalCTAs = callToActions.length;
  
  const commitmentDistribution = {
    [COMMITMENT_LEVELS.INVEST]: audiencePathways.filter(p => p.commitmentLevel === COMMITMENT_LEVELS.INVEST).length,
    [COMMITMENT_LEVELS.CO_CREATE]: audiencePathways.filter(p => p.commitmentLevel === COMMITMENT_LEVELS.CO_CREATE).length,
    [COMMITMENT_LEVELS.WITNESS]: audiencePathways.filter(p => p.commitmentLevel === COMMITMENT_LEVELS.WITNESS).length
  };

  return {
    totalPathways,
    totalSupport,
    totalCTAs,
    commitmentDistribution,
    economicModels: {
      'emergence-investment': supportPathways.filter(p => p.economicValue === 'emergence-investment').length,
      'transparency-commerce': supportPathways.filter(p => p.economicValue === 'transparency-commerce').length,
      'witness-economy': supportPathways.filter(p => p.economicValue === 'witness-economy').length
    }
  };
};

/**
 * Get all capacity advantages (disability advantages)
 */
export const getCapacityAdvantages = () => {
  return capacityItems.filter(item => item.type === 'advantage');
};

/**
 * Get what we can offer (emergence economics capacity)
 */
export const getWhatWeCanOffer = () => {
  return capacityItems.filter(item => item.type === 'can');
};

/**
 * Get our boundaries (what we cannot do)
 */
export const getOurBoundaries = () => {
  return capacityItems.filter(item => item.type === 'cannot');
};