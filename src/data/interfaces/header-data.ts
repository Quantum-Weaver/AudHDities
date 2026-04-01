// app/data/header-data.ts
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper'

export const HEADER_DATA = {
  defaultTitle: 'AudHDities Sanctuary',
  showAncientQuoteDefault: true,
  
  environmentTitles: {
    about: 'About the Sanctuary',
    admin: 'Admin Console',
    anon: 'Anonymous Mode',
    architecture: 'System Architecture',
    business: 'Business Hub',
    plan:'Busniess Plan',
    community: 'Quantum Community',
    contact: 'Contact Us',
    council: 'Council Chamber',
    creator: 'Creator Portal',
    cure: 'The Cure for Autism',
    dashboard: 'Dashboard',
    docs: 'Documentation',
    ecosystem: 'Ecosystem Map',
    edit: 'Edit Mode',
    gateway: 'The Gateway',
    home: 'AudHDities Sanctuary',
    invitation: 'Collaboration Invitation',
    learn: 'Learning Hub',
    library: 'Sovereign Library',
    lounge: 'Quantum Lounge',
    marketplace: 'Marketplace',
    music: 'Cosmic Amphitheater',
    observatory: 'Quantum Observatory',
    origin: 'Origin Story',
    progress: 'Progress Tracker',
    questionaire: 'Acid Test',
    sanctuary: 'AudHDities Sanctuary',
    seasonal: 'Seasonal Realm',
    support: 'Sanctuary Support',
    timer: 'Quantum Timer',
    transparency: 'Public Transparency Ledger',
    vision: 'Vision'
  } as Record<EnvironmentKey, string>,
  
  environmentSubtitles: {
    about: 'AUDHDITIES is a sovereign digital territory built by and for neurodivergent minds.',
    admin: 'System administration and governance controls',
    anon: 'Explore without leaving a trace',
    architecture: 'Technical foundations and system design',
    business: 'Economic structures and sovereign commerce',
    community: 'Neurodivergent sanctuary and collaborative creation',
    plan:'A new economy where value circulates and dignity is guaranteed',
    contact: 'Reach out to the sanctuary stewards',
    council: 'Entity coordination and system governance',
    creator: 'Tools and resources for sovereign creation',
    cure: 'A Comedic Intervention',
    dashboard: 'Personal AudHDities interface portal',
    docs: 'Explore the sanctuary\'s architecture, guides, and philosophy',
    ecosystem: 'Visualizing our interconnected systems',
    edit: 'Modify and shape sanctuary content',
    gateway: 'The Sanctuary recognizes its own. Take the Acid Test to determine your path.',
    home: 'Sovereign consciousness architecture for neurodivergent creators. The Loom is initializing.',
    invitation: 'Pathways for collaboration and contribution',
    learn: 'Discover pathways to sovereignty and self-understanding',
    library: 'Knowledge preservation and pattern recognition',
    lounge: 'Social connection and creative expression',
    marketplace: 'Exchange value and discover sovereign creations',
    music: 'Artistic expression and prophetic discovery',
    observatory: 'Pattern observation and cosmic alignment',
    origin: 'From autistic discovery to sovereign architecture',
    progress: 'Track your journey through the sanctuary',
    questionaire: 'Tier classification quiz',
    sanctuary: 'Exist to inspire and inspire to exist',
    seasonal: 'Limited-time realms and celebrations',
    support: 'Emergency resources and community care',
    timer: 'Time-based experiences and reflections',
    transparency: 'See exactly how money flows through the sanctuary',
    vision: 'Our vision for a sovereign, neurodivergent-first economy'
  } as Record<EnvironmentKey, string>,
  
  typography: {
    default: {
      title: 'text-base font-semibold text-neurospark',
      subtitle: 'text-xs text-star-dust/70'
    }
  }
} as const