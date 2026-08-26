// src/components/asgard/domains/cosmic/playground/Playground.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Input } from '@/components/forging/Input';
import { Select } from '@/components/forging/Select';
import { Switch } from '@/components/forging/Switch';
import { Progress } from '@/components/runes/Progress';
import { Tabs, TabsList, TabsTrigger, TabsPanel } from '@/components/vegvisir/Tabs';
import { Sparkles, Beaker, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// DEMO DATA
// ═══════════════════════════════════════════════════════════════════════════

const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const;
const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const CARD_VARIANTS = ['default', 'interactive', 'glass', 'glow', 'elevated', 'outline', 'ghost', 'quantum', 'cosmic', 'sanctuary', 'council'] as const;
const BADGE_VARIANTS = ['default', 'outline', 'ghost'] as const;

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Playground() {
  const [activeTab, setActiveTab] = useState('buttons');
  const [buttonVariant, setButtonVariant] = useState<string>('primary');
  const [buttonSize, setButtonSize] = useState<string>('md');
  const [cardVariant, setCardVariant] = useState<string>('sanctuary');
  const [badgeVariant, setBadgeVariant] = useState<string>('default');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progressValue, setProgressValue] = useState(65);
  const [copied, setCopied] = useState(false);

  const cardData: CardData = { id: 'demo', type: 'value', title: 'Demo Card', value: 'Playground' };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Beaker size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Sandbox</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">Component Playground</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Explore the Sanctuary's component library. Change variants, sizes, and
            states to see how each component responds. Copy the code to use in your own creations.
          </p>
        </div>

        <Tabs defaultValue="buttons" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* BUTTONS TAB                                                     */}
          {/* ════════════════════════════════════════════════════════════ */}
          <TabsPanel value="buttons">
            <Card data={cardData} variant="glass" radius="xl" shadow="md" className="p-6">
              <h2 className="text-lg font-semibold text-star-dust mb-4">Button Variants</h2>

              {/* Controls */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Select
                  label="Variant"
                  value={buttonVariant}
                  options={BUTTON_VARIANTS.map((v) => ({ value: v, label: v }))}
                  onChange={(e) => setButtonVariant(e.target.value)}
                />
                <Select
                  label="Size"
                  value={buttonSize}
                  options={BUTTON_SIZES.map((s) => ({ value: s, label: s }))}
                  onChange={(e) => setButtonSize(e.target.value)}
                />
              </div>

              {/* Preview */}
              <div className="bg-white/5 rounded-xl p-6 mb-4 flex items-center justify-center min-h-[80px]">
                <Button variant={buttonVariant as any} size={buttonSize as any}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Sanctuary Button
                </Button>
              </div>

              {/* Code */}
              <div className="relative">
                <pre className="bg-black/50 rounded-lg p-4 text-xs text-star-dust/60 font-mono overflow-x-auto">
{`<Button variant="${buttonVariant}" size="${buttonSize}">
  <Sparkles className="h-4 w-4 mr-2" />
  Sanctuary Button
</Button>`}
                </pre>
                <button
                  onClick={() => handleCopy(`<Button variant="${buttonVariant}" size="${buttonSize}">\n  <Sparkles className="h-4 w-4 mr-2" />\n  Sanctuary Button\n</Button>`)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-star-dust/60 hover:text-star-dust transition-all"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </Card>
          </TabsPanel>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* CARDS TAB                                                       */}
          {/* ════════════════════════════════════════════════════════════ */}
          <TabsPanel value="cards">
            <Card data={cardData} variant="glass" radius="xl" shadow="md" className="p-6">
              <h2 className="text-lg font-semibold text-star-dust mb-4">Card Variants</h2>

              <div className="mb-6">
                <Select
                  label="Variant"
                  value={cardVariant}
                  options={CARD_VARIANTS.map((v) => ({ value: v, label: v }))}
                  onChange={(e) => setCardVariant(e.target.value)}
                />
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-4 flex items-center justify-center min-h-[160px]">
                <Card
                  data={cardData}
                  variant={cardVariant as any}
                  radius="lg"
                  shadow="md"
                  className="p-6 w-full max-w-sm"
                >
                  <h3 className="text-lg font-semibold text-star-dust mb-2">Sanctuary Card</h3>
                  <p className="text-sm text-star-dust/50">
                    This is the <span className="text-neurospark">{cardVariant}</span> variant.
                    Cards adapt their appearance while maintaining consistent structure.
                  </p>
                </Card>
              </div>

              <div className="relative">
                <pre className="bg-black/50 rounded-lg p-4 text-xs text-star-dust/60 font-mono overflow-x-auto">
{`<Card variant="${cardVariant}" radius="lg" shadow="md">
  <h3>Sanctuary Card</h3>
  <p>This is the ${cardVariant} variant.</p>
</Card>`}
                </pre>
                <button
                  onClick={() => handleCopy(`<Card variant="${cardVariant}" radius="lg" shadow="md">\n  <h3>Sanctuary Card</h3>\n  <p>This is the ${cardVariant} variant.</p>\n</Card>`)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-star-dust/60 hover:text-star-dust transition-all"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </Card>
          </TabsPanel>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* BADGES TAB                                                      */}
          {/* ════════════════════════════════════════════════════════════ */}
          <TabsPanel value="badges">
            <Card data={cardData} variant="glass" radius="xl" shadow="md" className="p-6">
              <h2 className="text-lg font-semibold text-star-dust mb-4">Badge Variants</h2>

              <div className="mb-6">
                <Select
                  label="Variant"
                  value={badgeVariant}
                  options={BADGE_VARIANTS.map((v) => ({ value: v, label: v }))}
                  onChange={(e) => setBadgeVariant(e.target.value)}
                />
              </div>

              <div className="bg-white/5 rounded-xl p-6 mb-4 flex items-center justify-center gap-3 min-h-[80px]">
                <Badge variant={badgeVariant as any} size="sm">Small</Badge>
                <Badge variant={badgeVariant as any} size="md">Medium</Badge>
                <Badge variant={badgeVariant as any} size="lg">Large</Badge>
              </div>

              <div className="relative">
                <pre className="bg-black/50 rounded-lg p-4 text-xs text-star-dust/60 font-mono overflow-x-auto">
{`<Badge variant="${badgeVariant}" size="md">Medium</Badge>`}
                </pre>
                <button
                  onClick={() => handleCopy(`<Badge variant="${badgeVariant}" size="md">Medium</Badge>`)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-star-dust/60 hover:text-star-dust transition-all"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </Card>
          </TabsPanel>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* INPUTS TAB                                                      */}
          {/* ════════════════════════════════════════════════════════════ */}
          <TabsPanel value="inputs">
            <Card data={cardData} variant="glass" radius="xl" shadow="md" className="p-6">
              <h2 className="text-lg font-semibold text-star-dust mb-4">Input + Switch + Progress</h2>

              <div className="space-y-6 mb-6">
                <Input
                  label="Display Name"
                  placeholder="How shall you be known?"
                  defaultValue="Quantum Weaver"
                />
                <Switch
                  label="Dyslexia-friendly mode"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
                <div>
                  <label className="text-sm text-star-dust/70 mb-2 block">
                    Sovereignty Progress: {progressValue}%
                  </label>
                  <Progress value={progressValue} max={100} variant="default" size="md" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(e) => setProgressValue(parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </Card>
          </TabsPanel>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* FEEDBACK TAB                                                    */}
          {/* ════════════════════════════════════════════════════════════ */}
          <TabsPanel value="feedback">
            <Card data={cardData} variant="glass" radius="xl" shadow="md" className="p-6">
              <h2 className="text-lg font-semibold text-star-dust mb-4">States: Loading · Empty · Error · Success</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="w-8 h-8 border-2 border-neurospark border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs text-star-dust/50">Loading state</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-3xl mb-1">🌌</p>
                  <p className="text-xs text-star-dust/50">Empty state</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-400 mb-1">Something went wrong</p>
                  <p className="text-xs text-red-400/60">Error state</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <p className="text-sm text-emerald-400 mb-1">Saved successfully</p>
                  <p className="text-xs text-emerald-400/60">Success state</p>
                </div>
              </div>
            </Card>
          </TabsPanel>
        </Tabs>

        {/* Footer */}
        <Card data={cardData} variant="glass" radius="xl" shadow="none" className="mt-8 p-6 text-center">
          <Sparkles className="h-5 w-5 text-neurospark mx-auto mb-2" />
          <p className="text-sm text-star-dust/40">
            Every component you see is available in the Sanctuary's component library.
            All use COSMIC design tokens. All are accessible, responsive, and sovereign.
          </p>
        </Card>
      </div>
    </main>
  );
}