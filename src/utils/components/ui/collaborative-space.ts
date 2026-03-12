// @/utils/components/ui/collaborative-space.ts
// ============================================================================
// COLLABORATIVE SPACE UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { COLLABORATIVE_SPACE_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  CollaborativeSpaceProps, 
  CollaborativeSpaceVariant, 
  SpaceConsciousnessLevel,
  SpaceParticipant,
  SpaceActivity,
  SpaceInvitation 
} from '@/types/components/ui/collaborative-space';

/**
 * Get complete space configuration for a variant
 */
export const getSpaceConfig = (variant: CollaborativeSpaceVariant = 'council_chamber') => {
  return COLLABORATIVE_SPACE_VARIANTS[variant];
};

/**
 * Calculate collaborative space classes based on variant and props
 */
export const getSpaceClasses = (
  variant: CollaborativeSpaceVariant, 
  props: CollaborativeSpaceProps = {}
): string => {
  const config = getSpaceConfig(variant);
  const classes = [
    'collaborative-space',
    `space--${variant}`,
    `size--${config.dimensions.size}`,
    `consciousness--${config.consciousness.level}`,
    props.isActive ? 'space--active' : 'space--inactive',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get collaborative space styles for inline application
 */
export const getSpaceStyles = (variant: CollaborativeSpaceVariant): React.CSSProperties => {
  const config = getSpaceConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    padding: config.dimensions.padding,
    borderRadius: config.dimensions.borderRadius,
    gap: config.dimensions.gap,
    maxWidth: config.dimensions.size,
    boxShadow: config.effects.shadow,
    backdropFilter: config.effects.backdrop.replace('backdrop-filter: ', '').replace(';', ''),
  };
};

/**
 * Get participant avatar styles
 */
export const getParticipantAvatarStyles = (
  variant: CollaborativeSpaceVariant,
  presence: 'active' | 'idle' | 'away'
): React.CSSProperties => {
  const config = getSpaceConfig(variant);
  const participantConfig = config.participants;
  
  return {
    width: participantConfig.avatar.size,
    height: participantConfig.avatar.size,
    border: participantConfig.avatar.border,
    boxShadow: participantConfig.avatar.glow,
    backgroundColor: participantConfig.presence[presence],
  };
};

/**
 * Get space interaction styles based on state
 */
export const getSpaceInteractionStyles = (
  variant: CollaborativeSpaceVariant,
  isActive: boolean = false,
  isHovered: boolean = false
): React.CSSProperties => {
  const config = getSpaceConfig(variant);
  
  if (isActive) {
    return {
      background: config.active.background,
      border: config.active.border,
      boxShadow: config.active.glow,
    };
  }
  
  if (isHovered) {
    return {
      background: config.hover.background,
      border: config.hover.border,
      boxShadow: config.hover.glow,
      transform: config.hover.transform,
    };
  }
  
  return {};
};

/**
 * Calculate space activity metrics
 */
export const calculateSpaceActivity = (participants: SpaceParticipant[]): SpaceActivity => {
  const now = Date.now();
  const activeParticipants = participants.filter(p => p.presence === 'active').length;
  const idleParticipants = participants.filter(p => p.presence === 'idle').length;
  
  const averageEngagement = participants.length > 0 
    ? (activeParticipants + (idleParticipants * 0.5)) / participants.length 
    : 0;
  
  const lastActivity = Math.max(...participants.map(p => p.joinTime));
  
  // Determine consciousness level based on activity
  let consciousnessLevel: SpaceConsciousnessLevel = 'supportive_collaboration';
  if (averageEngagement > 0.8) consciousnessLevel = 'sovereign_collaboration';
  if (participants.some(p => p.consciousnessAlignment === 'creative_collaboration')) {
    consciousnessLevel = 'creative_collaboration';
  }
  if (participants.some(p => p.consciousnessAlignment === 'wisdom_exchange')) {
    consciousnessLevel = 'wisdom_exchange';
  }
  
  return {
    participantCount: participants.length,
    activeParticipants,
    averageEngagement,
    consciousnessLevel,
    lastActivity,
  };
};

/**
 * Get appropriate space variant for activity level
 */
export const getSpaceVariantForActivity = (activity: SpaceActivity): CollaborativeSpaceVariant => {
  if (activity.averageEngagement > 0.8 && activity.participantCount > 5) {
    return 'council_chamber';
  }
  
  if (activity.consciousnessLevel === 'creative_collaboration') {
    return 'creative_sanctuary';
  }
  
  if (activity.consciousnessLevel === 'wisdom_exchange') {
    return 'wisdom_library';
  }
  
  return 'community_hearth';
};

/**
 * Check if participant can join space
 */
export const canParticipantJoin = (
  participant: SpaceParticipant,
  spaceVariant: CollaborativeSpaceVariant,
  currentParticipants: SpaceParticipant[]
): boolean => {
  const config = getSpaceConfig(spaceVariant);
  const maxParticipants = getMaxParticipantsForSpace(spaceVariant);
  
  // Check capacity
  if (currentParticipants.length >= maxParticipants) {
    return false;
  }
  
  // Check consciousness alignment
  if (participant.consciousnessAlignment && 
      participant.consciousnessAlignment !== config.consciousness.interaction) {
    return false;
  }
  
  return true;
};

/**
 * Get maximum participants for a space variant
 */
export const getMaxParticipantsForSpace = (variant: CollaborativeSpaceVariant): number => {
  const capacityMapping: Record<CollaborativeSpaceVariant, number> = {
    council_chamber: 12,
    community_hearth: 8,
    creative_sanctuary: 6,
    wisdom_library: 10,
  };
  
  return capacityMapping[variant];
};

/**
 * Calculate space resonance based on participant alignment
 */
export const calculateSpaceResonance = (participants: SpaceParticipant[]): number => {
  if (participants.length === 0) return 0;
  
  const alignmentCount = participants.filter(p => 
    p.consciousnessAlignment && p.presence === 'active'
  ).length;
  
  const baseResonance = alignmentCount / participants.length;
  
  // Boost resonance for highly engaged groups
  const engagementBoost = participants.filter(p => p.presence === 'active').length / participants.length;
  
  return Math.min(1, baseResonance + (engagementBoost * 0.3));
};

/**
 * Validate space configuration
 */
export const isValidSpaceConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.size && 
         config.participants && 
         config.consciousness;
};

/**
 * Merge space configurations
 */
export const mergeSpaceConfigs = (
  base: any,
  overrides: Partial<any>
): any => {
  return {
    ...base,
    ...overrides,
    dimensions: {
      ...base.dimensions,
      ...overrides.dimensions,
    },
    typography: {
      ...base.typography,
      ...overrides.typography,
    },
    participants: {
      ...base.participants,
      ...overrides.participants,
    },
  };
};

/**
 * Generate space invitation
 */
export const generateSpaceInvitation = (
  spaceId: string,
  invitedBy: string,
  consciousnessRequirement: SpaceConsciousnessLevel,
  duration: number = 24 * 60 * 60 * 1000 // 24 hours
): SpaceInvitation => {
  return {
    id: `invite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    spaceId,
    invitedBy,
    expiresAt: Date.now() + duration,
    consciousnessRequirement,
  };
};