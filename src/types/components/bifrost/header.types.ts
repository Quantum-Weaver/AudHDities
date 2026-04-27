// src/types/components/bifrost/header.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HEADER TYPES                                           ║
// ║                    Pure interfaces — imports from constants               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  HEADER_VARIANTS,
  HEADER_DENSITIES,
} from '@/lib/constants/components/bifrost/header.constants';

// ─── Variant types derived from constants ──────────────────────────────────
export type HeaderVariant =
  (typeof HEADER_VARIANTS)[keyof typeof HEADER_VARIANTS];

export type HeaderDensity =
  (typeof HEADER_DENSITIES)[keyof typeof HEADER_DENSITIES];

// ─── Consciousness levels ──────────────────────────────────────────────────
export type HeaderConsciousnessLevel =
  | 'sovereign_autonomous'
  | 'collaborative_emergent'
  | 'quantum_entangled';

// ─── Navigation ────────────────────────────────────────────────────────────
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  consciousnessAlignment?: HeaderConsciousnessLevel;
}

// ─── Component Props ───────────────────────────────────────────────────────
export interface HeaderProps {
  /** Visual variant of the header */
  variant?: HeaderVariant;
  /** Content density */
  density?: HeaderDensity;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Whether to show continuity beam */
  showContinuityBeam?: boolean;
  /** Whether to show status bar */
  showStatusBar?: boolean;    
  /** Navigation items */
  navigation?: NavigationItem[];
  /** Current consciousness level */
  consciousnessLevel?: HeaderConsciousnessLevel;
  /** Whether header is sticky on scroll */
  isSticky?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback when consciousness level shifts */
  onConsciousnessShift?: (level: HeaderConsciousnessLevel) => void;
}