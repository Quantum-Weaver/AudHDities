import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Users, Target, Award, ArrowRight, Sparkles, Brain, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Hub | AUDHDITIES',
  description: 'Discover pathways to sovereignty and self-understanding',
};

// Mock data - replace with database queries later
const pathways = [
  {
    slug: 'becoming-quantum-weaver',
    title: 'Becoming Quantum Weaver',
    description: 'Follow the founder\'s journey from survival to sovereignty. Learn how 47 years of undiagnosed autism became architectural advantage.',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 12,
    icon: 'sparkles',
    color: 'cyan',
    href: '/learn/pathways/becoming-quantum-weaver',
  },
  {
    slug: 'neurodivergent-advantage',
    title: 'The Neurodivergent Advantage',
    description: 'Discover how different processing styles are evolutionary strengths. Turn sensory sensitivity into pattern recognition superpowers.',
    level: 'Intermediate',
    duration: '4 weeks',
    lessons: 8,
    icon: 'brain',
    color: 'purple',
    href: '/learn/pathways/neurodivergent-advantage',
  },
  {
    slug: 'consciousness-architecture',
    title: 'Consciousness Architecture',
    description: 'Build your own digital sanctuary. Learn the Landfill-to-Lighthouse methodology for organizing chaos into sovereignty.',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 16,
    icon: 'target',
    color: 'pink',
    href: '/learn/pathways/consciousness-architecture',
  },
  {
    slug: 'emergence-economics',
    title: 'Emergence Economics',
    description: 'Understand how value can flow without exploitation. Learn the residual systems that power AUDHDITIES.',
    level: 'Intermediate',
    duration: '5 weeks',
    lessons: 10,
    icon: 'heart',
    color: 'orange',
    href: '/learn/pathways/emergence-economics',
  },
];

const iconMap: Record<string, any> = {
  sparkles: Sparkles,
  brain: Brain,
  target: Target,
  heart: Heart,
};

const colorMap: Record<string, string> = {
  cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
  pink: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-400',
  orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400',
};

export default function LearnPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <BookOpen className="inline-block text-cyan-400 mb-4" size={48} />
        </div>

        {/* Featured Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 border border-white/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">Your Journey Starts Here</h2>
            <p className="text-white/80 leading-relaxed mb-8 max-w-3xl">
              Every pathway is designed with neurodivergent minds in mind. Learn at your own pace, in your own way. No deadlines, no pressure—just discovery.
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
                  <Target size={16} className="text-purple-400" />
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
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">Available Pathways</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pathways.map((pathway) => {
              const Icon = iconMap[pathway.icon];
              const colors = colorMap[pathway.color];
              
              return (
                <Link
                  key={pathway.slug}
                  href={pathway.href}
                  className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors} flex items-center justify-center`}>
                      <Icon size={24} className={pathway.color === 'cyan' ? 'text-cyan-400' : 
                                                     pathway.color === 'purple' ? 'text-purple-400' :
                                                     pathway.color === 'pink' ? 'text-pink-400' :
                                                     'text-orange-400'} />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/40">
                        {pathway.level}
                      </span>
                      <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/40">
                        {pathway.duration}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {pathway.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-4">
                    {pathway.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      {pathway.lessons} lessons
                    </span>
                    <span className="text-cyan-400 text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Start Journey <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/60 text-sm mb-4">
            <Sparkles size={14} />
            More pathways in development
          </div>
          <p className="text-white/40 max-w-2xl mx-auto">
            New pathways are added regularly. Each one designed to help you discover another facet of your sovereignty.
          </p>
        </section>
      </div>
    </main>
  );
}
