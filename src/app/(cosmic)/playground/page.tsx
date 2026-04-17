// app/(cosmic)/playground/page.tsx
// The Sandbox - Component testing, theme experimentation
// Feeling: Playful, experimental, creative

'use client';

import { useState } from 'react';
import { Page } from '@/components/layout/Page';
import { ComponentLibrary } from '@/components/cosmic/ComponentLibrary';
import { VariantControls } from '@/components/cosmic/VariantControls';
import { LivePreview } from '@/components/cosmic/LivePreview';
import { CodeExport } from '@/components/cosmic/CodeExport';
import { ThemeTester } from '@/components/cosmic/ThemeTester';

export const metadata = {
  title: 'The Sandbox | Sovereign Sanctuary',
  description: 'Experiment with components and themes'
};

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [theme, setTheme] = useState('quantum');

  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Sandbox
            </h1>
            <p className="text-white/60">
              Play, experiment, and create
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="space-y-8">
              <ComponentLibrary 
                selected={selectedComponent} 
                onSelect={setSelectedComponent} 
              />
              <ThemeTester currentTheme={theme} onThemeChange={setTheme} />
            </div>
            <div className="lg:col-span-2">
              <LivePreview component={selectedComponent} theme={theme} />
            </div>
            <div>
              <VariantControls component={selectedComponent} />
              <CodeExport component={selectedComponent} theme={theme} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}