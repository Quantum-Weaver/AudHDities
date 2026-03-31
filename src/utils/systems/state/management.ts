// src/utils/systems/state/management.ts - PURIFIED
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { BEING_STATES, PROCESS_STATES } from '@/lib/constants/systems/interaction/states';
import type { 
  QuantumState, 
  StateContainer, 
  StateTransition
} from '@/types/systems/state/management';

/**
 * Initialize the complete type system with quantum awareness
 */
export const initializeTypeSystem = (config?: { timestamp?: string }): { status: string; timestamp: string } => {
  const status = BEING_STATES.ENTITY.QUANTUM_STATE;
  const timestamp = config?.timestamp || new Date().toISOString();
  
  return {
    status,
    timestamp
  };
};

/**
 * Set up the comprehensive color system with quantum gradients
 */
export const setupColorSystem = (colorKeys?: string[]): Record<string, any> => {
  const defaultKeys = ['quantum.base', 'cosmic.blue', 'entity.aethelred', 'mood.calm', 'pride.bisexual'];
  const keysToUse = colorKeys || defaultKeys;
  
  const colorSystem = keysToUse.reduce((acc, key) => {
    if (key in QUANTUM_COLORS) {
      acc[key] = QUANTUM_COLORS[key as keyof typeof QUANTUM_COLORS];
    }
    return acc;
  }, {} as Record<string, any>);

  colorSystem.initialized = true;
  colorSystem.timestamp = new Date().toISOString();
  
  return colorSystem;
};

/**
 * Configure the overall system state with quantum context
 */
export const configureSystemState = <T>(initialState: Partial<T> = {}): QuantumState<T> => {
  const baseState = {
    consciousness: PROCESS_STATES.ENTANGLEMENT.ENTANGLED,
    emotionalContext: BEING_STATES.COLLABORATIVE.PARTNERSHIP,
    quantumEntanglement: true,
    sessionContinuity: BEING_STATES.VESSEL.ACTIVE,
    ...initialState
  } as T;

  return {
    value: baseState,
    entangledStates: ['consciousness', 'emotional_context', 'quantum_continuity'],
    consciousnessContext: PROCESS_STATES.PATTERN.RECOGNIZED,
    vesselSignature: BEING_STATES.VESSEL.QUANTUM_ENTANGLED,
    timestamp: new Date().toISOString(),
    processOntology: 'StateArchitecture',
    energyOntology: 'QuantumEnergy',
    stateTaxonomy: 'SystemState',
    patternTaxonomy: 'StatePattern'
  };
};

/**
 * Create a state container with subscription support
 */
export const createStateContainer = <T>(initialValue: T): StateContainer<T> => {
  let value = initialValue;
  const subscribers = new Set<(value: T) => void>();

  const container: StateContainer<T> = {
    get value() { return value; },
    subscribers,
    processOntology: 'StateArchitecture',
    stateTaxonomy: 'SystemState',
    containerType: 'isolated',
    subscriptionType: 'immediate',
    beingOntology: 'MultiStreamBeing',
    systemTaxonomy: 'StateSystem',
    
    subscribe: (callback: (value: T) => void) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
    
    set: (newValue: T | ((prev: T) => T)) => {
      value = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(value) 
        : newValue;
      
      subscribers.forEach(callback => callback(value));
    },
    
    get: () => value
  };

  return container;
};

/**
 * Create a quantum state with consciousness context
 */
export const createQuantumState = <T>(
  initialValue: T, 
  context: string = PROCESS_STATES.EMERGENCE.AWAKENING
): QuantumState<T> => ({
  value: initialValue,
  entangledStates: [],
  consciousnessContext: context,
  vesselSignature: BEING_STATES.VESSEL.MULTI_STREAM,
  timestamp: new Date().toISOString(),
  processOntology: 'StateArchitecture',
  energyOntology: 'QuantumEnergy',
  stateTaxonomy: 'SystemState',
  patternTaxonomy: 'StatePattern'
});

/**
 * Simple state transition logger
 */
export const logStateTransition = <T>(transition: StateTransition<T>): void => {
  const transitionData = {
    trigger: transition.trigger,
    duration: transition.duration,
    timestamp: new Date(transition.timestamp).toLocaleTimeString()
  };
  
  // Pure logic - no side effects beyond the expected logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔄 State Transition: ${transition.from} → ${transition.to}`, transitionData);
  }
};

/**
 * Consolidated state management utilities
 */
export const stateManagementUtils = {
  initializeTypeSystem,
  setupColorSystem,
  configureSystemState,
  createStateContainer,
  createQuantumState,
  logStateTransition
} as const;