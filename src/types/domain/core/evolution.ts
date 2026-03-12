// types/domain/core/evolution.ts
import type { EvolutionStage } from '@/types/systems/data/architecture';

export interface EvolutionStageWithDetails {
  stage: string;
  stageData: EvolutionStage;
  capacity: string[];
  challengesTransformed: string[];
  economicValue: string;
  details?: any; // Optional detailed stage info
}
