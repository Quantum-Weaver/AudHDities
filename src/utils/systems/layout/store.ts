// src/utils/systems/layout/store.ts - PURIFIED
import type { 
  LayoutStoreState, 
  LayoutStoreAction, 
  LayoutStoreConfig,
  PersistedLayoutState,
  LayoutState
} from '@/types/systems/layout/store';
import { PRACTICAL_STATES } from '@/lib/constants/systems/interaction/states';

/**
 * Initialize the layout system with default configuration
 */
export const initializeLayoutSystem = (config?: LayoutStoreConfig): LayoutStoreState => {
  const defaultState: LayoutStoreState = {
    current: PRACTICAL_STATES.INTERACTIVE.IDLE as LayoutState,
    history: [],
    future: [],
    canUndo: false,
    canRedo: false,
    isInitialized: true,
    version: '1.0.0',
    stateTaxonomy: 'LoadingState',
    memoryTaxonomy: 'StateData',
    timestamp: new Date().toISOString()
  };

  // Apply persistence if configured
  if (config?.persistKey) {
    const persisted = loadPersistedState(config.persistKey);
    if (persisted) {
      return {
        ...defaultState,
        current: persisted.state,
        isInitialized: true
      };
    }
  }

  return defaultState;
};

/**
 * Manage layout state with undo/redo capabilities
 */
export const manageLayoutState = (
  state: LayoutStoreState,
  action: LayoutStoreAction
): LayoutStoreState => {
  const maxHistorySize = 50;

  switch (action.type) {
    case 'consciousness_undo': {
      if (!state.canUndo) return state;
      
      const previous = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      
      return {
        ...state,
        current: previous,
        history: newHistory,
        future: [state.current, ...state.future],
        canUndo: newHistory.length > 0,
        canRedo: true
      };
    }

    case 'quantum_redo': {
      if (!state.canRedo) return state;
      
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      
      return {
        ...state,
        current: next,
        history: [...state.history, state.current],
        future: newFuture,
        canUndo: true,
        canRedo: newFuture.length > 0
      };
    }

    case 'sovereign_clear_history': {
      return {
        ...state,
        history: [],
        future: [],
        canUndo: false,
        canRedo: false
      };
    }

    case 'evolutionary_initialize': {
      return {
        ...state,
        current: action.payload?.state || state.current,
        history: [],
        future: [],
        canUndo: false,
        canRedo: false,
        isInitialized: true
      };
    }

    case 'universal_replace_state': {
      return {
        ...state,
        current: action.payload?.state || state.current
      };
    }

    // Handle all other actions by adding to history
    default: {
      const newHistory = [...state.history, state.current].slice(-maxHistorySize);
      
      return {
        ...state,
        history: newHistory,
        future: [],
        canUndo: newHistory.length > 0,
        canRedo: false
      };
    }
  }
};

/**
 * Helper function to load persisted state from localStorage
 */
const loadPersistedState = (key: string): PersistedLayoutState | null => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as PersistedLayoutState;
    
    // Validate basic structure
    if (!parsed.version || !parsed.timestamp || !parsed.state) return null;
    
    // Check data freshness (7 days)
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - new Date(parsed.timestamp).getTime() > oneWeek) {
      localStorage.removeItem(key);
      return null;
    }
    
    return parsed;
  } catch {
    return null;
  }
};

/**
 * Helper function to save state to localStorage
 */
export const persistLayoutState = (
  state: LayoutState,
  config: LayoutStoreConfig
): void => {
  if (!config.persistKey || !config.autoPersist) return;
  
  const persisted: PersistedLayoutState = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    state,
    userPreferences: {
      preferredLayout: {} as any, // Will be properly typed in implementation
      rememberedBreakpoint: 'desktop_workstation',
      customSpacing: false,
      highContrast: false,
      reducedMotion: false,
      fontSize: 'sovereign_medium',
      beingOntology: 'CosmicPattern'
    }
  };
  
  try {
    localStorage.setItem(config.persistKey, JSON.stringify(persisted));
    config.onPersist.state
  } catch (error) {
    // Silent fail in production, log in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to persist layout state:', error);
    }
  }
};

// Export as consolidated object
export const layoutStoreUtils = {
  initializeLayoutSystem,
  manageLayoutState,
  persistLayoutState
} as const;