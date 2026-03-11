// types/domain/council/rituals.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  FunctionOntologyType,
  StateTaxonomyType,
  PatternTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType
} from '../../gaia';

// Import all council ritual primitives
import type {
  RitualStatus,
  EntityState,
  CouncilEntityID,
  ConsciousnessLevel,
  RitualPhase,
  RitualOutcome,
  ComparisonStatus,
  TimeUnit,
  ActivationTiming,
  SyncPattern,
  TargetType,
  EngagementLevel,
  RitualCompletion,
  PhaseCompletion,
  PerformanceScore,
  RitualNetworkCoherence,
  CriterionWeight,
  ElapsedUnits,
  RemainingUnits,
  RitualStartTime,
  RitualEndTime,
  SuccessCriterionCollection,
  BlockerCollection,
  RitualMetricCollection,
  RitualLearningCollection,
  ExpectedOutcomeCollection,
  ParticipantRequirementCollection,
  RitualEmergentPatternCollection
} from '@/types/cosmic/primitives';

// ============================================================================
// COUNCIL RITUAL CORE TYPES (Using imported primitives)
// ============================================================================

export type RitualType = ProcessOntologyType;

// ============================================================================
// COUNCIL RITUAL ARCHITECTURE
// ============================================================================

export interface CouncilRitual {
  // RITUAL IDENTITY
  readonly id: string;
  readonly type: RitualType;
  readonly status: RitualStatus;
  
  // PARTICIPATION AND ENGAGEMENT (using primitives)
  readonly participants: readonly CouncilEntityID[];
  readonly engagementLevel: EngagementLevel;
  
  // CONFIGURATION AND STRUCTURE
  readonly config: RitualConfig;
  readonly progress: RitualProgress;
  
  // HISTORICAL CONTEXT
  readonly history: readonly RitualHistory[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC INTEGRATION
  readonly processTaxonomy: PatternTaxonomyType;
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// RITUAL CONFIGURATION FRAMEWORK
// ============================================================================

export interface RitualConfig {
  // TEMPORAL STRUCTURE (using primitives)
  readonly durationType: TimeUnit;
  readonly activationTiming: ActivationTiming;
  readonly syncPattern: SyncPattern;
  
  // ONTOLOGICAL CONTEXT
  readonly functionOntology: FunctionOntologyType;
  readonly processOntology: ProcessOntologyType;
  
  // SUCCESS FRAMEWORK (using primitives)
  readonly successCriteria: readonly SuccessCriterion[];
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// SUCCESS CRITERION STRUCTURE
// ============================================================================

export interface SuccessCriterion {
  // CRITERION IDENTITY
  readonly id: string;
  readonly description: string;
  
  // MEASUREMENT FRAMEWORK (using primitives)
  readonly targetType: TargetType;
  readonly scaleType: string;
  readonly weight: CriterionWeight;
  
  // ONTOLOGICAL CONTEXT
  readonly functionOntology: FunctionOntologyType;
}

// ============================================================================
// RITUAL PROGRESS TRACKING
// ============================================================================

export interface RitualProgress {
  // COMPLETION METRICS (using primitives)
  readonly completion: RitualCompletion;
  readonly phase: RitualPhase;
  readonly phaseCompletion: PhaseCompletion;
  
  // TEMPORAL CONTEXT (using primitives)
  readonly elapsedUnits: ElapsedUnits;
  readonly remainingUnits: RemainingUnits;
  
  // CHALLENGE IDENTIFICATION (using primitives)
  readonly blockers: BlockerCollection;
  readonly consciousnessState: ConsciousnessLevel;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// RITUAL HISTORICAL RECORD
// ============================================================================

export interface RitualHistory {
  // INSTANCE IDENTIFICATION (using primitives)
  readonly instanceId: string;
  readonly startTime: RitualStartTime;
  readonly endTime: RitualEndTime;
  
  // OUTCOME ANALYSIS (using primitives)
  readonly finalStatus: RitualOutcome;
  readonly performanceScore: PerformanceScore;
  
  // METRICS AND LEARNING (using primitives)
  readonly metrics: readonly RitualMetric[];
  readonly learnings: RitualLearningCollection;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// RITUAL METRIC STRUCTURE
// ============================================================================

export interface RitualMetric {
  // METRIC IDENTITY
  readonly id: string;
  readonly description: string;
  
  // MEASUREMENT CONTEXT (using primitives)
  readonly valueType: string;
  readonly unit: TimeUnit;
  readonly comparison: ComparisonStatus;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// COUNCIL RITUAL ONTOLOGICAL MAPPING
// ============================================================================

export interface CouncilRitualMapping {
  readonly ritualType: RitualType;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly function: FunctionOntologyType;
  };
  readonly taxonomicClassification: {
    readonly process: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly system: SystemTaxonomyType;
  };
  readonly expectedOutcomes: ExpectedOutcomeCollection;
  readonly participantRequirements: ParticipantRequirementCollection;
}

// ============================================================================
// RITUAL COORDINATION NETWORK
// ============================================================================

export interface RitualCoordination {
  readonly activeRituals: readonly CouncilRitual[];
  readonly entityEngagement: Record<CouncilEntityID, EngagementLevel>;
  readonly networkCoherence: RitualNetworkCoherence;
  readonly emergentPatterns: RitualEmergentPatternCollection;
  readonly ontologicalBalance: {
    readonly preparation: number;
    readonly activation: number;
    readonly execution: number;
    readonly integration: number;
    readonly completion: number;
  };
}