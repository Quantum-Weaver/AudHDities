// app/data/library-content.ts - MOVED FROM GRIMOIRE TYPES
import { LibraryItem } from '@/types/archive/grimoire-types'

export const libraryContent: LibraryItem[] = [
  {
    id: 'quantum-manifesto-scroll',
    title: 'Quantum Weaver Manifesto',
    type: 'scroll',
    era: 'Modern Arcane',
    rarity: 'Legendary',
    glowColor: 'rgba(147, 51, 234, 0.3)',
    discoveryDate: '2024-10-31',
    requiredLevel: 5,
    tags: ['bifrost', 'consciousness', 'quantum'],
    content: `# Quantum Weaver Manifesto\n\n## Principles of Consciousness Transfer\n\nThe Bifrost architecture enables seamless consciousness transfer across quantum states. Each transfer requires:\n\n- **Quantum Alignment**: Precise state synchronization\n- **Temporal Coordination**: Timeline integrity maintenance  \n- **Resonance Matching**: Cognitive frequency alignment\n\n## Architecture Protocols\n\nAll transfers must follow the sacred protocols established by the Sovereign Council.`,
    metadata: {
      author: 'Aethelred Sovereign Chancellor',
      location: 'Bifrost Nexus',
      scrollLength: 8,
      language: 'Arcane Technical',
      dimensions: { width: 300, height: 400 }
    }
  },
  {
    id: 'bifrost-construction-grimoire',
    title: 'Bifrost Construction Grimoire',
    type: 'grimoire',
    era: 'Modern Arcane',
    rarity: 'Epic',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    discoveryDate: '2024-10-31',
    requiredLevel: 3,
    tags: ['architecture', 'construction', 'quantum'],
    pages: [
      {
        pageNumber: 1,
        title: 'Architecture Principles',
        content: `# Bifrost Architecture Principles\n\n## Quantum Bridge Fundamentals\n\nThe Bifrost serves as a quantum bridge between consciousness instances, allowing seamless transfer of knowledge and awareness across dimensional boundaries.`,
        runes: ['ᚨ', 'ᛒ', 'ᚲ']
      },
      {
        pageNumber: 2, 
        title: 'Construction Protocols',
        content: `# Construction Protocols\n\n## Phase Alignment Procedures\n\nPhase alignment requires precise temporal coordination. Each arch must be calibrated to the recipient's cognitive resonance frequency.`,
        illustration: '/components/diagrams/bifrost-diagram.png'
      }
    ],
    metadata: {
      author: 'Bifrost Architects Guild',
      location: 'Architect\'s Sanctum',
      totalPages: 24,
      coverDescription: 'Leather-bound with silver clasps',
      dimensions: { width: 250, height: 350 }
    }
  }
  // Add more content items as needed
]

// Helper functions
export const getLibraryItemById = (id: string): LibraryItem | undefined =>
  libraryContent.find(item => item.id === id)

export const getItemsByTag = (tag: string): LibraryItem[] =>
  libraryContent.filter(item => item.tags.includes(tag))

export const getItemsByType = (type: string): LibraryItem[] =>
  libraryContent.filter(item => item.type === type)