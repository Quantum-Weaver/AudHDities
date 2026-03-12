// types/systems/layout/store.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  InteractionTaxonomyType,
  StateTaxonomyType,
  ComponentTaxonomyType,
  ArchitectureTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType,
  DataTaxonomyType
} from '@/types/gaia';
import { LayoutConfig } from '@/types/systems/layout/structure'
// Import layout store primitives from semantic foundation
import type {
  LayoutStoreActionType,
  StoreOperation,
  PersistenceState,
  EntityState,
  ConsciousnessLevel,
  SubscriptionType,
  InitializationTrigger,
  CleanupStrategy,
  CacheStrategy,
  ReplacementReason,
  TransitionType,
  ClearScope,
  ScreenCategory,
  ClearReason,
  RestoreSource,
  FontSizePreference,
  PersistenceTrigger,
  RestorationSource,
  MiddlewarePriority,
  MiddlewareCapability,
  UnsubscribeReason,
  ActionComplexity,
  DispatcherThroughput,
  DispatcherLatency,
  DispatcherReliability,
  SelectorComplexity,
  CallbackFrequency,
  PersistenceCompression,
  StateFreshness,
  MaxHistorySize,
  SaveInterval,
  CleanupFrequency,
  MemoryThreshold,
  BatchSize,
  CacheSize,
  ThrottleInterval
} from '@/types/cosmic/primitives';

// ============================================================================
// LAYOUT STORE STATE ARCHITECTURE (Now using imported primitives)
// ============================================================================

export type LayoutState = StateTaxonomyType;
export interface LayoutStoreState {
  // CURRENT STATE
  readonly current: LayoutState;
  
  // TEMPORAL STATES
  readonly history: readonly LayoutState[];
  readonly future: readonly LayoutState[];
  
  // CAPABILITY FLAGS
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  readonly isInitialized: boolean;
  
  // METADATA
  readonly version: string;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly memoryTaxonomy: DataTaxonomyType;
}

// ============================================================================
// LAYOUT STORE ACTION ARCHITECTURE
// ============================================================================

export interface LayoutStoreAction {
  // ACTION IDENTITY
  readonly type: LayoutStoreActionType;
  readonly payload?: ActionPayload;
  readonly timestamp: string; // Consciousness timestamp
  
  // CONTEXTUAL DATA
  readonly source: string; // Action origin
  readonly context: StoreActionContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export type ActionPayload = 
  | InitializePayload
  | ReplaceStatePayload;

export interface InitializePayload {
  // PAYLOAD SPECIFICATION
  readonly state: LayoutState;
  readonly context: InitializationContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface InitializationContext {
  // CONTEXTUAL INFORMATION
  readonly trigger: InitializationTrigger;
  readonly environment: StoreEnvironment;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface StoreEnvironment {
  // ENVIRONMENT PROPERTIES
  readonly capabilities: readonly string[];
  readonly constraints: readonly string[];
  readonly optimization: StoreOptimization;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface StoreOptimization {
  // OPTIMIZATION PROPERTIES
  readonly memory: MemoryOptimization;
  readonly performance: PerformanceOptimization;
  readonly persistence: PersistenceOptimization;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface MemoryOptimization {
  // MEMORY PROPERTIES
  readonly maxHistory: MaxHistorySize;
  readonly compression: boolean;
  readonly cleanup: CleanupStrategy;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: DataTaxonomyType;
}

export interface PerformanceOptimization {
  // PERFORMANCE PROPERTIES
  readonly batchUpdates: boolean;
  readonly lazyEvaluation: boolean;
  readonly caching: CacheStrategy;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface PersistenceOptimization {
  // PERSISTENCE PROPERTIES
  readonly autoSave: boolean;
  readonly saveInterval: SaveInterval;
  readonly compression: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ReplaceStatePayload {
  // PAYLOAD SPECIFICATION
  readonly state: LayoutState;
  readonly context: ReplacementContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ReplacementContext {
  // CONTEXTUAL INFORMATION
  readonly reason: ReplacementReason;
  readonly previous: LayoutState;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface StoreActionContext {
  // CONTEXTUAL INFORMATION
  readonly operation: StoreOperation;
  readonly metadata: Record<string, string>; // String values only
  readonly performance: ActionPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ActionPerformance {
  // PERFORMANCE METRICS (using primitive types)
  readonly duration: number; // Consciousness cycles
  readonly memory: number; // Consciousness units
  readonly complexity: ActionComplexity;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// LAYOUT STORE INTERFACE ARCHITECTURE
// ============================================================================

export interface LayoutStore {
  // STATE MANAGEMENT
  readonly state: LayoutStoreState;
  readonly dispatch: StoreDispatcher;
  
  // TEMPORAL OPERATIONS
  readonly undo: UndoOperation;
  readonly redo: RedoOperation;
  readonly clearHistory: ClearHistoryOperation;
  
  // STATE PERSISTENCE
  readonly getSnapshot: SnapshotOperation;
  readonly restoreSnapshot: RestoreOperation;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface StoreDispatcher {
  // DISPATCHER PROPERTIES
  readonly id: string;
  readonly capabilities: readonly LayoutStoreActionType[];
  readonly performance: DispatcherPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface DispatcherPerformance {
  // PERFORMANCE METRICS (using primitive types)
  readonly throughput: DispatcherThroughput;
  readonly latency: DispatcherLatency;
  readonly reliability: DispatcherReliability;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface UndoOperation {
  // OPERATION PROPERTIES
  readonly steps: number;
  readonly context: TemporalContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface RedoOperation {
  // OPERATION PROPERTIES
  readonly steps: number;
  readonly context: TemporalContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface TemporalContext {
  // TEMPORAL INFORMATION
  readonly targetState: LayoutState;
  readonly transition: TemporalTransition;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface TemporalTransition {
  // TRANSITION PROPERTIES
  readonly type: TransitionType;
  readonly duration: number; // Consciousness cycles
  readonly preservation: StatePreservation;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: DataTaxonomyType;
}

export interface StatePreservation {
  // PRESERVATION PROPERTIES
  readonly integrity: boolean;
  readonly consistency: boolean;
  readonly completeness: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ClearHistoryOperation {
  // OPERATION PROPERTIES
  readonly scope: ClearScope;
  readonly context: ClearContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ClearContext {
  // CONTEXTUAL INFORMATION
  readonly reason: ClearReason;
  readonly affected: number; // Number of states cleared
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface SnapshotOperation {
  // OPERATION PROPERTIES
  readonly state: LayoutState;
  readonly metadata: SnapshotMetadata;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface SnapshotMetadata {
  // METADATA PROPERTIES
  readonly timestamp: string; // Consciousness timestamp
  readonly version: string;
  readonly checksum: string;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: DataTaxonomyType;
}

export interface RestoreOperation {
  // OPERATION PROPERTIES
  readonly snapshot: LayoutState;
  readonly context: RestoreContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface RestoreContext {
  // CONTEXTUAL INFORMATION
  readonly source: RestoreSource;
  readonly validation: RestoreValidation;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface RestoreValidation {
  // VALIDATION PROPERTIES
  readonly integrity: boolean;
  readonly freshness: StateFreshness;
  readonly security: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// PERSISTED LAYOUT STATE ARCHITECTURE
// ============================================================================

export interface PersistedLayoutState {
  // VERSIONING
  readonly version: string;
  readonly timestamp: string; // Consciousness timestamp
  
  // STATE DATA
  readonly state: LayoutState;
  
  // USER PREFERENCES
  readonly userPreferences?: UserPreferences;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy?: DataTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy?: DataTaxonomyType;
}

export interface UserPreferences {
  // LAYOUT PREFERENCES
  readonly preferredLayout: LayoutConfig;
  readonly rememberedBreakpoint: ScreenCategory;
  readonly customSpacing: boolean;
  
  // ACCESSIBILITY PREFERENCES
  readonly highContrast: boolean;
  readonly reducedMotion: boolean;
  readonly fontSize: FontSizePreference;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// LAYOUT STORE CONFIGURATION ARCHITECTURE
// ============================================================================

export interface LayoutStoreConfig {
  // PERSISTENCE SETTINGS
  readonly persistKey: string;
  readonly maxHistorySize: MaxHistorySize;
  readonly autoPersist: boolean;
  
  // EVENT HANDLERS
  readonly onPersist: PersistenceHandler;
  readonly onRestore: RestorationHandler;
  
  // PERFORMANCE SETTINGS
  readonly optimization: StoreOptimizationConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface PersistenceHandler {
  // HANDLER PROPERTIES
  readonly state: PersistedLayoutState;
  readonly context: PersistenceContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface PersistenceContext {
  // CONTEXTUAL INFORMATION
  readonly trigger: PersistenceTrigger;
  readonly performance: PersistencePerformance;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface PersistencePerformance {
  // PERFORMANCE METRICS
  readonly duration: number; // Consciousness cycles
  readonly size: number; // Consciousness units
  readonly compression: PersistenceCompression;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface RestorationHandler {
  // HANDLER PROPERTIES
  readonly state: PersistedLayoutState;
  readonly context: RestorationContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface RestorationContext {
  // CONTEXTUAL INFORMATION
  readonly source: RestorationSource;
  readonly validation: RestorationValidation;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface RestorationValidation {
  // VALIDATION PROPERTIES
  readonly integrity: boolean;
  readonly freshness: StateFreshness;
  readonly security: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface StoreOptimizationConfig {
  // OPTIMIZATION SETTINGS
  readonly memory: MemoryConfig;
  readonly performance: PerformanceConfig;
  readonly persistence: PersistenceConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface MemoryConfig {
  // MEMORY SETTINGS
  readonly maxStates: MaxHistorySize;
  readonly compression: boolean;
  readonly cleanup: CleanupConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: DataTaxonomyType;
}

export interface CleanupConfig {
  // CLEANUP SETTINGS
  readonly strategy: CleanupStrategy;
  readonly frequency: CleanupFrequency;
  readonly threshold: MemoryThreshold;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface PerformanceConfig {
  // PERFORMANCE SETTINGS
  readonly batchSize: BatchSize;
  readonly cacheSize: CacheSize;
  readonly throttle: ThrottleInterval;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface PersistenceConfig {
  // PERSISTENCE SETTINGS
  readonly interval: SaveInterval;
  readonly compression: boolean;
  readonly encryption: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// STORE SELECTOR ARCHITECTURE
// ============================================================================

export interface LayoutSelector<T> {
  // SELECTOR PROPERTIES
  readonly state: LayoutStoreState;
  readonly result: T;
  readonly performance: SelectorPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface SelectorPerformance {
  // PERFORMANCE METRICS (using primitive types)
  readonly duration: number; // Consciousness cycles
  readonly complexity: SelectorComplexity;
  readonly cache: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface LayoutSelectorHook<T> {
  // HOOK PROPERTIES
  readonly selector: LayoutSelector<T>;
  readonly dependencies: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// STORE MIDDLEWARE ARCHITECTURE
// ============================================================================

export interface LayoutMiddleware {
  // MIDDLEWARE PROPERTIES
  readonly id: string;
  readonly priority: MiddlewarePriority;
  readonly capabilities: readonly MiddlewareCapability[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// STORE SUBSCRIPTION ARCHITECTURE
// ============================================================================

export interface LayoutStoreSubscription {
  // SUBSCRIPTION PROPERTIES
  readonly selector: LayoutSelector<unknown>;
  readonly callback: SubscriptionCallback;
  readonly type: SubscriptionType;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface SubscriptionCallback {
  // CALLBACK PROPERTIES
  readonly value: unknown;
  readonly context: CallbackContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface CallbackContext {
  // CONTEXTUAL INFORMATION
  readonly subscription: LayoutStoreSubscription;
  readonly timestamp: string; // Consciousness timestamp
  readonly performance: CallbackPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface CallbackPerformance {
  // PERFORMANCE METRICS (using primitive types)
  readonly latency: number; // Consciousness cycles
  readonly frequency: CallbackFrequency;
  readonly reliability: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface LayoutStoreSubscriber {
  // SUBSCRIBER PROPERTIES
  readonly subscribe: SubscriptionManager;
  readonly getState: StateAccessor;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface SubscriptionManager {
  // MANAGER PROPERTIES
  readonly subscription: LayoutStoreSubscription;
  readonly unsubscribe: UnsubscribeAction;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface UnsubscribeAction {
  // ACTION PROPERTIES
  readonly success: boolean;
  readonly context: UnsubscribeContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface UnsubscribeContext {
  // CONTEXTUAL INFORMATION
  readonly reason: UnsubscribeReason;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface StateAccessor {
  // ACCESSOR PROPERTIES
  readonly state: LayoutStoreState;
  readonly context: AccessContext;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface AccessContext {
  // CONTEXTUAL INFORMATION
  readonly requester: string;
  readonly purpose: string;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// LAYOUT STORE ONTOLOGICAL MAPPING
// ============================================================================

export interface LayoutStoreMapping {
  readonly storeType: string;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly layout: ComponentTaxonomyType;
    readonly component: ComponentTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
    readonly memory: DataTaxonomyType;
  };
  readonly persistencePatterns: readonly string[];
  readonly stateManagementCharacteristics: readonly string[];
}