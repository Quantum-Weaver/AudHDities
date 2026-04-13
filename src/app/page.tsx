/* src/app/page.tsx */
import Link from "next/link";
import { Button } from "src/components/ui/Button";
import { Card } from "src/components/ui/Card";
import { Sparkles, Heart, Shield, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-deep-space/95 to-deep-space/90" />
        
        {/* Soft glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="relative z-10 container max-w-5xl mx-auto px-6 py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/70">A Sovereign Sanctuary</span>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            A Place Where{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              You Belong
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
            For neurodivergent creators, contributors, and community.
            <br />
            Come as you are. Your sovereignty is respected here.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link href="/signup">
              <Button size="lg" className="group">
                Enter the Sanctuary
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Trust Markers */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-white/40">
            <span className="flex items-center gap-2">✨ No hidden fees</span>
            <span className="flex items-center gap-2">🔓 100% transparent</span>
            <span className="flex items-center gap-2">💫 Community-owned</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/5">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Built for You
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-white/5 border-white/10">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Neurodivergent First</h3>
              <p className="text-white/60">Design decisions guided by the community, for the community.</p>
            </Card>
            
            <Card className="p-6 text-center bg-white/5 border-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Data Sovereignty</h3>
              <p className="text-white/60">You own your data. Always. No exceptions.</p>
            </Card>
            
            <Card className="p-6 text-center bg-white/5 border-white/10">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Residual Economics</h3>
              <p className="text-white/60">Value flows to creators. Forever.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <Card className="p-12 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Create your account and become part of the sovereign network.
            </p>
            <Link href="/signup">
              <Button size="lg">
                Sign Up Free
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
}