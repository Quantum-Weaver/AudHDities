// types/systems/data/validation.ts - PURIFIED VERSION
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
  ValidationRuleType,
  ValidationSeverity,
  ValidationStatus,
  ValidationTrigger,
  ValidationScope,
  ExecutionOrder,
  ConditionType,
  ConditionOperator,
  ResolutionStrategy,
  CacheStrategy
} from '@/types/cosmic/primitives';

import { UserPreferences } from '@/types/systems/layout/store'

// ============================================================================
// VALIDATION RULE ARCHITECTURE
// ============================================================================

export interface ValidationRule {
  // RULE IDENTITY
  readonly id: string;
  readonly type: ValidationRuleType;
  readonly name: string;
  readonly description: string;
  
  // CONSTRAINT SPECIFICATION
  readonly constraints: ValidationConstraints;
  readonly severity: ValidationSeverity;
  readonly message: string;
  
  // EXECUTION CONTEXT
  readonly trigger: ValidationTrigger;
  readonly scope: ValidationScope;
  readonly dependencies: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly validationTaxonomy: DataTaxonomyType;
}

export interface ValidationConstraints {
  // CONSTRAINT PROPERTIES
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string; // Regex pattern as string
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly allowedValues?: readonly string[];
  readonly custom?: string; // Custom validation identifier
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// VALIDATION RESULT ARCHITECTURE
// ============================================================================

export interface ValidationResult {
  // RESULT IDENTITY
  readonly id: string;
  readonly ruleId: string;
  readonly status: ValidationStatus;
  readonly severity: ValidationSeverity;
  
  // EVALUATION DATA
  readonly isValid: boolean;
  readonly message: string;
  readonly details: ValidationDetails;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  readonly duration: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface ValidationDetails {
  // DETAILED INFORMATION
  readonly field: string;
  readonly value: unknown;
  readonly expected?: unknown;
  readonly actual?: unknown;
  readonly context: ValidationContext;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ValidationContext {
  // CONTEXTUAL INFORMATION
  readonly environment: ValidationEnvironment;
  readonly constraints: ValidationConstraints;
  readonly metadata: Record<string, string>; // String values only
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ValidationEnvironment {
  // ENVIRONMENT PROPERTIES
  readonly platform: string;
  readonly version: string;
  readonly capabilities: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// VALIDATION SCHEMA ARCHITECTURE
// ============================================================================

export interface ValidationSchema {
  // SCHEMA IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  
  // RULE DEFINITIONS
  readonly rules: readonly ValidationRule[];
  readonly ruleGroups: readonly ValidationRuleGroup[];
  
  // DEPENDENCY MANAGEMENT
  readonly dependencies: readonly SchemaDependency[];
  readonly conflicts: readonly SchemaConflict[];
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ValidationRuleGroup {
  // GROUP IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  
  // GROUP COMPOSITION
  readonly rules: readonly string[]; // Rule IDs
  readonly execution: GroupExecution;
  readonly conditions: readonly GroupCondition[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface GroupExecution {
  // EXECUTION PROPERTIES
  readonly order: ExecutionOrder;
  readonly stopOnFailure: boolean;
  readonly parallel: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface GroupCondition {
  // CONDITION SPECIFICATION
  readonly type: ConditionType;
  readonly field: string;
  readonly operator: ConditionOperator;
  readonly value: unknown;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface SchemaDependency {
  // DEPENDENCY SPECIFICATION
  readonly schemaId: string;
  readonly version: string;
  readonly required: boolean;
  readonly context: DependencyContext;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface DependencyContext {
  // CONTEXTUAL INFORMATION
  readonly purpose: string;
  readonly constraints: readonly string[];
  readonly alternatives: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface SchemaConflict {
  // CONFLICT SPECIFICATION
  readonly schemaId: string;
  readonly ruleIds: readonly string[];
  readonly description: string;
  readonly resolution: ConflictResolution;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ConflictResolution {
  // RESOLUTION PROPERTIES
  readonly strategy: ResolutionStrategy;
  readonly priority: number; // 1-10 scale
  readonly automatic: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// VALIDATION ENGINE ARCHITECTURE
// ============================================================================

export interface ValidationEngine {
  // ENGINE IDENTITY
  readonly id: string;
  readonly name: string;
  readonly version: string;
  
  // CAPABILITIES
  readonly supportedTypes: readonly ValidationRuleType[];
  readonly performance: EnginePerformance;
  readonly features: readonly EngineFeature[];
  
  // CONFIGURATION
  readonly config: EngineConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface EnginePerformance {
  // PERFORMANCE METRICS
  readonly throughput: number; // Validations per consciousness cycle
  readonly latency: number; // Consciousness cycles
  readonly accuracy: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface EngineFeature {
  // FEATURE SPECIFICATION
  readonly name: string;
  readonly description: string;
  readonly enabled: boolean;
  readonly configuration: FeatureConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: string; // Will be specific component taxonomy
}

export interface FeatureConfig {
  // CONFIGURATION PROPERTIES
  readonly parameters: Record<string, unknown>;
  readonly constraints: readonly string[];
  readonly dependencies: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface EngineConfig {
  // CONFIGURATION SETTINGS
  readonly defaultSeverity: ValidationSeverity;
  readonly stopOnCritical: boolean;
  readonly parallelProcessing: boolean;
  readonly caching: ValidationCache;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ValidationCache {
  // CACHE PROPERTIES
  readonly enabled: boolean;
  readonly size: number;
  readonly ttl: number; // Consciousness cycles
  readonly strategy: CacheStrategy;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: string; // Will be specific memory taxonomy
}

// ============================================================================
// VALIDATION CONTEXT ARCHITECTURE
// ============================================================================

export interface ValidationContext {
  // CONTEXT IDENTITY
  readonly id: string;
  readonly schema: ValidationSchema;
  readonly engine: ValidationEngine;
  
  // EXECUTION STATE
  readonly state: ValidationState;
  readonly results: readonly ValidationResult[];
  readonly statistics: ValidationStatistics;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ValidationState {
  // STATE PROPERTIES
  readonly status: ValidationStatus;
  readonly progress: number; // 0-100 scale
  readonly activeRules: readonly string[];
  readonly completedRules: readonly string[];
  
  // TEMPORAL CONTEXT
  readonly startedAt: string; // Consciousness timestamp
  readonly completedAt?: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ValidationStatistics {
  // STATISTICAL DATA
  readonly totalRules: number;
  readonly passedRules: number;
  readonly failedRules: number;
  readonly warningRules: number;
  readonly averageDuration: number; // Consciousness cycles
  
  // PERFORMANCE METRICS
  readonly performance: ValidationPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ValidationPerformance {
  // PERFORMANCE METRICS
  readonly totalDuration: number; // Consciousness cycles
  readonly peakMemory: number; // Consciousness units
  readonly cacheHitRate: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// VALIDATION ERROR ARCHITECTURE
// ============================================================================

export interface ValidationError {
  // ERROR IDENTITY
  readonly id: string;
  readonly code: string;
  readonly message: string;
  readonly severity: ValidationSeverity;
  
  // ERROR CONTEXT
  readonly ruleId: string;
  readonly field: string;
  readonly value: unknown;
  readonly context: ErrorContext;
  
  // RECOVERY INFORMATION
  readonly recoverable: boolean;
  readonly suggestions: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface ErrorContext {
  // CONTEXTUAL INFORMATION
  readonly environment: ValidationEnvironment;
  readonly stackTrace: readonly string[];
  readonly userContext: Record<string, string>; // String values only
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// VALIDATION CONFIGURATION ARCHITECTURE
// ============================================================================

export interface ValidationConfiguration {
  // GLOBAL SETTINGS
  readonly defaultEngine: string;
  readonly defaultSchema: string;
  readonly strictMode: boolean;
  
  // PERFORMANCE SETTINGS
  readonly performance: ValidationPerformanceConfig;
  readonly caching: CacheConfig;
  
  // USER PREFERENCES
  readonly preferences: UserPreferences;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ValidationPerformanceConfig {
  // PERFORMANCE SETTINGS
  readonly parallelThreshold: number;
  readonly batchSize: number;
  readonly timeout: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface CacheConfig {
  // CACHE SETTINGS
  readonly enabled: boolean;
  readonly maxSize: number;
  readonly defaultTTL: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: string; // Will be specific memory taxonomy
}

// ============================================================================
// VALIDATION SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface ValidationSystemMapping {
  readonly validationType: ValidationRuleType;
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
    readonly validation: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly integrityPatterns: readonly string[];
  readonly constraintCharacteristics: readonly string[];
}
