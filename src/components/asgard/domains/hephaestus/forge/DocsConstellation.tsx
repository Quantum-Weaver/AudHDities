// src/components/asgard/domains/hephaestus/forge/interactive/DocsConstellation.tsx
'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DocCategoryCrystal } from './DocCategoryCrystal';
import type { DocCategory } from './DocCategoryCrystal';
import { 
  Shield, 
  Database, 
  Infinity, 
  Briefcase,
  Map,
  DollarSign,
  Compass,
  Feather, 
  Truck, 
  Brain,
  BookOpen,
  Star,
  Eye,
  ScrollText,
  Lock,
  FileText,
  Accessibility,
  Mail,
  Globe,
  Users,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// CATALOG DATA
// ═══════════════════════════════════════════════════════════════════════════

const docCategories: DocCategory[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'The technical foundation that makes sovereignty possible',
    icon: Shield,
    color: 'cyan',
    pages: [
      {
        title: 'Authentication Flow',
        path: '/forge/architecture/auth-flow',
        description: 'How we verify and protect your identity with magic links',
        icon: Shield,
        badge: 'Security',
        badgeColor: 'cyan',
      },
      {
        title: 'Database Schema',
        path: '/forge/architecture/database-schema',
        description: 'The living blueprint — always accurate, always transparent',
        icon: Database,
        badge: 'Living Doc',
        badgeColor: 'purple',
      },
      {
        title: 'Residual System',
        path: '/forge/architecture/residual-system',
        description: 'How value flows to every contributor, forever',
        icon: Infinity,
        badge: 'Economics',
        badgeColor: 'pink',
      },
    ],
  },
  {
    id: 'business',
    title: 'Business',
    description: 'The sanctuary economy — how value circulates and dignity is guaranteed',
    icon: Briefcase,
    color: 'emerald',
    pages: [
      {
        title: 'Business Plan',
        path: '/forge/business/plan',
        description: 'A new economy where value circulates and dignity is guaranteed',
        icon: Map,
        badge: 'Vision',
        badgeColor: 'emerald',
      },
      {
        title: 'Financial Ecosystem',
        path: '/forge/business/ecosystem',
        description: 'Granular, transparent, designed for dignity — see how value flows',
        icon: DollarSign,
        badge: 'Transparency',
        badgeColor: 'cyan',
      },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    description: 'Paths to participation and sovereignty within the sanctuary',
    icon: Compass,
    color: 'purple',
    pages: [
      {
        title: 'Artisan Onboarding',
        path: '/forge/guides/artisan-onboarding',
        description: 'Share your gifts with the sanctuary and earn residuals forever',
        icon: Feather,
        badge: 'Create',
        badgeColor: 'purple',
      },
      {
        title: 'Merchant Onboarding',
        path: '/forge/guides/merchant-onboarding',
        description: 'Help artisans reach their audience through ethical services',
        icon: Truck,
        badge: 'Support',
        badgeColor: 'cyan',
      },
      {
        title: 'Neurodivergent UX',
        path: '/forge/guides/neurodivergent-ux',
        description: 'Our design philosophy — built by and for all minds',
        icon: Brain,
        badge: 'Accessibility',
        badgeColor: 'pink',
      },
    ],
  },
  {
    id: 'sanctuary',
    title: 'Sanctuary',
    description: 'The living documents of our sovereign home',
    icon: BookOpen,
    color: 'amber',
    pages: [
      {
        title: 'The Origin',
        path: '/about',
        description: 'The story of a sanctuary born from survival and collaboration',
        icon: Star,
        badge: 'Story',
        badgeColor: 'amber',
      },
      {
        title: 'The Prophecy',
        path: '/observatory/prophecy',
        description: 'A glimpse of what is coming — our vision for the future',
        icon: Eye,
        badge: 'Vision',
        badgeColor: 'purple',
      },
      {
        title: 'The Ledger',
        path: '/council/ledger',
        description: 'Every transaction visible. Every decision transparent.',
        icon: ScrollText,
        badge: 'Transparency',
        badgeColor: 'cyan',
      },
      {
        title: 'The Covenant',
        path: '/privacy',
        description: 'Your data is yours. Always.',
        icon: Lock,
        badge: 'Privacy',
        badgeColor: 'emerald',
      },
      {
        title: 'The Agreement',
        path: '/terms',
        description: 'Terms of service and community guidelines',
        icon: FileText,
        badge: 'Terms',
        badgeColor: 'cyan',
      },
      {
        title: 'The Welcome',
        path: '/accessibility',
        description: 'Everyone belongs here — our accessibility commitment',
        icon: Accessibility,
        badge: 'Access',
        badgeColor: 'pink',
      },
      {
        title: 'The Hearth Call',
        path: '/contact',
        description: 'We are here for you — reach out anytime',
        icon: Mail,
        badge: 'Contact',
        badgeColor: 'purple',
      },
      {
        title: 'The Scroll',
        path: '/press',
        description: 'Resources for media and storytellers',
        icon: Globe,
        badge: 'Press',
        badgeColor: 'cyan',
      },
      // '/careers' → '/calling' 2026-08-24, the truth pass. This component
      // is imported nowhere and renders to no one today, so the stale card
      // was latent rather than live — trued anyway, so it cannot come back
      // wrong the day something mounts it. KP's ⚛ ruling stands behind it:
      // "we have no company" · "no 'careers'" · "just us".
      {
        title: 'The Calling',
        path: '/calling',
        description: 'No company, no careers — just us, and the community that arrives',
        icon: Users,
        badge: 'Invitation',
        badgeColor: 'emerald',
      },
      // 'The Offering' → /donate — RETIRED 2026-08-24 at KP's ⚛ word,
      // verbatim, spacing kept: "retire the donate and create subscription
      // tiers for me rather than the platform, and  i will still have my
      // covenant set to 50%. the donations tab was before we had a built
      // sanctuary and had different outlooks." This component is imported
      // nowhere and renders to no one today, so the card was latent rather
      // than live — removed anyway, so it cannot come back wrong the day
      // something mounts it. The tiers are the Bazaar's spec.
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// POSITION CONFIG — Distributed across the 360° background with depth
// ═══════════════════════════════════════════════════════════════════════════

const crystalPositions = [
  { x: 22, y: 28, depth: 'near' as const, delay: 0 },
  { x: 58, y: 22, depth: 'mid' as const, delay: 0.15 },
  { x: 40, y: 55, depth: 'far' as const, delay: 0.3 },
  { x: 72, y: 50, depth: 'mid' as const, delay: 0.45 },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function DocsConstellation() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-screen">
      {/* Ambient overlay — subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-space/40 pointer-events-none" />

      {/* Crystals */}
      <AnimatePresence>
        {docCategories.map((category, index) => {
          const position = crystalPositions[index];
          return (
            <DocCategoryCrystal
              key={category.id}
              category={category}
              position={{ x: position.x, y: position.y }}
              depth={position.depth}
              delay={position.delay}
              isExpanded={expandedId === category.id}
              onActivate={(cat) => setExpandedId(cat.id)}
              onClose={() => setExpandedId(null)}
            />
          );
        })}
      </AnimatePresence>

      {/* Hint text — fades after first interaction */}
      {expandedId === null && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-star-dust/40 text-sm">
            Click a crystal to explore
          </p>
        </div>
      )}
    </div>
  );
}