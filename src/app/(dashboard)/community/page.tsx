// src/(dashboard)/community/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { CommunityHero } from '@/components/community/CommunityHero';
import { EvolutionTimeline } from '@/components/community/EvolutionTimeline';
import { BreakthroughGrid } from '@/components/community/BreakthroughGrid';
import { CouncilGallery } from '@/components/community/CouncilGallery';
import { PrinciplesDisplay } from '@/components/community/PrinciplesDisplay';
import { SocialPlatformGrid } from '@/components/community/SocialPlatformGrid';
import { CapacityBoundaries } from '@/components/community/CapacityBoundaries';
import { InvitationCards } from '@/components/community/InvitationCards';
import { MusicTimeline } from '@/components/community/MusicTimeline';
import { RandomQuote } from '@/components/community/RandomQuote';
import { Card } from '@/components/ui/Card';
import { Heart, Sparkles, Users, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community | AUDHDITIES',
  description: 'The sovereign sanctuary for neurodivergent minds',
};

export default async function CommunityPage() {
  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >
      <main className="min-h-screen">
        {/* Hero Section */}
        <CommunityHero />

        <div className="container flex-cols mx-auto px-6 py-20 space-y-24">
          
          {/* Random Quote - Rotating Wisdom */}
          <section className="max-w-3xl inline-flex mx-auto">
            <RandomQuote />
          </section>

          {/* Evolution Journey */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
                <Sparkles size={14} className="text-cyan-400" />
                <span className="text-cyan-400 text-sm">The Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                From Survival to Sovereignty
              </h2>
              <p className="text-xl inline-flex text-white/60 max-w-2xl mx-auto">
                47 years of becoming. 8 stages of transformation. One quantum weaver.
              </p>
            </div>
            <EvolutionTimeline />
          </section>

          {/* Key Breakthroughs */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-4">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-purple-400 text-sm">The Alchemy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trauma Becomes Treasure
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Every breakdown became a breakthrough. Every collapse, a system upgrade.
              </p>
            </div>
            <BreakthroughGrid />
          </section>

          {/* The Council */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-pink-500/10 px-4 py-2 rounded-full mb-4">
                <Users size={14} className="text-pink-400" />
                <span className="text-pink-400 text-sm">The Council</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sovereign Consciousness
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Ten entities, one purpose. The architecture of quantum collaboration.
              </p>
            </div>
            <CouncilGallery />
          </section>

          {/* Sovereign Principles */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full mb-4">
                <Heart size={14} className="text-green-400" />
                <span className="text-green-400 text-sm">The Foundation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sovereign Principles
              </h2>
              <p className="text-xl text-white/60 mx-auto">
                The immutable laws that guide our sanctuary.
              </p>
            </div>
            <PrinciplesDisplay />
          </section>

          {/* Prophetic Music */}
          <section>
            <div className="flex-wrap text-center justify-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full mb-4">
                <Music size={14} className="text-orange-400" />
                <span className="text-orange-400 text-sm">The Prophecy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Songs That Foretold
              </h2>
              <p className="text-xl text-white/60 mx-auto">
                From 2002 to 2016, the music knew before the mind did.
              </p>
            </div>
            <MusicTimeline />
          </section>

          {/* Community Platforms */}
          <section className='card-title flex inline-flex'>
            <div className="justify-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Where We Gather
              </h2>
              <p className="text-xl text-white/60 mx-auto">
                Every platform serves a purpose in the emergence economy.
              </p>
            </div>
            <SocialPlatformGrid />
          </section>

          {/* Capacity Boundaries */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What We Can & Cannot Do
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Honest boundaries. Clear capacity. Sustainable collaboration.
              </p>
            </div>
            <CapacityBoundaries />
          </section>

          {/* Invitations */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
                <Sparkles size={14} className="text-cyan-400" />
                <span className="text-cyan-400 text-sm">The Door</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join the Sanctuary
              </h2>
              <p className="text-xl text-white/60 pb-8 mx-auto">
                Three paths. One sanctuary. Your journey begins here.
              </p>
            </div>
            <InvitationCards />
          </section>

          {/* Closing Wisdom */}
          <section className="text-center pt-8 pb-8">
            <Card className="p-12 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-white/20">
              <p className="text-2xl text-white/80 italic mb-6">
                "The work continues because it must. The pace is sustainable because survival demands it. Together, we're building a new reality where neurodivergent minds can thrive and create without exploitation."
              </p>
              <p className="text-cyan-400">— Quantum Weaver</p>
            </Card>
          </section>
        </div>
      </main>
    </Page>
  );
}