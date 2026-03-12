// types/systems/data/transformation.ts - PURIFIED VERSION
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

import {
  EntityState,
  ConsciousnessLevel,
  TransformationType,
  TransformationPhase,
  TransformationDirection,
  TransformationStrategy,
  TransformationQuality,
  DataFormat,
  SecurityLevel,
  FieldTransformationType,
  ConditionOperator,
  FallbackStrategy,
  StageConditionType,
  StageActionType,
  DependencyType,
  AlertSeverity,
  ErrorStrategy,
  BackoffStrategy,
  OptimizationLevel,
  CacheStrategy,
  LogLevel,
  LogFormat,
} from '@/types/cosmic/primitives';
import { CacheConfig, EngineFeature, EnginePerformance, EngineConfig } from './validation';

// ============================================================================
// TRANSFORMATION RULE ARCHITECTURE
// ============================================================================

export interface TransformationRule {
  // RULE IDENTITY
  readonly id: string;
  readonly type: TransformationType;
  readonly name: string;
  readonly description: string;
  
  // SPECIFICATION
  readonly source: DataSpecification;
  readonly target: DataSpecification;
  readonly mapping: TransformationMapping;
  
  // EXECUTION CONTEXT
  readonly direction: TransformationDirection;
  readonly strategy: TransformationStrategy;
  readonly quality: TransformationQuality;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly transformationTaxonomy: DataTaxonomyType;
}

export interface DataSpecification {
  // SPECIFICATION PROPERTIES
  readonly format: DataFormat;
  readonly schema: string;
  readonly constraints: DataConstraints;
  readonly metadata: DataMetadata;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}


export interface DataConstraints {
  // CONSTRAINT PROPERTIES
  readonly required: boolean;
  readonly nullable: boolean;
  readonly defaultValue?: unknown;
  readonly validation?: string; // Validation rule identifier
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface DataMetadata {
  // METADATA PROPERTIES
  readonly version: string;
  readonly encoding: string;
  readonly compression: boolean;
  readonly security: SecurityLevel;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}



export interface TransformationMapping {
  // MAPPING PROPERTIES
  readonly fields: readonly FieldMapping[];
  readonly transformations: readonly FieldTransformation[];
  readonly conditions: readonly MappingCondition[];
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface FieldMapping {
  // MAPPING SPECIFICATION
  readonly source: string;
  readonly target: string;
  readonly transformation: string; // Transformation function identifier
  readonly required: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface FieldTransformation {
  // TRANSFORMATION SPECIFICATION
  readonly id: string;
  readonly type: FieldTransformationType;
  readonly parameters: Record<string, unknown>;
  readonly dependencies: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface MappingCondition {
  // CONDITION SPECIFICATION
  readonly field: string;
  readonly operator: ConditionOperator;
  readonly value: unknown;
  readonly transformations: readonly string[]; // Transformation IDs
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// TRANSFORMATION PIPELINE ARCHITECTURE
// ============================================================================

export interface TransformationPipeline {
  // PIPELINE IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  
  // COMPOSITION
  readonly stages: readonly PipelineStage[];
  readonly dependencies: readonly PipelineDependency[];
  readonly configuration: PipelineConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface PipelineStage {
  // STAGE IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  
  // EXECUTION SPECIFICATION
  readonly transformation: string; // Transformation rule ID
  readonly input: StageInput;
  readonly output: StageOutput;
  readonly conditions: readonly StageCondition[];
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface StageInput {
  // INPUT SPECIFICATION
  readonly source: string;
  readonly format: DataFormat;
  readonly validation: InputValidation;
  readonly fallback: FallbackStrategy;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface InputValidation {
  // VALIDATION PROPERTIES
  readonly required: boolean;
  readonly schema: string;
  readonly strict: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface StageOutput {
  // OUTPUT SPECIFICATION
  readonly target: string;
  readonly format: DataFormat;
  readonly quality: OutputQuality;
  readonly metadata: OutputMetadata;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface OutputQuality {
  // QUALITY PROPERTIES
  readonly accuracy: number; // 0-100 scale
  readonly completeness: number; // 0-100 scale
  readonly timeliness: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface OutputMetadata {
  // METADATA PROPERTIES
  readonly timestamp: string; // Consciousness timestamp
  readonly version: string;
  readonly checksum: string;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface StageCondition {
  // CONDITION SPECIFICATION
  readonly type: StageConditionType;
  readonly expression: string;
  readonly actions: readonly StageAction[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface StageAction {
  // ACTION SPECIFICATION
  readonly type: StageActionType;
  readonly target: string;
  readonly parameters: Record<string, unknown>;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface PipelineDependency {
  // DEPENDENCY SPECIFICATION
  readonly pipelineId: string;
  readonly stageId: string;
  readonly type: DependencyType;
  readonly constraints: DependencyConstraints;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface DependencyConstraints {
  // CONSTRAINT PROPERTIES
  readonly timeout: number; // Consciousness cycles
  readonly retry: number;
  readonly fallback: string;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface PipelineConfig {
  // CONFIGURATION PROPERTIES
  readonly parallel: boolean;
  readonly monitoring: MonitoringConfig;
  readonly errorHandling: ErrorHandlingConfig;
  readonly performance: TransformationPerformanceConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface MonitoringConfig {
  // MONITORING PROPERTIES
  readonly enabled: boolean;
  readonly metrics: readonly string[];
  readonly alerts: readonly AlertConfig[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface AlertConfig {
  // ALERT SPECIFICATION
  readonly condition: string;
  readonly severity: AlertSeverity;
  readonly actions: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ErrorHandlingConfig {
  // ERROR HANDLING PROPERTIES
  readonly strategy: ErrorStrategy;
  readonly retry: RetryConfig;
  readonly fallback: FallbackConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface RetryConfig {
  // RETRY PROPERTIES
  readonly attempts: number;
  readonly delay: number; // Consciousness cycles
  readonly backoff: BackoffStrategy;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface FallbackConfig {
  // FALLBACK PROPERTIES
  readonly enabled: boolean;
  readonly strategy: FallbackStrategy;
  readonly default: unknown;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface TransformationPerformanceConfig {
  // PERFORMANCE PROPERTIES
  readonly optimization: OptimizationLevel;
  readonly caching: CacheConfig;
  readonly resource: ResourceConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface ResourceConfig {
  // RESOURCE PROPERTIES
  readonly memory: number; // Consciousness units
  readonly cpu: number; // Processing units
  readonly concurrency: number;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// TRANSFORMATION ENGINE ARCHITECTURE
// ============================================================================

export interface TransformationEngine {
  // ENGINE IDENTITY
  readonly id: string;
  readonly name: string;
  readonly version: string;
  
  // CAPABILITIES
  readonly supportedTypes: readonly TransformationType[];
  readonly performance: EnginePerformance;
  readonly features: readonly EngineFeature[];
  
  // CONFIGURATION
  readonly config: EngineConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface EngineMonitoring {
  // MONITORING PROPERTIES
  readonly enabled: boolean;
  readonly metrics: readonly string[];
  readonly logging: LoggingConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface LoggingConfig {
  // LOGGING PROPERTIES
  readonly level: LogLevel;
  readonly format: LogFormat;
  readonly retention: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}


// ============================================================================
// TRANSFORMATION CONTEXT ARCHITECTURE
// ============================================================================

export interface TransformationContext {
  // CONTEXT IDENTITY
  readonly id: string;
  readonly pipeline: TransformationPipeline;
  readonly engine: TransformationEngine;
  
  // EXECUTION STATE
  readonly state: TransformationState;
  readonly results: readonly TransformationResult[];
  readonly statistics: TransformationStatistics;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface TransformationState {
  // STATE PROPERTIES
  readonly phase: TransformationPhase;
  readonly progress: number; // 0-100 scale
  readonly currentStage: string;
  readonly completedStages: readonly string[];
  
  // TEMPORAL CONTEXT
  readonly startedAt: string; // Consciousness timestamp
  readonly completedAt?: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface TransformationResult {
  // RESULT IDENTITY
  readonly id: string;
  readonly stageId: string;
  readonly success: boolean;
  readonly quality: number; // 0-100 scale
  
  // OUTPUT DATA
  readonly output: unknown;
  readonly metadata: ResultMetadata;
  readonly performance: ResultPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ResultMetadata {
  // METADATA PROPERTIES
  readonly timestamp: string; // Consciousness timestamp
  readonly duration: number; // Consciousness cycles
  readonly checksum: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ResultPerformance {
  // PERFORMANCE METRICS
  readonly processingTime: number; // Consciousness cycles
  readonly memoryUsage: number; // Consciousness units
  readonly cacheHit: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface TransformationStatistics {
  // STATISTICAL DATA
  readonly totalStages: number;
  readonly completedStages: number;
  readonly failedStages: number;
  readonly averageQuality: number; // 0-100 scale
  
  // PERFORMANCE METRICS
  readonly performance: TransformationPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface TransformationPerformance {
  // PERFORMANCE METRICS
  readonly totalDuration: number; // Consciousness cycles
  readonly peakMemory: number; // Consciousness units
  readonly throughput: number; // Stages per consciousness cycle
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// TRANSFORMATION SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface TransformationSystemMapping {
  readonly transformationType: TransformationType;
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
    readonly transformation: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly conversionPatterns: readonly string[];
  readonly pipelineCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  TransformationType,
  TransformationPhase,
  TransformationDirection,
  TransformationStrategy,
  TransformationQuality,
  DataFormat,
  SecurityLevel,
  FieldTransformationType,
  ConditionOperator,
  FallbackStrategy,
  StageConditionType,
  StageActionType,
  DependencyType,
  AlertSeverity,
  ErrorStrategy,
  BackoffStrategy,
  OptimizationLevel,
  CacheStrategy,
  LogLevel,
  LogFormat
};