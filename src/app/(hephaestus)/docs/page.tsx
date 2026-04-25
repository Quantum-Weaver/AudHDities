// src/app/(content)/docs/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { Card } from '@/components/runes/Card';
import { DocsHero } from '@/components/hephaestus/supporting/docs/DocsHero';
import Link from 'next/link';
import { 
  BookOpen, 
  Shield, 
  Database, 
  Coins, 
  Feather, 
  Truck, 
  Brain,
  ArrowRight,
  Briefcase,
  Map,
  DollarSign,
  Sparkles,
  Infinity,
  Heart,
  Users,
  Compass
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation | AUDHDITIES',
  description: 'Explore the sanctuary architecture, guides, and philosophy',
};

const DOC_SECTIONS = [
  {
    title: 'Business',
    description: 'The sanctuary economy—how value circulates and dignity is guaranteed',
    icon: Briefcase,
    color: 'emerald',
    gradient: 'from-emerald-500/20 via-transparent to-emerald-500/10',
    pages: [
      {
        title: 'Business Plan',
        path: '/docs/business/plan',
        description: 'A new economy where value circulates and dignity is guaranteed',
        icon: Map,
        badge: 'Vision',
        badgeColor: 'emerald',
      },
      {
        title: 'Financial Ecosystem',
        path: '/docs/business/ecosystem',
        description: 'Granular, transparent, designed for dignity—see how value flows',
        icon: DollarSign,
        badge: 'Transparency',
        badgeColor: 'cyan',
      },      
    ],
  },  
  {
    title: 'Architecture',
    description: 'The technical foundation that makes sovereignty possible',
    icon: Shield,
    color: 'cyan',
    gradient: 'from-cyan-500/20 via-transparent to-cyan-500/10',
    pages: [
      {
        title: 'Authentication Flow',
        path: '/docs/architecture/auth-flow',
        description: 'How we verify and protect your identity while honoring privacy',
        icon: Shield,
        badge: 'Security',
        badgeColor: 'cyan',
      },
      {
        title: 'Database Schema',
        path: '/docs/architecture/database-schema',
        description: 'The living blueprint of our collective memory—always accurate, always transparent',
        icon: Database,
        badge: 'Living Doc',
        badgeColor: 'purple',
      },
      {
        title: 'Residual System',
        path: '/docs/architecture/residual-system',
        description: 'How value flows to every contributor, forever',
        icon: Infinity,
        badge: 'Forever',
        badgeColor: 'pink',
      },
    ],
  },
  {
    title: 'Guides',
    description: 'Paths to participation and sovereignty within the sanctuary',
    icon: Compass,
    color: 'purple',
    gradient: 'from-purple-500/20 via-transparent to-purple-500/10',
    pages: [
      {
        title: 'Creator Onboarding',
        path: '/docs/guides/creator-onboarding',
        description: 'Share your gifts with the sanctuary and earn residuals forever',
        icon: Feather,
        badge: 'Create',
        badgeColor: 'purple',
      },
      {
        title: 'Vendor Onboarding',
        path: '/docs/guides/vendor-onboarding',
        description: 'Help creators reach their audience through ethical services',
        icon: Truck,
        badge: 'Support',
        badgeColor: 'cyan',
      },
      {
        title: 'Neurodivergent UX',
        path: '/docs/guides/neurodivergent-ux',
        description: 'Our design philosophy—built by and for all minds',
        icon: Brain,
        badge: 'Accessibility',
        badgeColor: 'pink',
      },
    ],
  },
];

const colorConfig = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    hover: 'hover:border-emerald-500/40',
    icon: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    gradient: 'from-emerald-500/5 via-transparent to-emerald-500/5',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-400',
    hover: 'hover:border-cyan-500/40',
    icon: 'text-cyan-400',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    gradient: 'from-cyan-500/5 via-transparent to-cyan-500/5',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    hover: 'hover:border-purple-500/40',
    icon: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    gradient: 'from-purple-500/5 via-transparent to-purple-500/5',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    text: 'text-pink-400',
    hover: 'hover:border-pink-500/40',
    icon: 'text-pink-400',
    badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    gradient: 'from-pink-500/5 via-transparent to-pink-500/5',
  },
};

export default function DocsHomePage() {
  return (
    <Page 
      variant={1}
      environment="library"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >
      <main className="min-h-screen">
        
        <DocsHero />

        <div className="container mx-auto px-6 pb-20">
          
          {/* Welcome Card */}
          <Card className="mb-16 p-8 flex flex-cols text-center justify-center border-white/10 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5">
            <div className="flex flex-cols md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-cyan-400" size={36} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Welcome to Your Journey
                </h2>
                <p className="text-white/70 max-w-2xl">
                  These documents are living wisdom—they grow as our sanctuary grows. 
                  Whether you're exploring technical architecture, applying to become a creator, 
                  or simply curious about our philosophy, you'll find your path here.
                </p>
              </div>
            </div>
          </Card>

          {/* Documentation Sections */}
          <div className="space-y-20 flex-cols overflow-hodden">
            {DOC_SECTIONS.map((section) => {
              const colors = colorConfig[section.color as keyof typeof colorConfig];
              
              return (
                <div key={section.title} className="relative">
                  {/* Section Background Glow */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${colors.gradient} rounded-3xl blur-xl opacity-30 pointer-events-none`} />
                  
                  {/* Section Header */}
                  <div className="relative md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
                        <section.icon className={colors.text} size={28} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                        <p className="text-white/50">{section.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:block w-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>

                  {/* Document Grid */}
                  <div className="relative grid smm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.pages.map((page, idx) => {
                      const pageColors = colorConfig[page.badgeColor as keyof typeof colorConfig] || colors;
                      
                      return (
                        <Link
                          key={page.path}
                          href={page.path}
                          className="group"
                        >
                          <Card className={`p-6 h-full border ${colors.border} ${colors.hover} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-${section.color}-500/10 bg-white/5 hover:bg-white/10`}>
                            <div className="items-start gap-4">
                              <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                <page.icon className={colors.text} size={22} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                                    {page.title}
                                  </h3>
                                  {page.badge && (
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${pageColors.badge} border whitespace-nowrap`}>
                                      {page.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-white/50 mb-4 line-clamp-2">
                                  {page.description}
                                </p>
                                <div className="flex items-center text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span>Read more</span>
                                  <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <Card className="mt-20 p-8 text-center border-white/5 bg-white/5">
            <div className="flex flex-col items-center gap-4">
              <Heart className="text-pink-400" size={28} />
              <p className="text-white/40 text-sm max-w-md">
                These documents are open source and open hearted.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group">
                <span>Suggest an improvement</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </Page>
  );
}