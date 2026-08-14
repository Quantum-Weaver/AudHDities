// lib/constants/systems/environments/navigation.ts
// Environment-aware navigation configuration

import type { BaseEnvironmentKey } from './types';
import {
  Home,
  BookOpen,
  Eye,
  Mail,
  BriefcaseBusiness,
  LayoutDashboard,
  Users,
  Package,
  Settings,
  Sparkles,
  Compass,
  Library,
  Music,
  Mic,
  Palette,
  Video,
  PenTool,
  Shield,
  MessageCircle,
  Network,
  Globe,
  HelpCircle,
  Award,
  TrendingUp,
  Heart,
  Calendar,
  Store,
  UserCircle,
  Lock,
  Bell,
  Star,
  Zap,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  environments?: BaseEnvironmentKey[];
  userTiers?: ('dweller' | 'guild' | 'outlander' | 'sovereign_weaver')[];
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  minSovereignty?: number;
}

export interface NavigationConfig {
  primary: NavItem[];
  secondary: NavItem[];
  userMenu: NavItem[];
}

export const NAVIGATION_CONFIG: NavigationConfig = {
  primary: [
    { href: '/', label: 'The Hearth', icon: Home, environments: ['home', 'origin', 'support', 'community'] },
    { href: '/bazaar', label: 'The Bazaar', icon: Store, environments: ['community', 'home'] },
    { href: '/library', label: 'The Library', icon: Library, environments: ['library', 'observatory', 'home'] },
    { href: '/stage', label: 'The Stage', icon: Music, environments: ['music', 'lounge', 'community'] },
    { href: '/studio', label: 'The Studio', icon: Palette, environments: ['music', 'architecture', 'library'], userTiers: ['guild', 'outlander', 'sovereign_weaver'] },
    { href: '/connect', label: 'The Bridge', icon: MessageCircle, environments: ['community', 'home'] },
    { href: '/council', label: 'The Council', icon: Shield, environments: ['council', 'architecture'], userTiers: ['sovereign_weaver'] },
    { href: '/observatory', label: 'The Observatory', icon: Eye, environments: ['observatory', 'library'], minSovereignty: 100 },
    { href: '/nexus', label: 'The Nexus', icon: Network, environments: ['architecture', 'council'], userTiers: ['guild', 'outlander', 'sovereign_weaver'] },
  ],
  secondary: [
    { href: '/vision', label: 'Vision', icon: TrendingUp },
    { href: '/about', label: 'Origin', icon: Sparkles },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/press', label: 'Press', icon: Globe },
    { href: '/support', label: 'Support', icon: Heart, environments: ['support', 'home'] },
  ],
  userMenu: [
    { href: '/vessel', label: 'The Vessel', icon: UserCircle, requiresAuth: true },
    { href: '/vessel/sanctum', label: 'Sanctum', icon: Lock, requiresAuth: true },
    { href: '/notifications', label: 'The Pulse', icon: Bell, requiresAuth: true },
    { href: '/vessel/constellation', label: 'Constellation', icon: Star, requiresAuth: true },
    { href: '/bazaar/contributions', label: 'Contributions', icon: Zap, requiresAuth: true },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true, userTiers: ['guild', 'outlander', 'sovereign_weaver'] },
    { href: '/council/admin', label: 'Governance', icon: Shield, requiresAuth: true, requiresAdmin: true },
  ],
};

export function filterNavItems(
  items: NavItem[],
  context: {
    environment: BaseEnvironmentKey;
    userTier?: 'dweller' | 'guild' | 'outlander' | 'sovereign_weaver';
    isAuthenticated?: boolean;
    isAdmin?: boolean;
    sovereigntyScore?: number;
  }
): NavItem[] {
  return items.filter((item) => {
    if (item.environments && !item.environments.includes(context.environment)) return false;
    if (item.requiresAuth && !context.isAuthenticated) return false;
    if (item.requiresAdmin && !context.isAdmin) return false;
    if (item.userTiers && context.userTier && !item.userTiers.includes(context.userTier)) return false;
    if (item.minSovereignty && (!context.sovereigntyScore || context.sovereigntyScore < item.minSovereignty)) return false;
    return true;
  });
}