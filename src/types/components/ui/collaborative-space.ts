// @/types/components/ui/collaborative-space.ts
// ============================================================================
// COLLABORATIVE SPACE TYPES - PURE SHAPES ONLY
// ============================================================================

import type { COLLABORATIVE_SPACE_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base collaborative space props interface
export interface CollaborativeSpaceProps {
  variant?: keyof typeof COLLABORATIVE_SPACE_VARIANTS;
  title?: string;
  subtitle?: string;
  participants?: SpaceParticipant[];
  maxParticipants?: number;
  isActive?: boolean;
  consciousnessLevel?: SpaceConsciousnessLevel;
  onParticipantJoin?: (participant: SpaceParticipant) => void;
  onParticipantLeave?: (participantId: string) => void;
  onConsciousnessShift?: (level: SpaceConsciousnessLevel) => void;
}

// Space participant structure
export interface SpaceParticipant {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  presence: 'active' | 'idle' | 'away';
  consciousnessAlignment?: SpaceConsciousnessLevel;
  joinTime: number;
}

// Space consciousness states
export type SpaceConsciousnessLevel = 
  | 'sovereign_collaboration'
  | 'supportive_collaboration'
  | 'creative_collaboration'
  | 'wisdom_exchange';

// Space interaction types
export type SpaceInteractionType = 
  | 'sovereign_collaboration'
  | 'supportive_collaboration'
  | 'creative_collaboration'
  | 'wisdom_exchange';

// Space dimension constraints
export interface SpaceDimensions {
  size: 'cosmic' | 'communal' | 'expansive' | 'standard';
  padding: string;
  borderRadius: string;
  gap: string;
  maxWidth: string;
}

// Space visual properties
export interface SpaceVisuals {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Space typography configuration
export interface SpaceTypography {
  title: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  subtitle: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  body: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Participant configuration
export interface SpaceParticipants {
  avatar: {
    size: string;
    border: string;
    glow: string;
    spacing: string;
  };
  presence: {
    active: string;
    idle: string;
    away: string;
  };
}

// Space interaction states
export interface SpaceInteractions {
  hover: {
    glow: string;
    border: string;
    background: string;
    transform?: string;
  };
  active: {
    glow: string;
    border: string;
    background: string;
  };
}

// Space effects configuration
export interface SpaceEffects {
  glow: string;
  shadow: string;
  backdrop: string;
  holographic?: string;
  gradient?: string;
}

// Complete space configuration
export interface SpaceConfig {
  visuals: SpaceVisuals;
  typography: SpaceTypography;
  dimensions: SpaceDimensions;
  participants: SpaceParticipants;
  hover: SpaceInteractions['hover'];
  active: SpaceInteractions['active'];
  effects: SpaceEffects;
  animation: any;
  consciousness: {
    level: SpaceConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    interaction: SpaceInteractionType;
  };
}

// Collaborative space variant type
export type CollaborativeSpaceVariant = keyof typeof COLLABORATIVE_SPACE_VARIANTS;

// Space activity data
export interface SpaceActivity {
  participantCount: number;
  activeParticipants: number;
  averageEngagement: number;
  consciousnessLevel: SpaceConsciousnessLevel;
  lastActivity: number;
}

// Space invitation data
export interface SpaceInvitation {
  id: string;
  spaceId: string;
  invitedBy: string;
  expiresAt: number;
  consciousnessRequirement: SpaceConsciousnessLevel;
}