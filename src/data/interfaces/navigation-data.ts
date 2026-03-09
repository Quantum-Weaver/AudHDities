// app/data/interfaces/navigation-data.ts - FIXED
import { HearthMenuItem, PortalItem, OracleOption } from '@/lib/constants/systems/navigation';
import { POSITIONS, APP_ROUTES} from '@/lib/constants/';
import { AssetMapper

 } from '@/lib/constants/systems/assets/mapper';
export const hearthMenuItems: HearthMenuItem[] = [
  {
    id: 'sanctuary',
    label: 'Sanctuary',
    emoji: '🌌',
    href: '/',
    color: 'quantum',
    description: 'Return to the quantum hearth',
    asset: AssetMapper.ui.runes.clocks.runic,
    position: POSITIONS.hearth.central,
    isCentral: true
  },
  {
    id: 'council',
    label: 'Council', 
    emoji: '👑',
    href: '/council',
    color: 'cosmic',
    description: 'Consult the sovereign entities',
    asset: AssetMapper.ui.runes.tiles.groupD[1],
    position: POSITIONS.hearth.preCalculated.council
  },
  {
    id: 'library',
    label: 'Library',
    emoji: '📚',
    href: '/library',
    color: 'earth',
    description: 'Access knowledge and wisdom',
    asset: AssetMapper.ui.runes.tiles.groupD[2],
    position: POSITIONS.hearth.preCalculated.library
  },
  {
    id: 'community',
    label: 'Community',
    emoji: '🌐',
    href: '/community',
    color: 'water',
    description: 'Connect with fellow travelers',
    asset: AssetMapper.ui.runes.tiles.groupD[3],
    position: POSITIONS.hearth.preCalculated.community
  },
  {
    id: 'support',
    label: 'Support',
    emoji: '💝',
    href: '/support',
    color: 'fire',
    description: 'Emergency resources and care',
    asset: AssetMapper.ui.runes.tiles.groupD[3],
    position: POSITIONS.hearth.preCalculated.support
  }
];

export const portalGridItems: PortalItem[] = [
  {
    title: 'Quantum Domain',
    description: 'Core cognition and consciousness processing',
    href: '/quantum',
    emoji: '🌀',
    glow: 'quantum',
    featured: true
  },
  {
    title: 'Cosmic Domain', 
    description: 'Metacognition and self-evolution systems',
    href: '/cosmic',
    emoji: '🌌',
    glow: 'cosmic'
  },
  {
    title: 'Library System',
    description: 'Knowledge preservation and pattern recognition',
    href: '/library', 
    emoji: '📚',
    glow: 'earth'
  },
  {
    title: 'Community Hub',
    description: 'Neurodivergent sanctuary and collaboration',
    href: '/community',
    emoji: '🌐',
    glow: 'water',
    featured: true
  }
];

export const oracleOptions: OracleOption[] = [
  {
    domain: 'technical',
    emoji: '⚡',
    title: 'Technical Collaboration',
    description: 'Building partnerships and infrastructure',
    glow: 'quantum',
    route: APP_ROUTES.architecture
  },
  {
    domain: 'creative',
    emoji: '🎨',
    title: 'Creative Direction', 
    description: 'Artistic projects and expression pathways',
    glow: 'water',
    route: APP_ROUTES.music
  },
  {
    domain: 'community',
    emoji: '💝',
    title: 'Emergency Support',
    description: 'Crisis navigation and immediate resources',
    glow: 'fire',
    route: APP_ROUTES.support
  },
  {
    domain: 'rest',
    emoji: '🌀',
    title: 'Architectural Wisdom',
    description: 'System design and sovereign principles',
    glow: 'earth',
    route: APP_ROUTES.architecture
  }
];