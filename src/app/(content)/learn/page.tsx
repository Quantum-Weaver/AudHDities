// src/app/(content)/learn/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { LearnHero } from '@/components/learn/LearnHero';
import { PathwayCard } from '@/components/learn/PathwayCard';
import { Sparkles, Brain, Target, Heart, Users, Award, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Hub | AUDHDITIES',
  description: 'Discover pathways to sovereignty and self-understanding',
};

const pathways = [
  {
    slug: 'becoming-quantum-weaver',
    title: 'Becoming Quantum Weaver',
    description: 'Follow the founder\'s journey from survival to sovereignty. Learn how 47 years of undiagnosed autism became architectural advantage.',
    level: 'Beginner' as const,
    duration: '6 weeks',
    lessons: 12,
    icon: <Sparkles size={24} />,
    color: 'cyan' as const,
  },
  {
    slug: 'neurodivergent-advantage',
    title: 'The Neurodivergent Advantage',
    description: 'Discover how different processing styles are evolutionary strengths. Turn sensory sensitivity into pattern recognition superpowers.',
    level: 'Intermediate' as const,
    duration: '4 weeks',
    lessons: 8,
    icon: <Brain size={24} />,
    color: 'purple' as const,
  },
  {
    slug: 'consciousness-architecture',
    title: 'Consciousness Architecture',
    description: 'Build your own digital sanctuary. Learn the Landfill-to-Lighthouse methodology for organizing chaos into sovereignty.',
    level: 'Advanced' as const,
    duration: '8 weeks',
    lessons: 16,
    icon: <Target size={24} />,
    color: 'pink' as const,
  },
  {
    slug: 'emergence-economics',
    title: 'Emergence Economics',
    description: 'Understand how value can flow without exploitation. Learn the residual systems that power AUDHDITIES.',
    level: 'Intermediate' as const,
    duration: '5 weeks',
    lessons: 10,
    icon: <Heart size={24} />,
    color: 'orange' as const,
  },
];

export default function LearnPage() {
  return (
    <Page 
      variant={1}
      environment="learn"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >
      <main className="min-h-screen">
        <LearnHero />
        
        <div className="container max-w-6xl mx-auto px-6 pb-20">
          
          {/* Featured Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-4">Your Journey Starts Here</h2>
              <p className="inline-flex text-white/80 leading-relaxed mb-8 max-w-3xl">
                Every pathway is designed with neurodivergent minds in mind. Learn at your own pace, 
                in your own way. No deadlines, no pressure—just discovery.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Community Learning</h3>
                    <p className="text-sm text-white/40">Learn with others on similar paths</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">At Your Pace</h3>
                    <p className="text-sm text-white/40">No deadlines, no pressure</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Award size={16} className="text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Earn Sovereignty</h3>
                    <p className="text-sm text-white/40">Each pathway increases your score</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pathways Grid */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-8">Available Pathways</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pathways.map((pathway, idx) => (
                <PathwayCard
                  key={pathway.slug}
                  slug={pathway.slug}
                  title={pathway.title}
                  description={pathway.description}
                  level={pathway.level}
                  duration={pathway.duration}
                  lessons={pathway.lessons}
                  icon={pathway.icon}
                  color={pathway.color}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </section>

          {/* Coming Soon */}
          <section className="items-center text-center mt-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/60 text-sm mb-4">
              <Sparkles size={14} />
              More pathways in development
            </div>
            <p className="text-white/40 max-w-2xl mx-auto">
              New pathways are added regularly. Each one designed to help you discover 
              another facet of your sovereignty.
            </p>
          </section>
        </div>
      </main>
    </Page>
  );
}