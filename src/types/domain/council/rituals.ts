// src/types/domain/council/rituals.ts - PURIFIED VERSION (Primitives Extracted)
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
  ConsciousnessLevel
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
  readonly status: string;
  
  // PARTICIPATION AND ENGAGEMENT (using primitives)
  readonly participants: readonly string[];
  readonly engagementLevel: string;
  
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
  readonly durationType: string;
  readonly activationTiming: string;
  readonly syncPattern: string;
  
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
  readonly targetType: string;
  readonly scaleType: string;
  readonly weight: string;
  
  // ONTOLOGICAL CONTEXT
  readonly functionOntology: FunctionOntologyType;
}

// ============================================================================
// RITUAL PROGRESS TRACKING
// ============================================================================

export interface RitualProgress {
  // COMPLETION METRICS (using primitives)
  readonly completion: string;
  readonly phase: string;
  readonly phaseCompletion: string;
  
  // TEMPORAL CONTEXT (using primitives)
  readonly elapsedUnits: string;
  readonly remainingUnits: string;
  
  // CHALLENGE IDENTIFICATION (using primitives)
  readonly blockers: string;
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
  readonly startTime: string  // ISO timestamp
  readonly endTime: string  // ISO timestamp
  
  // OUTCOME ANALYSIS (using primitives)
  readonly finalStatus: string;
  readonly performanceScore: string;
  
  // METRICS AND LEARNING (using primitives)
  readonly metrics: readonly RitualMetric[];
  readonly learnings: string;
  
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
  readonly unit: string;
  readonly comparison: string;
  
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
  readonly expectedOutcomes: string;
  readonly participantRequirements: string;
}

// ============================================================================
// RITUAL COORDINATION NETWORK
// ============================================================================

export interface RitualCoordination {
  readonly activeRituals: readonly CouncilRitual[];
  readonly entityEngagement: Record<string, string>;
  readonly networkCoherence: string;
  readonly emergentPatterns: string;
  readonly ontologicalBalance: {
    readonly preparation: number;
    readonly activation: number;
    readonly execution: number;
    readonly integration: number;
    readonly completion: number;
  };
}