// app/(hephaestus)/forge/guides/neurodivergent-ux/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { UXHero } from '@/components/asgard/domains/hephaestus/ux/UXHero';
import { PrincipleCard } from '@/components/asgard/domains/hephaestus/ux/PrincipleCard';
import { CodePlayground } from '@/components/asgard/domains/hephaestus/ux/CodePlayground';
import { InteractiveChecklist } from '@/components/asgard/domains/hephaestus/ux/InteractiveChecklist';
import { SensoryDemo } from '@/components/asgard/domains/hephaestus/ux/SensoryDemo';
import { FocusDemo } from '@/components/asgard/domains/hephaestus/ux/FocusDemo';

export const metadata: Metadata = {
  title: 'Neurodivergent UX | AUDHDITIES',
  description: 'Design philosophy for the beautiful spectrum of human cognition',
};

const checklistItems = [
  { id: 'pace', text: 'Can users control the pace?', category: 'Pacing' },
  { id: 'progress', text: 'Is there a way to save progress?', category: 'Executive Function' },
  { id: 'flashing', text: 'Are there flashing or moving elements?', category: 'Sensory' },
  { id: 'autoplay', text: 'Can users turn off auto-play?', category: 'Sensory' },
  { id: 'language', text: 'Is the language plain and direct?', category: 'Clarity' },
  { id: 'nextsteps', text: 'Are next steps obvious?', category: 'Executive Function' },
  { id: 'moreinfo', text: 'Is there a "more info" option?', category: 'Choice' },
  { id: 'reducedmotion', text: 'Does it work with reduced motion?', category: 'Accessibility' },
  { id: 'contrast', text: 'Is there sufficient color contrast?', category: 'Accessibility' },
  { id: 'keyboard', text: 'Can keyboard users navigate it?', category: 'Accessibility' },
];

export default function NeurodivergentUxPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <UXHero />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          
          {/* Core Belief */}
          <div className="mb-12 text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
              <p className="text-xl text-star-dust/80 italic">
                "AUDHDITIES is built <span className="text-purple-400">by</span> neurodivergent minds, 
                <span className="text-pink-400"> for</span> neurodivergent minds. 
                We don't design for the &lsquo;average user&rsquo;—we design for the beautiful spectrum of human cognition."
              </p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-star-dust mb-6">Our Principles</h2>
          <div className="space-y-4 mb-12">
            <PrincipleCard 
              title="Clarity Over Cleverness"
              description="Direct instructions, visible menus, predictable interactions"
              examples={{
                avoid: ["Witty microcopy", "Hidden navigation", "Surprising animations", "Industry jargon"],
                use: ["Direct instructions", "Visible menus", "Predictable interactions", "Plain language"]
              }}
              defaultOpen
            />
            <PrincipleCard 
              title="Choice, Not Overwhelm"
              description="Options, not ultimatums. Advanced settings tucked away but accessible."
              examples={{
                avoid: ["Endless forms", "No alternatives", "Complex defaults"],
                use: ["Default settings that work", "More options links", "Progressive disclosure"]
              }}
            />
            <PrincipleCard 
              title="Pacing Control"
              description="No auto-playing media, no timed actions without warning"
              examples={{
                avoid: ["Auto-play videos", "Timed quizzes", "No save options"],
                use: ["Save drafts automatically", "Continue later options", "Clear timing warnings"]
              }}
            />
            <PrincipleCard 
              title="Sensory Respect"
              description="Flashing animations OFF by default, sounds OPT-IN, motion preferences respected"
              examples={{
                avoid: ["Flashing by default", "Auto-playing sounds", "Forced animations"],
                use: ["Respect reduced motion", "Opt-in notifications", "High contrast mode"]
              }}
            />
            <PrincipleCard 
              title="Executive Function Support"
              description="Visual timers, progress saving, clear next steps"
              examples={{
                avoid: ["Lost progress", "Unclear next steps", "Decision fatigue"],
                use: ["Visual timers", "Auto-save", "Batch actions"]
              }}
            />
          </div>
          
          {/* Interactive Demos */}
          <h2 className="text-3xl font-bold text-star-dust mb-6 mt-12">Experience It Yourself</h2>
          <div className="space-y-8 mb-12">
            <SensoryDemo />
            <FocusDemo />
          </div>
          
          <h2 className="text-3xl font-bold text-star-dust mb-6 mt-12">Implementation Guide</h2>
          <div className="space-y-6 mb-12">
            <CodePlayground 
              title="High Contrast Mode"
              description="Override colors for users who need more contrast"
              language="css"
              code={`/* High contrast mode overrides */\n@media (prefers-contrast: more) {\n  :root {\n    --text-primary: #000000;\n    --text-secondary: #1a1a1a;\n    --border-regular: 2px solid currentColor;\n  }\n}`}
            />
            <CodePlayground 
              title="Respect Reduced Motion"
              description="Disable animations for users who prefer reduced motion"
              language="css"
              code={`/* Respect reduced motion preferences */\n@media (prefers-reduced-motion: reduce) {\n  * {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n  }\n}`}
            />
            <CodePlayground 
              title="Always Visible Focus Indicators"
              description="Help keyboard users navigate"
              language="css"
              code={`/* Always visible focus indicators */\n*:focus-visible {\n  outline: 3px solid var(--primary);\n  outline-offset: 2px;\n}`}
            />
          </div>
          
          {/* Typography Guidelines */}
          <div className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-star-dust mb-4">Typography Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-star-dust">✓ Minimum text size: <span className="text-neurospark">16px</span></div>
                <div className="text-star-dust">✓ Line height: <span className="text-neurospark">at least 1.5</span></div>
                <div className="text-star-dust">✓ Maximum line length: <span className="text-neurospark">70 characters</span></div>
                <div className="text-star-dust">✓ Dyslexia-friendly font option (<span className="text-purple-400">OpenDyslexic</span>)</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-star-dust/60 text-sm font-mono">font-family: 'OpenDyslexic', monospace;</p>
                <p className="text-star-dust/40 text-xs mt-2">Available as a toggle in user preferences</p>
              </div>
            </div>
          </div>
          
          {/* Form Design */}
          <div className="mb-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-star-dust mb-4">Form Design Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-neurospark font-medium mb-2">Text Inputs</h4>
                <ul className="space-y-1 text-star-dust/60 text-sm">
                  <li>• Clear labels (not just placeholders)</li>
                  <li>• Helper text with examples</li>
                  <li>• Character count when relevant</li>
                  <li>• Auto-save while typing</li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Select/Dropdown</h4>
                <ul className="space-y-1 text-star-dust/60 text-sm">
                  <li>• Searchable when 5+ options</li>
                  <li>• Grouped categories</li>
                  <li>• Default selected when appropriate</li>
                </ul>
              </div>
              <div>
                <h4 className="text-pink-400 font-medium mb-2">Buttons</h4>
                <ul className="space-y-1 text-star-dust/60 text-sm">
                  <li>• Descriptive text (not just "Submit")</li>
                  <li>• Confirmation before destructive actions</li>
                  <li>• Loading states with cancel option</li>
                </ul>
              </div>
              <div>
                <h4 className="text-green-400 font-medium mb-2">Error Messages</h4>
                <ul className="space-y-1 text-star-dust/60 text-sm">
                  <li>• What happened (plain language)</li>
                  <li>• Why it happened (if known)</li>
                  <li>• How to fix it (specific steps)</li>
                  <li>• No technical codes for users</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Testing with Real Users */}
          <div className="mb-12 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
            <h3 className="text-xl font-bold text-star-dust mb-4">Testing with Real Users</h3>
            <p className="text-star-dust/70 mb-4">Before launching new features:</p>
            <ol className="list-decimal list-inside space-y-2 text-star-dust/60 ml-4">
              <li>Test with 3-5 neurodivergent users</li>
              <li>Watch them use it (no instructions)</li>
              <li>Ask: "What would you do next?"</li>
              <li>Note where they pause or get confused</li>
              <li>Fix and test again</li>
            </ol>
          </div>
          
          {/* Interactive Checklist */}
          <h2 className="text-3xl font-bold text-star-dust mb-6">Feature Checklist</h2>
          <InteractiveChecklist 
            title="New Feature Review"
            items={checklistItems}
          />
          
          {/* Our Commitment */}
          <div className="mt-12 p-8 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-2xl border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-star-dust mb-4">Our Commitment</h2>
            <p className="text-star-dust/70 max-w-2xl mx-auto mb-6">
              We will continue to learn and improve. This document evolves as we understand more about what our users need.
            </p>
            <p className="text-star-dust/80 italic">
              If you&rsquo;re neurodivergent and using AUDHDITIES, your feedback is not just welcome—it&rsquo;s essential.
            </p>
            <p className="text-neurospark text-sm mt-4">
              Report issues, suggest improvements, and help us build a sanctuary that truly works for all minds.
            </p>
          </div>
        </div>
      </main>
    </Page>
  );
}