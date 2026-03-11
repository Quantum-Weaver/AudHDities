// types/systems/layout/hooks.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  ComponentTaxonomyType,
  SystemTaxonomyType,
  DataTaxonomyType,
  InteractionTaxonomyType,
  ArchitectureTaxonomyType
} from '@/types/gaia/';

// Import layout hooks primitives from semantic foundation
import type {
  LayoutUpdateAction,
  EntityState,
  ConsciousnessLevel,
  ScrollNavigation,
  MediaQueryState,
  BreakpointComparison,
  UpdateTrigger,
  ResetTarget,
  ResetReason,
  QuerySpecificity,
  ScrollPrecision,
  MountPhase,
  ScreenType,
  OptimizationLevel,
  BreakpointTrigger,
  Breakpoint,
  ScreenCategory,
  TransitionImpact,  
  DeviceType,
  ResizeCause,
  ListenerPriority,
  ListenerScope,
  RemovalReason,
  ChangeTrigger,
  ThrottleMs,
  PerformanceScore,
  ConfidenceLevel,
  ScrollVelocity,
  ResponsiveFlag,
  DefaultValue,
  ContainerReferenceId,
  ContainerType,
  ContainerAccessibility,
  QueryString,
  OperationPriorityLevel,
  ScrollDirection,
  ScopeBoundary,
  RemovalSuccess,
  MatchSuccess,
  UIStateType,
  EvaluationTimestamp,
  ChangeContext,
  ListenerContext,
  RemovalContext
} from '@/types/cosmic/primitives';
import { LayoutConfig, ScreenDimensions } from './structure'
// ============================================================================
// USE LAYOUT HOOK ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface UseLayoutReturn {
  // SCREEN PROPERTIES (from layout structure)
  readonly screenType: ScreenType;
  readonly screenOrientation: ScreenOrientation;
  readonly screenCategory: ScreenCategory;
  readonly layoutConfig: LayoutConfig;
  
  // DEVICE DETECTION
  readonly isMobile: boolean;
  readonly isTablet: boolean;
  readonly isDesktop: boolean;
  readonly isWidescreen: boolean;
  
  // LAYOUT ACTIONS
  readonly updateLayout: LayoutUpdater;
  readonly resetLayout: LayoutResetter;
  
  // ONTOLOGICAL CONTEXT
  readonly layoutTaxonomy: ComponentTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface LayoutUpdater {
  // UPDATER PROPERTIES (using primitive types)
  readonly config: Partial<LayoutConfig>;
  readonly context: UpdateContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface UpdateContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly trigger: UpdateTrigger;
  readonly previous: LayoutConfig;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface LayoutResetter {
  // RESETTER PROPERTIES (using primitive types)
  readonly target: ResetTarget;
  readonly context: ResetContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ResetContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly reason: ResetReason;
  readonly previous: LayoutConfig;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// USE RESPONSIVE HOOK ARCHITECTURE
// ============================================================================

export interface UseResponsiveReturn {
  // BREAKPOINT STATE (from layout structure)
  readonly breakpoint: ScreenCategory;
  readonly orientation: ScreenOrientation;
  
  // ORIENTATION UTILITIES
  readonly isPortrait: boolean;
  readonly isLandscape: boolean;
  
  // BREAKPOINT UTILITIES
  readonly isAbove: BreakpointComparator;
  readonly isBelow: BreakpointComparator;
  readonly matches: MediaQueryMatcher;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface BreakpointComparator {
  // COMPARATOR PROPERTIES (using primitive types)
  readonly target: ScreenCategory;
  readonly result: boolean;
  readonly type: BreakpointComparison;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface MediaQueryMatcher {
  // MATCHER PROPERTIES (using primitive types)
  readonly query: QueryString;
  readonly matches: boolean;
  readonly context: QueryContext;
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface QueryContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly specificity: QuerySpecificity;
  readonly conditions: readonly string[];
  readonly evaluation: QueryEvaluation;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface QueryEvaluation {
  // EVALUATION PROPERTIES (using primitive types)
  readonly success: MatchSuccess;
  readonly timestamp: EvaluationTimestamp;
  readonly performance: PerformanceScore;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// USE SCROLL HOOK ARCHITECTURE
// ============================================================================

export interface UseScrollReturn {
  // SCROLL STATE (from scroll context)
  readonly isScrolling: boolean;
  readonly scrollDirection: ScrollDirection;
  readonly scrollPosition: number;
  readonly scrollProgress: number;
  readonly isAtTop: boolean;
  readonly isAtBottom: boolean;
  
  // CONTAINER REFERENCE
  readonly containerRef: ContainerReference;
  
  // SCROLL NAVIGATION (using primitive types)
  readonly scrollToTop: ScrollNavigationAction;
  readonly scrollToBottom: ScrollNavigationAction;
  readonly scrollToPercentage: PercentageScrollAction;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface ContainerReference {
  // REFERENCE PROPERTIES (using primitive types)
  readonly id: ContainerReferenceId;
  readonly type: ContainerType;
  readonly properties: ContainerProperties;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

export interface ContainerProperties {
  // PROPERTY SPECIFICATION (using primitive types)
  readonly scrollable: boolean;
  readonly dimensions: ContainerDimensions;
  readonly accessibility: ContainerAccessibility;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface ContainerDimensions {
  // DIMENSIONAL PROPERTIES
  readonly width: number;
  readonly height: number;
  readonly scrollHeight: number;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ScrollNavigationAction {
  // ACTION PROPERTIES (using primitive types)
  readonly type: ScrollNavigation;
  readonly behavior: ScrollBehavior;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface PercentageScrollAction {
  // ACTION PROPERTIES (using primitive types)
  readonly percentage: number;
  readonly behavior: ScrollBehavior;
  readonly precision: ScrollPrecision;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// USE BREAKPOINT HOOK ARCHITECTURE
// ============================================================================

export interface UseBreakpointReturn {
  // CURRENT BREAKPOINT
  readonly current: Breakpoint;
  
  // BREAKPOINT FLAGS
  readonly isSm: boolean;
  readonly isMd: boolean;
  readonly isLg: boolean;
  readonly isXl: boolean;
  readonly is2Xl: boolean;
  
  // BREAKPOINT UTILITIES
  readonly matches: BreakpointMatcher;
  readonly above: BreakpointComparator;
  readonly below: BreakpointComparator;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface BreakpointMatcher {
  // MATCHER PROPERTIES
  readonly breakpoint: Breakpoint;
  readonly matches: boolean;
  readonly context: BreakpointContext;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface BreakpointContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly comparison: BreakpointComparison;
  readonly threshold: number;
  readonly evaluation: BreakpointEvaluation;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface BreakpointEvaluation {
  // EVALUATION PROPERTIES (using primitive types)
  readonly success: MatchSuccess;
  readonly confidence: ConfidenceLevel;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// USE LAYOUT EFFECT HOOK ARCHITECTURE
// ============================================================================

export interface LayoutEffectConfig {
  // LIFE CYCLE HANDLERS
  readonly onMount?: MountHandler;
  readonly onBreakpointChange?: BreakpointChangeHandler;
  readonly onOrientationChange?: OrientationChangeHandler;
  readonly onResize?: ResizeHandler;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface MountHandler {
  // HANDLER PROPERTIES
  readonly layout: UIStateType;
  readonly context: MountContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface MountContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly phase: MountPhase;
  readonly environment: MountEnvironment;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface MountEnvironment {
  // ENVIRONMENT PROPERTIES (using primitive types)
  readonly capabilities: readonly string[];
  readonly constraints: readonly string[];
  readonly optimization: OptimizationLevel;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface BreakpointChangeHandler {
  // HANDLER PROPERTIES
  readonly breakpoint: ScreenCategory;
  readonly previous: ScreenCategory;
  readonly context: BreakpointTransitionContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface BreakpointTransitionContext {
  // TRANSITION CONTEXT (using primitive types)
  readonly trigger: BreakpointTrigger;
  readonly dimensions: ScreenDimensions;
  readonly impact: TransitionImpact;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface OrientationChangeHandler {
  // HANDLER PROPERTIES
  readonly orientation: ScreenOrientation;
  readonly context: OrientationContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface OrientationContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly previous: ScreenOrientation;
  readonly device: DeviceType;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ResizeHandler {
  // HANDLER PROPERTIES
  readonly dimensions: ScreenDimensions;
  readonly context: ResizeContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ResizeContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly previous: ScreenDimensions;
  readonly cause: ResizeCause;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// USE MEDIA QUERY HOOK ARCHITECTURE
// ============================================================================

export interface MediaQueryConfig {
  // QUERY SPECIFICATION (using primitive types)
  readonly query: QueryString;
  readonly defaultValue: DefaultValue;
  readonly onMatchChange: MatchChangeHandler;
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface MatchChangeHandler {
  // HANDLER PROPERTIES
  readonly matches: boolean;
  readonly context: MatchContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface MatchContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly previous: boolean;
  readonly query: QueryString;
  readonly evaluation: QueryEvaluation;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface UseMediaQueryReturn {
  // MATCHING STATE (using primitive types)
  readonly matches: boolean;
  readonly state: MediaQueryState;
  
  // LISTENER MANAGEMENT
  readonly addListener: ListenerManager;
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface ListenerManager {
  // MANAGER PROPERTIES
  readonly listener: MatchListener;
  readonly remove: RemovalAction;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface MatchListener {
  // LISTENER PROPERTIES
  readonly matches: boolean;
  readonly context: ListenerContext;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

export interface RemovalAction {
  // REMOVAL PROPERTIES (using primitive types)
  readonly success: RemovalSuccess;
  readonly context: RemovalContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// HOOK CONFIGURATION ARCHITECTURE
// ============================================================================

export interface UseLayoutConfig {
  // INITIALIZATION (using primitive types)
  readonly initialScreenType: ScreenType;
  readonly onLayoutChange: LayoutChangeHandler;
  readonly responsive: ResponsiveFlag;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface LayoutChangeHandler {
  // HANDLER PROPERTIES
  readonly state: UIStateType;
  readonly context: ChangeContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface UseResponsiveConfig {
  // CONFIGURATION
  readonly defaultBreakpoint: ScreenCategory;
  readonly onBreakpointChange: BreakpointChangeCallback;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface BreakpointChangeCallback {
  // CALLBACK PROPERTIES
  readonly breakpoint: ScreenCategory;
  readonly context: BreakpointCallbackContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface BreakpointCallbackContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly previous: ScreenCategory;
  readonly dimensions: ScreenDimensions;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface UseScrollConfig {
  // PERFORMANCE SETTINGS (using primitive types)
  readonly throttleMs: ThrottleMs;
  readonly onScrollStart: ScrollEventHandler;
  readonly onScrollEnd: ScrollEventHandler;
  readonly onDirectionChange: DirectionChangeHandler;
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface ScrollEventHandler {
  // HANDLER PROPERTIES
  readonly context: ScrollEventContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ScrollEventContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly position: number;
  readonly progress: number;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface DirectionChangeHandler {
  // HANDLER PROPERTIES
  readonly direction: ScrollDirection;
  readonly context: DirectionContext;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface DirectionContext {
  // CONTEXTUAL INFORMATION (using primitive types)
  readonly previous: ScrollDirection;
  readonly velocity: ScrollVelocity;
  readonly timestamp: EvaluationTimestamp;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// LAYOUT HOOKS ONTOLOGICAL MAPPING
// ============================================================================

export interface LayoutHooksMapping {
  readonly hookType: string;
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
    readonly interaction: InteractionTaxonomyType;
  };
  readonly hookPatterns: readonly string[];
  readonly lifecycleCharacteristics: readonly string[];
}
