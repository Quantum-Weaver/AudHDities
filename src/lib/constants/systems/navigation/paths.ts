// lib/constants/systems/navigation/paths.ts
import { AssetMapper } from '@/lib/constants/systems/assets/mapper'

export const APP_ROUTES = {
  // Core Pages
  home: '/',
  origin: '/origin',
  music: '/music',
  council: '/council',
  architecture: '/architecture',
  community: '/community',
  invitation: '/invitation',
  support: '/support',
  library: '/library',
  cure: '/cure/tickets',
  
  // Architecture Sub-routes
  architectureDomains: {
    quantum: '/architecture/id/quantum',
    cosmic: '/architecture/id/cosmic',
    pantheon: '/architecture/id/pantheon',
    bifrost: '/architecture/id/bifrost',
    library: '/architecture/id/library',
    void: '/architecture/id/void'
  },
  
  // Council Sub-routes
  councilEntities: '/council/id',
  councilEntity: (id: string) => `/council/id/${id}`,
  
  // Community & Platform Routes
  socialPlatforms: '/community/platforms',
  gamingProfiles: '/community/gaming',
  
  // Utility Routes
  contact: '/contact',
  share: '/share',

  // Quantum Routes
  alchemy: '/alchemy',
  amphitheater: '/amphitheater',
  apothecary: '/apothecary',
  lounge: '/lounge',
  observatory: '/observatory',
  sandbox: '/sandbox'

} as const

// Navigation Configuration with AssetMapper Integration
export const NAVIGATION_CONFIG = {
  // Hearth Menu Items with Asset References
  hearth: {
    central: { route: APP_ROUTES.home, asset: AssetMapper.ui.runes.clocks.clock1 },
    community: { route: APP_ROUTES.community, asset: AssetMapper.ui.runes.tiles.groupD[9] }, // d9
    music: { route: APP_ROUTES.music, asset: AssetMapper.ui.runes.tiles.groupD[5] }, // d5
    council: { route: APP_ROUTES.council, asset: AssetMapper.ui.runes.tiles.groupD[4] }, // d4
    library: { route: APP_ROUTES.library, asset: AssetMapper.ui.runes.tiles.groupD[2] }, // d2
    origin: { route: APP_ROUTES.origin, asset: AssetMapper.ui.runes.tiles.groupD[1] }, // d1
    support: { route: APP_ROUTES.support, asset: AssetMapper.ui.runes.tiles.groupD[8] } // d8
  },
  
  // Portal Grid Items
  portals: {
    origin: APP_ROUTES.origin,
    music: APP_ROUTES.music,
    council: APP_ROUTES.council,
    architecture: APP_ROUTES.architecture,
    community: APP_ROUTES.community
  },
  
  // Oracle Guidance Routes
  oracle: {
    technical: APP_ROUTES.architecture,
    creative: APP_ROUTES.music,
    community: APP_ROUTES.community,
    rest: APP_ROUTES.origin
  }
} as const

// API Route Constants
export const API_ROUTES = {
  // Content Management
  library: '/api/library',
  libraryItem: (id: string) => `/api/library/${id}`,
  
  // Music Analysis
  music: '/api/music',
  musicAnalysis: (songId: string) => `/api/music/${songId}/analysis`,
  
  // Council Operations
  council: '/api/council',
  councilEntity: (id: string) => `/api/council/${id}`,
  
  // Platform Analytics
  analytics: '/api/analytics',
  engagement: '/api/analytics/engagement'
} as const

// File Path Constants - NOW USING ASSETMAPPER
export const ASSET_PATHS = {
  // All paths now reference AssetMapper
  textures: {
    runes: AssetMapper.ui.runes,
    environment: {
      mysticalMist: AssetMapper.ambient.mystical,
      etherialVeil: AssetMapper.ambient.ethereal,
      cosmicBackground: AssetMapper.ambient.cosmic,
      musicRoom: AssetMapper.environments.music.background
    },
    bifrost: AssetMapper.components.ui.diagrams.bifrost[0]
  },
  
  // Icon paths from AssetMapper
  icons: {
    domains: AssetMapper.icons.domains,
    council: AssetMapper.icons.council,
    social: AssetMapper.icons.social,
    system: AssetMapper.icons.system
  }
} as const

// Route Guards and Permissions
export const ROUTE_GUARDS = {
  // Content Level Requirements
  contentLevels: {
    scroll: 1,
    grimoire: 3,
    tome: 5,
    artifact: 7
  },
  
  // Council Access Levels
  councilAccess: {
    viewer: 1,
    analyst: 3,
    chronicler: 5,
    architect: 7
  }
} as const
