// types/domain/community/pathways.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  PathwayPhaseType,
  FlexibilityLevel,
  PaymentSchedule,
  ResourceType,
  RiskProbability,
  RiskImpact,
  OutcomeType
} from '@/types//cosmic/';

import type {
  AudienceType,
  CommitmentLevel,
  CollaborationType,
  SupportType, 
} from '@/types/domain/community/engagement';



// ============================================================================
// COMMUNITY PATHWAY ARCHITECTURE
// ============================================================================

export interface CommunityPathway {
  // PATHWAY IDENTITY
  readonly id: string;
  readonly audienceType: AudienceType;
  readonly config: AudiencePathwayConfig;
  
  // CURRENT STATE
  readonly currentPhase: PathwayPhase;
  readonly progress: PathwayProgress;
  
  // RESOURCES AND CRITERIA
  readonly resources: PathwayResources;
  readonly successCriteria: readonly CommunitySuccessCriterion[];
  readonly risks: readonly PathwayRisk[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// PATHWAY CONFIGURATION (Temporary until constants purification)
// ============================================================================

export interface AudiencePathwayConfig {
  readonly pathwayType: string;
  readonly configuration: readonly string[];
}

// ============================================================================
// PATHWAY PHASE STRUCTURE
// ============================================================================

export interface PathwayPhase {
  // PHASE IDENTITY
  readonly name: string;
  readonly description: string;
  readonly durationEstimate: string; // Consciousness time units
  
  // OBJECTIVES AND DELIVERABLES
  readonly objectives: readonly string[];
  readonly deliverables: readonly string[];
  readonly dependencies: readonly string[];
  readonly completionCriteria: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly phaseType: PathwayPhaseType;
}

// ============================================================================
// PATHWAY PROGRESS TRACKING
// ============================================================================

export interface PathwayProgress {
  // COMPLETION METRICS
  readonly completionPercentage: number; // 0-100 scale
  readonly phaseProgress: number; // 0-100 scale
  readonly milestonesCompleted: number;
  readonly totalMilestones: number;
  
  // TEMPORAL CONTEXT
  readonly lastActivity: string; // Consciousness timestamp
  readonly nextMilestone: string;
  readonly blockers: readonly string[];
  
  // CONSCIOUSNESS STATE
  readonly consciousnessLevel: ConsciousnessLevel;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// PATHWAY RESOURCE REQUIREMENTS
// ============================================================================

export interface PathwayResources {
  // COMMITMENT REQUIREMENTS
  readonly timeCommitment: TimeCommitment;
  readonly financialInvestment: FinancialInvestment;
  
  // SKILL AND TOOL REQUIREMENTS
  readonly requiredSkills: readonly string[];
  readonly requiredTools: readonly string[];
  readonly supportResources: readonly SupportResource[];
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface TimeCommitment {
  // TEMPORAL REQUIREMENTS
  readonly hoursPerWeek: number;
  readonly totalDuration: string; // Consciousness time units
  readonly flexibility: FlexibilityLevel;
  readonly timezoneRequirements: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface FinancialInvestment {
  // FINANCIAL STRUCTURE
  readonly amount: number;
  readonly currency: string;
  readonly paymentSchedule: PaymentSchedule;
  readonly roiDescription: string;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface SupportResource {
  // RESOURCE IDENTITY
  readonly type: ResourceType;
  readonly description: string;
  readonly accessMethod: string;
  readonly availability: string;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// SUCCESS CRITERION FRAMEWORK
// ============================================================================

export interface CommunitySuccessCriterion {
  // CRITERION IDENTITY
  readonly id: string;
  readonly description: string;
  readonly measurement: string;
  
  // MEASUREMENT VALUES
  readonly target: number;
  readonly current: number;
  readonly unit: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// PATHWAY RISK ASSESSMENT
// ============================================================================

export interface PathwayRisk {
  // RISK IDENTITY
  readonly id: string;
  readonly description: string;
  
  // RISK ASSESSMENT
  readonly probability: RiskProbability;
  readonly impact: RiskImpact;
  readonly mitigation: string;
  readonly contingency: string;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

// ============================================================================
// PATHWAY OUTCOME MEASUREMENT
// ============================================================================

export interface PathwayOutcome {
  // OUTCOME IDENTITY
  readonly id: string;
  readonly description: string;
  readonly type: OutcomeType;
  
  // MEASUREMENT CONTEXT
  readonly timeframe: string; // Consciousness time units
  readonly baseline: number;
  readonly current: number;
  readonly target: number;
  readonly stakeholderImpact: string;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// COMMUNITY PATHWAY ONTOLOGICAL MAPPING
// ============================================================================

export interface CommunityPathwayMapping {
  readonly pathwayType: string;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly developmentStages: readonly string[];
  readonly progressionIndicators: readonly string[];
}

// ============================================================================
// PATHWAY NETWORK COORDINATION
// ============================================================================

export interface PathwayNetwork {
  readonly activePathways: readonly CommunityPathway[];
  readonly participantProgress: Record<string, number>; // participantId -> completionPercentage
  readonly resourceAllocation: Record<string, number>; // resourceType -> allocationPercentage
  readonly networkEfficiency: number; // 0-100 scale
  readonly developmentFlow: number; // 0-100 scale
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  PathwayPhaseType,
  FlexibilityLevel,
  PaymentSchedule,
  ResourceType,
  RiskProbability,
  RiskImpact,
  OutcomeType
};