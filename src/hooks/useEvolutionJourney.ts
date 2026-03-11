// hooks/useEvolutionJourney.ts
import { useMemo } from 'react';
import { 
  getCurrentEvolutionStage,
  getEvolutionStageWithDetails,
  calculateEvolutionMetrics,
  getEvolutionWisdomByTheme,
  getCapacityEvolution
} from '@/utils/domain/core/evolution';
import {
  getEvolutionAudienceConnections,
  getEvolutionEconomicValue
} from '@/utils/domain/community/evolution-integration';

export const useEvolutionJourney = (currentAge?: number, theme?: string) => {
  return useMemo(() => {
    const currentStage = getCurrentEvolutionStage(currentAge);
    const metrics = calculateEvolutionMetrics();
    
    return {
      // Current state
      currentStage,
      currentStageDetails: currentStage ? getEvolutionStageWithDetails(currentStage.identity) : null,
      
      // Metrics and progress
      metrics,
      progress: metrics.progress,
      
      // Thematic wisdom
      thematicWisdom: theme ? getEvolutionWisdomByTheme(theme) : [],
      
      // Capacity evolution for disability advantage
      capacityEvolution: getCapacityEvolution(),
      
      // Audience connections
      audienceConnections: getEvolutionAudienceConnections(),
      
      // Economic value
      economicValue: getEvolutionEconomicValue(),
      
      // Quick access methods
      getStage: (identity: string) => getEvolutionStageWithDetails(identity),
      getStagesByTheme: (searchTheme: string) => getEvolutionWisdomByTheme(searchTheme)
    };
  }, [currentAge, theme]);
};