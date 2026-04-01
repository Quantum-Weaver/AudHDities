// src/types/components/immersive/continuity-beam.ts (minimal safe types)
// ============================================================================
// CONTINUITY BEAM TYPES - SAFE EXISTING STRUCTURE
// ============================================================================

import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';

// Base continuity beam props interface (extends existing)
export interface ContinuityBeamProps {
  variant?: EnvironmentKey;
  isActive?: boolean;
  intensity?: number;
  showQuantumSweep?: boolean;
  className?: string;
  purpose?: string;
}

// Beam purpose types (from existing constants)
export type BeamPurpose = 
  | 'memory_preservation'
  | 'emotional_support'
  | 'cross_domain_connection';

// Beam intensity levels (from existing constants)
export type BeamIntensity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'quantum';

// Beam configuration (from existing)
export interface BeamConfig {
  variant: EnvironmentKey;
  intensity: number;
  showQuantumSweep: boolean;
}

// Beam activation state (optional enhancement)
export interface BeamActivationState {
  isActive: boolean;
  intensity: BeamIntensity;
  purpose: BeamPurpose;
  activationTime?: number;
}

// Beam session data (optional)
export interface BeamSessionData {
  sessionId?: string;
  emotionalContext?: string;
  memoryPreservation?: boolean;
  crossDomainConnections?: string[];
}