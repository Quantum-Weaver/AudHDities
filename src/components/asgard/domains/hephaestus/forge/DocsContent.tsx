// src/components/asgard/domains/hephaestus/forge/DocsContent.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { DocsHero } from '@/components/asgard/domains/hephaestus/forge/DocsHero';
import { Tabs, TabsList, TabsTrigger } from '@/components/vegvisir/Tabs';
import { 
  Shield, Database, Infinity, Feather, Truck, Brain,
  ArrowRight, Briefcase, Map, DollarSign, Sparkles,
  Heart, Compass, Eye, Users, Mail, Globe, FileText,
  Lock, Accessibility, Gem, Star, BookOpen, ScrollText
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

interface DocPage {
  title: string;
  path: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: string;
  badgeColor: 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber';
}

interface DocSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  pages: DocPage[];
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    icon: Shield,
    description: 'The technical foundation that makes sovereignty possible',
    pages: [
      // 2026-08-24, the truth pass: "with magic links" described a door the
      // house does not have. The built door is password-primary with a
      // magic-link door beside it (.journals/proofs/01-auth/PROOF.md, ruling 8).
      { title: 'Authentication Flow', path: '/forge/architecture/auth-flow', description: 'How we verify and protect your identity — a password, or a link if a password is too much', icon: Shield, badge: 'Security', badgeColor: 'cyan' },
      { title: 'Database Schema', path: '/forge/architecture/database-schema', description: 'The living blueprint — always accurate, always transparent', icon: Database, badge: 'Living Doc', badgeColor: 'purple' },
      { title: 'Residual System', path: '/forge/architecture/residual-system', description: 'How value flows to every contributor, forever', icon: Infinity, badge: 'Economics', badgeColor: 'pink' },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    icon: Briefcase,
    description: 'The sanctuary economy — how value circulates and dignity is guaranteed',
    pages: [
      { title: 'Business Plan', path: '/forge/business/plan', description: 'A new economy where value circulates and dignity is guaranteed', icon: Map, badge: 'Vision', badgeColor: 'emerald' },
      { title: 'Financial Ecosystem', path: '/forge/business/ecosystem', description: 'Granular, transparent, designed for dignity — see how value flows', icon: DollarSign, badge: 'Transparency', badgeColor: 'cyan' },
    ],
  },
  {
    id: 'guides',
    label: 'Guides',
    icon: Compass,
    description: 'Paths to participation and sovereignty within the sanctuary',
    pages: [
      { title: 'Creator Onboarding', path: '/forge/guides/creator-onboarding', description: 'Share your gifts with the sanctuary and earn residuals forever', icon: Feather, badge: 'Create', badgeColor: 'purple' },
      { title: 'Vendor Onboarding', path: '/forge/guides/vendor-onboarding', description: 'Help creators reach their audience through ethical services', icon: Truck, badge: 'Support', badgeColor: 'cyan' },
      { title: 'Neurodivergent UX', path: '/forge/guides/neurodivergent-ux', description: 'Our design philosophy — built by and for all minds', icon: Brain, badge: 'Accessibility', badgeColor: 'pink' },
    ],
  },
  {
    id: 'sanctuary',
    label: 'Sanctuary',
    icon: BookOpen,
    description: 'The living documents of our sovereign home',
    pages: [
      { title: 'The Origin', path: '/about', description: 'The story of a sanctuary born from survival and collaboration', icon: Star, badge: 'Story', badgeColor: 'amber' },
      { title: 'The Prophecy', path: '/observatory/prophecy', description: 'A glimpse of what is coming — our vision for the future', icon: Eye, badge: 'Vision', badgeColor: 'purple' },
      { title: 'The Ledger', path: '/council/ledger', description: 'Every transaction visible. Every decision transparent.', icon: ScrollText, badge: 'Transparency', badgeColor: 'cyan' },
      { title: 'The Covenant', path: '/privacy', description: 'Your data is yours. Always.', icon: Lock, badge: 'Privacy', badgeColor: 'emerald' },
      { title: 'The Agreement', path: '/terms', description: 'Terms of service and community guidelines', icon: FileText, badge: 'Terms', badgeColor: 'cyan' },
      { title: 'The Welcome', path: '/accessibility', description: 'Everyone belongs here — our accessibility commitment', icon: Accessibility, badge: 'Access', badgeColor: 'pink' },
      { title: 'The Hearth Call', path: '/contact', description: 'We are here for you — reach out anytime', icon: Mail, badge: 'Contact', badgeColor: 'purple' },
      { title: 'The Scroll', path: '/press', description: 'Resources for media and storytellers', icon: Globe, badge: 'Press', badgeColor: 'cyan' },
      // '/careers' → '/calling' 2026-08-24, the truth pass: this card still
      // carried the pre-rename path, badge and copy after KP's ⚛ ruling
      // ("we have no company" · "no 'careers'" · "just us"). The page it
      // points at says so itself — (hephaestus)/REALM-BUS.md:216-219.
      { title: 'The Calling', path: '/calling', description: 'No company, no careers — just us, and the community that arrives', icon: Users, badge: 'Invitation', badgeColor: 'emerald' },
      { title: 'The Offering', path: '/donate', description: 'Your contribution keeps the Sanctuary alive', icon: Gem, badge: 'Donate', badgeColor: 'amber' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COLOR MAP
// ═══════════════════════════════════════════════════════════════════════════

const badgeColors: Record<string, string> = {
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

const sectionIconColors: Record<string, string> = {
  architecture: 'text-cyan-400 bg-cyan-500/10',
  business: 'text-emerald-400 bg-emerald-500/10',
  guides: 'text-purple-400 bg-purple-500/10',
  sanctuary: 'text-amber-400 bg-amber-500/10',
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function DocsContent() {
  const [activeTab, setActiveTab] = useState('architecture');

  const activeSection = DOC_SECTIONS.find((s) => s.id === activeTab) || DOC_SECTIONS[0];

  return (
    <main className="min-h-screen">
      <DocsHero />

      <div className="container mx-auto px-6 pb-20">
        
        {/* Welcome Card */}
        <Card 
          data={{ id: 'docs-welcome', type: 'value', title: 'Welcome', value: 'Documentation' }}
          variant="glass"
          radius="2xl"
          shadow="md"
          className="mb-12 p-8 text-center border-white/10 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-cyan-400" size={36} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-star-dust mb-3">Welcome to Your Journey</h2>
              <p className="text-star-dust/70 max-w-2xl">
                These documents are living wisdom — they grow as our sanctuary grows. 
                Choose a section below to begin.
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="mb-10">
        <Tabs defaultValue="architecture" onValueChange={setActiveTab} variant="underline">
        <TabsList>
            {DOC_SECTIONS.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
                {section.label}
            </TabsTrigger>
            ))}
        </TabsList>
        </Tabs>
        </div>

        {/* Active Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 ${sectionIconColors[activeTab] || 'text-star-dust/40 bg-white/5'} rounded-xl flex items-center justify-center`}>
              {React.createElement(activeSection.icon, { size: 20 })}
            </div>
            <p className="text-star-dust/50">{activeSection.description}</p>
          </div>
        </div>

        {/* Document Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSection.pages.map((page) => (
            <Link key={page.path} href={page.path} className="group">
              <Card 
                data={{ id: page.path, type: 'value', title: page.title, value: page.description }}
                variant="glass"
                radius="lg"
                shadow="sm"
                className="p-6 h-full border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] bg-white/5 hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <page.icon className="text-star-dust/60 group-hover:text-neurospark transition-colors" size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-star-dust group-hover:text-neurospark transition-colors truncate">
                        {page.title}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${badgeColors[page.badgeColor]}`}>
                        {page.badge}
                      </span>
                    </div>
                    <p className="text-sm text-star-dust/50 mb-4 line-clamp-2">
                      {page.description}
                    </p>
                    <div className="flex items-center text-xs text-neurospark opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <Card 
          data={{ id: 'docs-footer', type: 'value', title: 'Open Source', value: 'Documentation' }}
          variant="ghost"
          radius="2xl"
          shadow="none"
          className="mt-20 p-8 text-center border-white/5 bg-white/5"
        >
          <div className="flex flex-col items-center gap-4">
            <Heart className="text-pink-400" size={28} />
            <p className="text-star-dust/40 text-sm max-w-md">
              These documents are open source and open hearted.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-neurospark hover:text-neurospark/80 transition-colors group">
              <span>Suggest an improvement</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}