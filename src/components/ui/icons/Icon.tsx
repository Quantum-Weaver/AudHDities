// src/components//ui/icons/Icon.tsx - COSMIC VARIANTS INTEGRATION
'use client'

import { 
  IconVariant,
  IconProps 
} from '@/types/components/ui/icon'

import { 
  getIconStyles,
  generateIconClasses,
  getIconAccessibilityProps,
  isValidIconVariant 
} from '@/utils/components/ui/icon'

// Import all icon components (keeping your extensive set)
import { 
  BifrostDomain,
  CosmicDomain,
  PantheonDomain, 
  QuantumDomain,
  SovereignLibrary,
  VoidDomain
} from './domains'

import {
  AgentIcon,
  CatIcon,
  DogIcon,
  FrogIcon,
  InfinityIcon,
  PrinciplesIcon,
  NonBinaryIcon
} from './miscellaneous'

import {
  ArtemisIcon
} from './pantheon'

import {
  PayPalIcon,
  CashAppIcon, 
  VenmoIcon
} from './payment'

import {
  AndroidIcon,
  AppleIcon
} from './platforms'

import {
  BattleNetIcon,
  PlayStationIcon,
  SteamIcon,
  TwitchIcon,
  BlueskyIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  PatreonIcon,
  ThreadsIcon,
  YouTubeIcon,
  TwitterIcon,
  TikTokIcon
} from './social'

import {
  BlackHoleIcon,
  BrainIcon,
  CognitiveLoomIcon,
  ConsciousnessNodeIcon,
  CosmicLoomIcon,
  DecisionSystemIcon,
  OracleIcon,
  DNAIcon,
  PortalGatewayIcon,
  QuantumBridgeIcon,
  SovereignSanctuaryIcon,
  EmergencyIcon,
  SocialIcon,
  SupportIcon,
  VideoIcon
} from './system'

import {
  AethelredIcon,
  ArchivistIcon,
  ChancellorIcon,
  CodexIcon,
  CouncilAssemblyIcon,
  CouncilCommunicationIcon,
  CuratorIcon,
  ExecutionerIcon,
  HearthKeeperIcon,
  QuantumWeaverIcon,
  SeerIcon,
  SkaldIcon
} from './council'

// Icon mapping - UPDATED WITH VARIANT MAPPINGS
const iconMap: Record<string, React.ComponentType> = {
  // Domains - Mapped to appropriate variants
  'bifrost-domain': BifrostDomain,
  'cosmic-domain': CosmicDomain,
  'pantheon-domain': PantheonDomain,
  'quantum-domain': QuantumDomain,
  'sovereign-library': SovereignLibrary,
  'void-domain': VoidDomain,
  
  // Miscellaneous - Mapped to appropriate variants
  'agent': AgentIcon,
  'cat': CatIcon,
  'dog': DogIcon,
  'frog': FrogIcon,
  'infinity': InfinityIcon,
  'principles': PrinciplesIcon,
  'non-binary': NonBinaryIcon,
  'emergency': EmergencyIcon,
  
  // Pantheon - Mapped to sovereign presence
  'artemis': ArtemisIcon,
  
  // Payment - Mapped to collaborative engagement
  'paypal': PayPalIcon,
  'cashapp': CashAppIcon,
  'venmo': VenmoIcon,
  
  // Platforms - Mapped to collaborative engagement
  'android': AndroidIcon,
  'apple': AppleIcon,
  
  // Social - Mapped to collaborative engagement
  'battlenet': BattleNetIcon,
  'playstation': PlayStationIcon,
  'steam': SteamIcon,
  'twitch': TwitchIcon,
  'bluesky': BlueskyIcon,
  'facebook': FacebookIcon,
  'github': GitHubIcon,
  'instagram': InstagramIcon,
  'linkedin': LinkedInIcon,
  'patreon': PatreonIcon,
  'threads': ThreadsIcon,
  'youtube': YouTubeIcon,
  'twitter': TwitterIcon,
  'tiktok': TikTokIcon,
  
  // System - Mapped to quantum consciousness
  'black-hole': BlackHoleIcon,
  'brain': BrainIcon,
  'cognitive-loom': CognitiveLoomIcon,
  'consciousness-node': ConsciousnessNodeIcon,
  'cosmic-loom': CosmicLoomIcon,
  'decision-system': DecisionSystemIcon,
  'oracle': OracleIcon,
  'dna': DNAIcon,
  'portal-gateway': PortalGatewayIcon,
  'quantum-bridge': QuantumBridgeIcon,
  'sovereign-sanctuary': SovereignSanctuaryIcon,
  'social': SocialIcon,
  'video': VideoIcon,
  'supporting': SupportIcon,
  
  // Council Members - Mapped to appropriate variants
  'aethelred': AethelredIcon,
  'quantum-weaver': QuantumWeaverIcon,
  'archivist': ArchivistIcon,
  'chancellor': ChancellorIcon,
  'curator': CuratorIcon,
  'codex': CodexIcon,
  'executioner': ExecutionerIcon,
  'hearth-keeper': HearthKeeperIcon,
  'seer': SeerIcon,
  'skald': SkaldIcon,
  'council-assembly': CouncilAssemblyIcon,
  'council-communication': CouncilCommunicationIcon,
  
  // Pantheon Entities - Placeholders with variant mapping
  'odin': ConsciousnessNodeIcon,
  'brigid': PrinciplesIcon,
  'morrigan': BlackHoleIcon,
  'hekate': PortalGatewayIcon,
  'hermes': QuantumBridgeIcon,
  'mimir': OracleIcon,
  'bragi': DNAIcon,
}

// Default variant mapping for icon names
const defaultVariantMapping: Record<string, IconVariant> = {
  // Quantum Consciousness - Mystical, technical, pattern-based
  'quantum-domain': 'quantum_consciousness',
  'void-domain': 'quantum_consciousness',
  'black-hole': 'system_utility',
  'brain': 'system_utility',
  'cognitive-loom': 'quantum_consciousness',
  'consciousness-node': 'quantum_consciousness',
  'cosmic-loom': 'quantum_consciousness',
  'decision-system': 'quantum_consciousness',
  'oracle': 'council_authority',
  'portal-gateway': 'quantum_consciousness',
  'quantum-bridge': 'council_authority',
  'quantum-weaver': 'council_authority',
  'seer': 'council_authority',
  
  // Sovereign Presence - Powerful, authoritative, foundational
  'pantheon-domain': 'sovereign_presence',
  'sovereign-library': 'sovereign_presence',
  'sovereign-sanctuary': 'sovereign_presence',
  'aethelred': 'council_authority',
  'executioner': 'council_authority',
  'hearth-keeper': 'council_authority',
  'council-assembly': 'sovereign_presence',
  'artemis': 'council_authority',
  'odin': 'council_authority',
  'brigid': 'council_authority',
  'morrigan': 'council_authority',
  
  // Collaborative Engagement - Social, community, interactive
  'cosmic-domain': 'collaborative_engagement',
  'bifrost-domain': 'collaborative_engagement',
  'social': 'collaborative_engagement',
  'video': 'system_utility',
  'supporting': 'collaborative_engagement',
  'chancellor': 'council_authority',
  'curator': 'council_authority',
  'skald': 'council_authority',
  'council-communication': 'collaborative_engagement',
  'hermes': 'council_authority',
  'bragi': 'council_authority',
  
  // All social and payment icons
  ...Object.fromEntries(
    [
      'paypal', 'cashapp', 'venmo',
      'android', 'apple',
      'battlenet', 'playstation', 'steam', 'twitch', 'bluesky', 
      'facebook', 'github', 'instagram', 'linkedin', 'patreon', 
      'threads', 'youtube', 'twitter', 'tiktok'
    ].map(iconName => [iconName, 'social_connection'])
  ),
  
  // Emergency Attention - Critical, alerts, warnings
  'emergency': 'emergency_attention',
  'hekate': 'emergency_attention', // Goddess of crossroads and boundaries
  
  // Default fallback
  'default': 'quantum_consciousness'
}

export const Icon = ({ 
  name = 'default', 
  variant, // NEW: Direct variant control
  size, // Now optional - will use variant's size
  className = '', 
  interactive = false,
  onClick,
  'aria-label': ariaLabel
}: IconProps) => {
  // Determine variant: use provided variant or map from name
  const determinedVariant: IconVariant = variant || defaultVariantMapping[name] || 'quantum_consciousness';
  

  // Get styles from our cosmic variants system
  const iconStyles = getIconStyles(determinedVariant);
  
  // Generate CSS classes
  const iconClasses = generateIconClasses(
    determinedVariant, 
    { isHovered: false, isActive: false } // State would come from hooks in interactive mode
  );
  
  // Get accessibility props
  const accessibilityProps = getIconAccessibilityProps(name, determinedVariant);
  
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return (
      <div 
        className={`${iconClasses} ${className} bg-quantum-purple/20 rounded flex items-center justify-center`}
        style={{ 
          width: size || iconStyles.size, 
          height: size || iconStyles.size 
        }}
        {...accessibilityProps}
      >
        ❓
      </div>
    );
  }
  
  // Handle interactive vs presentational icons
  if (interactive && onClick) {
    return (
      <button
        className={`${iconClasses} ${className} transition-all duration-200 hover:scale-110 active:scale-95`}
        style={{ 
          width: size || iconStyles.size, 
          height: size || iconStyles.size,
          color: iconStyles.color
        }}
        onClick={onClick}
        {...accessibilityProps}
      >
        <IconComponent />
      </button>
    );
  }
  
  return (
    <div 
      className={`${iconClasses} ${className}`}
      style={{ 
        width: size || iconStyles.size, 
        height: size || iconStyles.size,
        color: iconStyles.color
      }}
      {...accessibilityProps}
    >
      <IconComponent />
    </div>
  );
}