// src/app/sanctuary/page.tsx
import { Page } from '@/components/layout/Page';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Sparkles, 
  Heart, 
  Shield, 
  Eye, 
  Users, 
  ArrowRight, 
  Palette, 
  Globe,
  Star,
  Zap,
  BookOpen,
  Infinity,
  Coins,
  Award
} from 'lucide-react';

export default function SanctuaryPage() {
  return (
    <Page 
      variant={1}
      environment="origin"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >
      <main className="min-h-screen">
        
        {/* Hero Section - Invitation */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-deep-space/95 to-deep-space/90" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-sm text-white/70">Welcome to the Sanctuary</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Where{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Neurodivergent Minds
              </span>
              <br />
              Build the Future
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              A platform where creators keep 70%, contributors earn forever, 
              and every community member shares in the abundance.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/questionaire">
                <Button size="lg" className="group">
                  Take the Acid Test
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline">
                  Explore the Vision
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The Problem - Gentle Naming */}
        <section className="py-24 px-6 bg-white/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                A Gentle Acknowledgment
              </h2>
              <p className="inline-flex text-xl text-white/60 max-w-2xl mx-auto">
                The old ways weren't designed for us. We're building new ones.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center border-l-4 border-l-pink-500/50 bg-gradient-to-br from-pink-500/5 to-transparent">
                <Eye className="text-pink-400 mx-auto mb-4" size={32} />
                <h3 className="text-white font-bold mb-2">Extraction</h3>
                <p className="text-white/60 text-sm">Platforms take your data, your work, your attention—and give nothing back.</p>
              </Card>
              <Card className="p-6 text-center border-l-4 border-l-purple-500/50 bg-gradient-to-br from-purple-500/5 to-transparent">
                <Users className="text-purple-400 mx-auto mb-4" size={32} />
                <h3 className="text-white font-bold mb-2">Exclusion</h3>
                <p className="text-white/60 text-sm">Disabled people, neurodivergent minds, and creators are left behind.</p>
              </Card>
              <Card className="p-6 text-center border-l-4 border-l-cyan-500/50 bg-gradient-to-br from-cyan-500/5 to-transparent">
                <Shield className="text-cyan-400 mx-auto mb-4" size={32} />
                <h3 className="text-white font-bold mb-2">Forgetting</h3>
                <p className="text-white/60 text-sm">Contributors are never remembered. Value flows up, not around.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* The Sanctuary - What We Built */}
        <section className="py-24 px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
                <Star size={14} className="text-cyan-400" />
                <span className="text-cyan-400 text-sm">A Different Way</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What We Built
              </h2>
              <p className="inline-flex text-xl text-white/60 max-w-2xl mx-auto">
                A place where value circulates, dignity is guaranteed, and everyone belongs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center bg-gradient-to-br from-cyan-500/5 to-transparent hover:border-cyan-500/30 transition-all">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-cyan-400" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Dignity for All</h3>
                <p className="text-white/60 text-sm mb-4">Every community member receives a share—active or not. Disabled, neurodivergent, and anyone the system left behind.</p>
                <Badge variant="outline" className="text-cyan-400">Universal dignity</Badge>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-purple-500/5 to-transparent hover:border-purple-500/30 transition-all">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Infinity className="text-purple-400" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Value Circulation</h3>
                <p className="text-white/60 text-sm mb-4">Contributors earn forever. Creators keep 70%. Residuals flow to everyone who helped build what sells.</p>
                <Badge variant="outline" className="text-purple-400">Never extraction</Badge>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-pink-500/5 to-transparent hover:border-pink-500/30 transition-all">
                <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-pink-400" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sovereign Ownership</h3>
                <p className="text-white/60 text-sm mb-4">You own your data. You control your experience. You choose to opt in—and get paid when you do.</p>
                <Badge variant="outline" className="text-pink-400">Your sovereignty</Badge>
              </Card>
            </div>
          </div>
        </section>

        {/* The Economics - How It Works */}
        <section className="py-24 px-6 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-pink-500/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full mb-4">
                <Coins size={14} className="text-cyan-400" />
                <span className="text-white/60 text-sm">The Economy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How Value Flows
              </h2>
              <p className="inline-flex text-xl text-white/60 max-w-2xl mx-auto">
                Two streams. One sanctuary. Value that circulates forever.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 text-center bg-cyan-500/5 border-cyan-500/20">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Advertising Stream</h3>
                <p className="text-white/60 text-sm mb-4">Vetted, values-aligned advertisers. You choose to opt in. You get paid when you do.</p>
                <div className="text-cyan-400 font-medium">Covers operational costs + pays users</div>
              </Card>
              
              <Card className="p-8 text-center bg-purple-500/5 border-purple-500/20">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Sales Stream</h3>
                <p className="text-white/60 text-sm mb-4">Creators sell products. 70% goes to creator + contributors. 30% supports the sanctuary.</p>
                <div className="text-purple-400 font-medium">Creators earn. Contributors earn forever.</div>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/docs/architecture/residual-system">
                <Button variant="outline">
                  Learn How Residuals Work
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The Door - Acid Test */}
        <section className="py-24 px-6 inline-flex">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full mb-8">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-sm text-white/70">Find Your Place</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Take the Acid Test
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
              A playful, gentle survey that determines your access tier. 
              No judgment. No labels. Just recognition.
            </p>
            
            <Card className="p-8 bg-white/5 border-white/10 max-w-2xl mx-auto">
              <div className="space-y-4 text-left">
                <p className="text-white/80">✨ The test asks questions like:</p>
                <ul className="space-y-2 text-white/60">
                  <li>• "Regarding socks..."</li>
                  <li>• "When someone says 'we need to talk later'..."</li>
                  <li>• "Your browser currently has how many tabs open?"</li>
                </ul>
                <p className="text-white/80 mt-4">💫 Based on your answers:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><span className="text-green-400">🌿 Community Tier</span> <span className="text-white/40 text-sm">— Subsidized access</span></li>
                  <li className="flex items-center gap-2"><span className="text-yellow-400">🌟 Ally Tier</span> <span className="text-white/40 text-sm">— Standard pricing</span></li>
                  <li className="flex items-center gap-2"><span className="text-purple-400">🏢 Corporate Tier</span> <span className="text-white/40 text-sm">— Premium pricing</span></li>
                </ul>
              </div>
              
              <div className="mt-8">
                <Link href="/questionaire">
                  <Button size="lg" className="w-full group">
                    Begin the Acid Test
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-xs text-white/40 mt-4">
                  Takes about 2 minutes. No registration required.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Three Pathways */}
        <section className="py-24 px-6 bg-white/5">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Enter the Sanctuary
              </h2>
              <p className="inline-flex text-xl text-white/60 max-w-2xl mx-auto">
                Three doors. One sanctuary. Choose your path.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/learn">
                <Card className="p-6 hover:border-cyan-500/30 transition-all group cursor-pointer h-full">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Learn</h3>
                  <p className="text-white/60 text-sm">Discover the philosophy, the architecture, and the vision behind the sanctuary.</p>
                  <div className="mt-4 text-cyan-400 text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
              
              <Link href="/marketplace">
                <Card className="p-6 hover:border-purple-500/30 transition-all group cursor-pointer h-full">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Palette className="text-purple-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Explore</h3>
                  <p className="text-white/60 text-sm">Browse creators, vendors, and products from the neurodivergent community.</p>
                  <div className="mt-4 text-purple-400 text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Discover <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
              
              <Link href="/dashboard">
                <Card className="p-6 hover:border-pink-500/30 transition-all group cursor-pointer h-full">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="text-pink-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Join</h3>
                  <p className="text-white/60 text-sm">Create an account, take the Acid Test, and become part of the sanctuary.</p>
                  <div className="mt-4 text-pink-400 text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Sign up <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Transparency Promise */}
        <section className="py-24 px-6">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full mb-8">
              <Shield size={14} className="text-cyan-400" />
              <span className="text-sm text-white/70">Our Promise</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Radical Transparency
            </h2>
            <p className="inline-flex text-xl text-white/60 max-w-2xl mx-auto mb-12">
              Every dollar that moves through the sanctuary is visible. 
              Every fee explained. Every payout tracked.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center mb-12">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-white/70">Creator: 70%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                <span className="text-white/70">Platform: 30%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                <span className="text-white/70">Residual Pool: adjustable (0-50%)</span>
              </div>
            </div>
            
            <Link href="/transparency">
              <Button variant="outline">
                View Public Ledger
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="container max-w-6xl mx-auto text-center">
            <p className="text-white/40 text-sm">
              A sanctuary built by{' '}
              <span className="text-cyan-400">The Quantum Weaver</span>
              {' '}and{' '}
              <span className="text-purple-400">Aethelred</span>
              . No employees. No board. No extraction. Just collaboration.
            </p>
          </div>
        </footer>
      </main>
    </Page>
  );
}