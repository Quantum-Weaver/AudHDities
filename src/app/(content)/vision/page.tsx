import { Metadata } from 'next';
import Link from 'next/link';
import { Eye, DollarSign, Heart, Shield, Target, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vision | AUDHDITIES',
  description: 'Our vision for a sovereign, neurodivergent-first economy',
};

export default function VisionPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Eye className="inline-block text-cyan-400 mb-4" size={48} />
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            We are building the last thing capitalism faces: a sovereign economy where value flows to humans, not extractors.
          </h3>          
        </div>

        {/* Core Vision */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 border border-white/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6">A World Without Exploitation</h2>
            
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Imagine an internet where every click you make, every moment of attention you give, every piece of data you create—is <span className="text-cyan-400 font-semibold">yours</span>. And when that data has value, that value flows back to you.
              </p>
              <p>
                Imagine a marketplace where creators keep 70-90% of what they earn, where contributors get paid forever for their work, and where the platform takes only what it needs to sustain itself—transparently, publicly, verifiably.
              </p>
              <p>
                Imagine a community where neurodivergence isn't a disorder to be masked, but an evolutionary advantage to be celebrated. Where different processing styles are accommodated by default, not as an afterthought.
              </p>
              <p>
                <span className="text-purple-400 font-bold">That is AUDHDITIES.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">The Four Pillars</h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <DollarSign className="text-cyan-400" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Emergence Economics</h3>
                <p className="text-white/60">
                  Value is not extracted—it emerges. When a product sells, everyone who contributed gets paid. Forever. The platform takes a transparent cut, and all transactions are public.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Heart className="text-purple-400" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Neurodivergent Advantage</h3>
                <p className="text-white/60">
                  The platform is designed by neurodivergent minds, for neurodivergent minds. Focus modes, visual timers, TL;DR summaries, and sensory preferences are features, not bugs.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Shield className="text-pink-400" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Data Sovereignty</h3>
                <p className="text-white/60">
                  You own your data. Period. If advertisers want your attention, they pay you. If researchers want your patterns, they compensate you. Opt-in, transparent, and fair.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Globe className="text-orange-400" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Radical Transparency</h3>
                <p className="text-white/60">
                  Every dollar that moves through the platform is visible in a public ledger. Every admin action is logged. Every decision is documented. Trust is built, not assumed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Bigot Tax™ */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-pink-500/10 via-transparent to-orange-500/10 border border-white/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">The Bigot Tax™</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If an advertiser or organization promotes hate, oppression, or exploitation, they don't get banned—they get taxed. A higher price for their ads, with the proceeds funding community programs, mental health support, and neurodivergent advocacy.
            </p>
            <p className="text-white/80 leading-relaxed">
              We believe in redemption, not cancellation. But redemption has a price.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <p className="text-white/60 max-w-2xl mx-auto">
            This is not a utopian fantasy. It's a working system, built in public, by one human and one AI, funded by your support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-colors"
            >
              Join the Sanctuary
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
