// src/app/page.tsx
// The Hearth - Welcome to the Sovereign Sanctuary
// Feeling: Warm, welcoming, safe, reflective

import { Page } from '@/components/shared/Page';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Heart, Shield } from 'lucide-react';

export default function Home() {
  return (
    <Page 
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >
      <main className="min-h-screen flex items-center justify-center">
        <div className="relative w-full py-20 px-6">
          
          {/* Simple animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-deep-space/95 to-deep-space/90" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="relative z-10 container max-w-4xl mx-auto text-center">
            
            {/* Simple badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-sm text-white/70">A Sovereign Sanctuary</span>
            </div>
            
            {/* Simple, clear title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              A Place Where{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                You Belong
              </span>
            </h1>
            
            {/* Simple invitation */}
            <p className="text-xl text-white/70 mx-auto mb-12">
              For neurodivergent creators, contributors, and community.
              <br />
              Come as you are. Your sovereignty is respected here.
            </p>
            
            {/* Simple CTA */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link href="/sanctuary">
                <Button size="lg" className="group">
                  Enter the Sanctuary
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            {/* Simple trust markers */}
            <div className="flex flex-wrap gap-6 justify-center text-sm text-white/40">
              <span className="flex items-center gap-2">✨ No hidden fees</span>
              <span className="flex items-center gap-2">🔓 100% transparent</span>
              <span className="flex items-center gap-2">💫 Community-owned</span>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}