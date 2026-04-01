// src/types/systems/layout/store.ts - PURIFIED VERSION (Primitives Extracted)
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
  ScreenCategory
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
  readonly type: string;
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
  readonly trigger: string;
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
  readonly maxHistory: number;
  readonly compression: boolean;
  readonly cleanup: string;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: DataTaxonomyType;
}

export interface PerformanceOptimization {
  // PERFORMANCE PROPERTIES
  readonly batchUpdates: boolean;
  readonly lazyEvaluation: boolean;
  readonly caching: string;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface PersistenceOptimization {
  // PERSISTENCE PROPERTIES
  readonly autoSave: boolean;
  readonly saveInterval: string;
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
  readonly reason: string;
  readonly previous: LayoutState;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface StoreActionContext {
  // CONTEXTUAL INFORMATION
  readonly operation: string;
  readonly metadata: Record<string, string>; // String values only
  readonly performance: ActionPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ActionPerformance {
  // PERFORMANCE METRICS (using primitive types)
  readonly duration: number; // Consciousness cycles
  readonly memory: number; // Consciousness units
  readonly complexity: string;
  
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
  readonly capabilities: readonly string[];
  readonly performance: DispatcherPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface DispatcherPerformance {
  // PERFORMANCE METRICS (using primitive types)
  readonly throughput: string;
  readonly latency: string;
  readonly reliability: string;
  
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
  readonly type: string;
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
  readonly scope: string;
  readonly context: ClearContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ClearContext {
  // CONTEXTUAL INFORMATION
  readonly reason: string;
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
  readonly source: string;
  readonly validation: RestoreValidation;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface RestoreValidation {
  // VALIDATION PROPERTIES
  readonly integrity: boolean;
  readonly freshness: string;
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
  readonly fontSize: string;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// LAYOUT STORE CONFIGURATION ARCHITECTURE
// ============================================================================

export interface LayoutStoreConfig {
  // PERSISTENCE SETTINGS
  readonly persistKey: string;
  readonly maxHistorySize: number;
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
  readonly trigger: string;
  readonly performance: PersistencePerformance;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface PersistencePerformance {
  // PERFORMANCE METRICS
  readonly duration: number; // Consciousness cycles
  readonly size: number; // Consciousness units
  readonly compression: string;
  
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
  readonly source: string;
  readonly validation: RestorationValidation;
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface RestorationValidation {
  // VALIDATION PROPERTIES
  readonly integrity: boolean;
  readonly freshness: string;
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
  readonly maxStates: number;
  readonly compression: boolean;
  readonly cleanup: CleanupConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly memoryTaxonomy: DataTaxonomyType;
}

export interface CleanupConfig {
  // CLEANUP SETTINGS
  readonly strategy: string;
  readonly frequency: string;
  readonly threshold: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface PerformanceConfig {
  // PERFORMANCE SETTINGS
  readonly batchSize: number;
  readonly cacheSize: number;
  readonly throttle: number;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface PersistenceConfig {
  // PERSISTENCE SETTINGS
  readonly interval: number;
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
  readonly complexity: string;
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
  readonly priority: string;
  readonly capabilities: readonly string[];
  
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
  readonly type: string;
  
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
  readonly frequency: string;
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
  readonly reason: string;
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