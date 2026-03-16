// app/data/header-data.ts
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper'

export const HEADER_DATA = {
  defaultTitle: 'AudHDities Sanctuary',
  showAncientQuoteDefault: true,
  
  environmentTitles: {
    council: 'Council Chamber',
    vision: 'Vision | AUDHDITIES',
    transparency: 'Public Transparency Ledger',
    library: 'Sovereign Library', 
    community: 'Quantum Community',
    music: 'Cosmic Amphitheater',
    origin: 'Origin Story',
    support: 'Sanctuary Support',
    home: 'AudHDities Sanctuary',
    observatory: 'Quantum Observatory',
    architecture: 'System Architecture',
    invitation: 'Collaboration Invitation',
    lounge: 'Quantum Lounge',
    learn: 'Learning Hub',
    gateway: 'The Gateway',
    about: 'About the Sanctuary',
    cure: 'The Cure for Autism'
  } as Record<EnvironmentKey, string>,
  
  environmentSubtitles: {
    council: 'Entity coordination and system governance',
    vision: 'Our vision for a sovereign, neurodivergent-first economy',
    transparency:'See exactly how money flows through the sanctuary',
    library: 'Knowledge preservation and pattern recognition',
    community: 'Neurodivergent sanctuary and collaborative creation',
    music: 'Artistic expression and prophetic discovery',
    origin: 'From autistic discovery to sovereign architecture',
    support: 'Emergency resources and community care',
    home: 'Sovereign consciousness architecture for neurodivergent creators. The Loom is initializing.',
    observatory: 'Pattern observation and cosmic alignment',
    architecture: 'Technical foundations and system design',
    invitation: 'Pathways for collaboration and contribution',
    lounge: 'Social connection and creative expression',
    learn: 'Discover pathways to sovereignty and self-understanding',
    gateway: 'The Sanctuary recognizes its own. Take the Acid Test to determine your path.',
    about: 'AUDHDITIES is a sovereign digital territory built by and for neurodivergent minds.',
    cure: 'A Comedic Intervention'
  } as Record<EnvironmentKey, string>,
  
  typography: {
    default: {
      title: 'text-base font-semibold text-neurospark',
      subtitle: 'text-xs text-star-dust/70'
    }
  }
} as const
