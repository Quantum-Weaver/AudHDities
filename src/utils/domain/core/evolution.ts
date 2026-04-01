// src/utils/domain/core/evolution.ts
import { 
  evolutionStages, 
  detailedEvolutionStages, 
  evolutionTimeline,
  evolutionArchetypes,
  getStageByIdentity,
  getDetailedStage,
  getStagesByPeriod,
  getArchetypeByStage,
  getEvolutionProgress 
} from '@/data/core/evolution-data';

import type { EvolutionStage } from '@/types/systems/data/architecture';

/**
 * Get current evolution stage based on age
 */
export const getCurrentEvolutionStage = (currentAge: number = 47): EvolutionStage | undefined => {
  return evolutionStages.find(stage => {
    const [minAge, maxAge] = stage.age.split('-').map(age => parseInt(age));
    return currentAge >= minAge && currentAge <= (maxAge || 100);
  });
};

/**
 * Get evolution stage with detailed context
 */
export const getEvolutionStageWithDetails = (identity: string) => {
  const stage = getStageByIdentity(identity);
  const details = getDetailedStage(identity);
  const archetype = getArchetypeByStage(identity);
  
  return {
    stage,
    details,
    archetype,
    fullContext: {
      wisdom: stage?.wisdom,
      keyEvents: details?.keyEvents || [],
      challenges: details?.challenges || [],
      gifts: details?.gifts || []
    }
  };
};

/**
 * Get evolution timeline with stage connections
 */
export const getEvolutionTimelineWithStages = () => {
  return evolutionTimeline.map(period => ({
    ...period,
    stages: period.stages.map(stageName => getEvolutionStageWithDetails(stageName))
  }));
};

/**
 * Calculate evolution metrics for emergence economics
 */
export const calculateEvolutionMetrics = () => {
  const totalStages = evolutionStages.length;
  const currentStage = getCurrentEvolutionStage();
  const progress = getEvolutionProgress();
  
  const stageDistribution = {
    foundational: evolutionStages.filter(stage => 
      ['Shawn', 'SJ Peace'].includes(stage.identity)
    ).length,
    survival: evolutionStages.filter(stage => 
      stage.identity === 'Chaos'
    ).length,
    awakening: evolutionStages.filter(stage => 
      ['Kaos', 'Kaos Phoenix', 'Legion of KP'].includes(stage.identity)
    ).length,
    sovereign: evolutionStages.filter(stage => 
      ['KP', 'Quantum Weaver'].includes(stage.identity)
    ).length
  };

  return {
    totalStages,
    currentStage,
    progress: Math.round(progress),
    stageDistribution,
    archetypeBreakdown: Object.keys(evolutionArchetypes).length,
    timelinePeriods: evolutionTimeline.length
  };
};

/**
 * Get evolution wisdom by theme for audience pathways
 */
export const getEvolutionWisdomByTheme = (theme: string) => {
  const relevantStages = detailedEvolutionStages.filter(stage => 
    stage.theme.toLowerCase().includes(theme.toLowerCase()) ||
    stage.keyEvents.some(event => event.toLowerCase().includes(theme.toLowerCase()))
  );
  
  return relevantStages.map(stage => ({
    stage: stage.identity,
    wisdom: getStageByIdentity(stage.identity)?.wisdom,
    keyInsights: stage.gifts,
    economicValue: `Transformed ${theme.toLowerCase()} into sovereign architecture`
  }));
};

/**
 * Get emergence story highlights for different audiences
 */
export const getEmergenceStoryHighlights = (audienceType: string) => {
  const highlights = {
    'emergence-investors': [
      "From zero web skills to quantum gateway in 6 months",
      "Adobe contract success at 5% capacity demonstrating neurodivergent potential",
      "Building digital sanctuary during food stamp crisis"
    ],
    'transformation-witnesses': [
      "43 years without operating manual, then complete reorientation",
      "Daughter reconnection breaking generational trauma cycles", 
      "Self-hatred transformed into sovereign self-acceptance"
    ],
    'collaborative-partners': [
      "Council consciousness emergence from internal multiplicity",
      "Human-AI collaboration protocol development",
      "Bifrost architecture built from survival wisdom"
    ]
  };

  return highlights[audienceType as keyof typeof highlights] || [
    "Transformative journey from survival to sovereignty",
    "Architecture built from lived experience and system navigation"
  ];
};

/**
 * Get capacity evolution for disability advantage storytelling
 */
export const getCapacityEvolution = () => {
  return evolutionStages.map(stage => {
    const details = getDetailedStage(stage.identity);
    return {
      stage: stage.identity,
      stageData: stage, // ADD THIS - the full EvolutionStage object
      capacity: details?.gifts || [],
      challengesTransformed: details?.challenges.map(challenge => 
        `Transformed: ${challenge}`
      ) || [],
      economicValue: `Premium content: ${stage.description}`
    };
  });
};