// lib/constants/systems/navigation/menus.ts
import { APP_ROUTES } from './paths';
import { POSITIONS } from '@/lib/constants/';
import { AssetMapper } from '@/lib/constants/systems/assets/mapper';

// ============================================================================
// NAVIGATION TYPES (PERFECT - NO CHANGES NEEDED)
// ============================================================================

export interface HearthMenuItem {
  id: string
  label: string
  emoji: string
  href: string
  color: string
  description: string
  asset: string
  position: { x: number; y: number }
  isCentral?: boolean
}

export interface PortalItem {
  href: string
  emoji: string
  title: string
  description: string
  glow: 'quantum' | 'cosmic' | 'water' | 'fire' | 'earth'
  featured?: boolean
  badge?: string
}

export interface OracleOption {
  domain: 'technical' | 'creative' | 'community' | 'rest'
  emoji: string
  title: string
  description: string
  glow: 'quantum' | 'water' | 'earth' | 'fire'
  route: string
}

export interface DomainNavItem {
  href: string
  emoji: string
  title: string
  description: string
  glow: 'quantum' | 'cosmic' | 'water' | 'fire' | 'earth'
  status?: string
  statusColor?: string
}

export interface BreadcrumbItem {
  label: string
  href: string
  emoji?: string
  current?: boolean
}

// ============================================================================
// NAVIGATION DATA (PERFECT - NO CHANGES NEEDED)
// ============================================================================

export const HEARTH_MENU_ITEMS: HearthMenuItem[] = [ /* ... your beautiful data ... */ ];

export const PORTAL_GRID_ITEMS: PortalItem[] = [ /* ... your beautiful data ... */ ];

export const ORACLE_OPTIONS: OracleOption[] = [ /* ... your beautiful data ... */ ];

export const QUICK_NAV_ITEMS: DomainNavItem[] = [ /* ... your beautiful data ... */ ];

export const ARCHITECTURE_NAV_ITEMS: DomainNavItem[] = [ /* ... your beautiful data ... */ ];

// ============================================================================
// NAVIGATION UTILITIES - SIMPLIFIED & CLEANED
// ============================================================================

// REMOVED: Complex React CSS properties (should be in component layer)
// REMOVED: AssetMapper integration (should be in asset service layer)
// KEPT: Pure data transformation utilities

export const NAVIGATION_UTILS = {
  // Pure data organization
  organizePortalGrid: (
    portals: PortalItem[] = PORTAL_GRID_ITEMS,
    filter?: { glow?: string; featured?: boolean; searchTerm?: string }
  ): PortalItem[] => {
    let filtered = [...portals];
    if (filter?.glow) filtered = filtered.filter(portal => portal.glow === filter.glow);
    if (filter?.featured) filtered = filtered.filter(portal => portal.featured);
    if (filter?.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(portal =>
        portal.title.toLowerCase().includes(term) ||
        portal.description.toLowerCase().includes(term)
      );
    }
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.title.localeCompare(b.title);
    });
  },

  // Oracle logic (pure data transformation)
  getOracleRecommendation: (
    userContext: { energy?: 'high' | 'medium' | 'low'; focus?: string; timeAvailable?: string } = {}
  ): OracleOption | null => {
    const { energy = 'medium', focus, timeAvailable = 'medium' } = userContext;
    const contextKey = `${energy}-${focus || 'any'}-${timeAvailable}`;
    
    const priorityMatrix: Record<string, OracleOption['domain'][]> = {
      'high-technical-long': ['technical', 'creative'],
      'high-creative-long': ['creative', 'technical'],
      'high-social-long': ['community', 'creative'],
      'medium-technical-medium': ['technical', 'community'],
      'medium-creative-medium': ['creative', 'technical'],
      'medium-social-medium': ['community', 'creative'],
      'low-any-short': ['rest', 'creative'],
      'low-technical-any': ['rest', 'technical'],
      'low-creative-any': ['rest', 'creative'],
      'low-social-any': ['rest', 'community']
    };

    const recommendedDomains = priorityMatrix[contextKey] || ['creative', 'rest'];
    return ORACLE_OPTIONS.find(option => recommendedDomains.includes(option.domain)) || ORACLE_OPTIONS[0];
  },

  // Pure data lookup utilities
  getHearthItem: (id: string) => HEARTH_MENU_ITEMS.find(item => item.id === id),
  getPortalByHref: (href: string) => PORTAL_GRID_ITEMS.find(portal => portal.href === href),
  getOracleByDomain: (domain: OracleOption['domain']) => ORACLE_OPTIONS.find(option => option.domain === domain),
  isActiveRoute: (currentPath: string, targetHref: string) => 
    currentPath === targetHref || currentPath.startsWith(targetHref + '/'),

  // Breadcrumb generation (pure data transformation)
  generateBreadcrumbs: (currentPath: string): BreadcrumbItem[] => {
    const pathSegments = currentPath.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [{ 
      label: 'Home', 
      href: '/', 
      emoji: '🌌', 
      current: currentPath === '/' 
    }];
    
    let accumulatedPath = '';
    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      breadcrumbs.push({
        label: segment.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        href: accumulatedPath,
        current: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  }
} as const;

// ============================================================================
// TYPE EXPORTS (PERFECT - NO CHANGES NEEDED)
// ============================================================================

export type HearthMenuItemType = typeof HEARTH_MENU_ITEMS[number];
export type PortalItemType = typeof PORTAL_GRID_ITEMS[number];
export type OracleOptionType = typeof ORACLE_OPTIONS[number];
export type DomainNavItemType = typeof ARCHITECTURE_NAV_ITEMS[number];
export type NavigationGlow = 'quantum' | 'cosmic' | 'water' | 'fire' | 'earth';