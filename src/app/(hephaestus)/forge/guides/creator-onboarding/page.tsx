// app/(hephaestus)/forge/guides/creator-onboarding/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { OnboardingHero } from '@/components/asgard/domains/hephaestus/onboarding/OnboardingHero';
import { StepCard } from '@/components/asgard/domains/hephaestus/onboarding/StepCard';
import { ChecklistItem } from '@/components/asgard/domains/hephaestus/onboarding/ChecklistItem';
import { NextSteps } from '@/components/asgard/domains/hephaestus/onboarding/NextSteps';
import { Palette, Sparkles, CreditCard, Package, Users, Rocket, TrendingUp, Heart, HandCoins } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creator Onboarding | AUDHDITIES',
  description: 'Learn how to become a creator on AUDHDITIES and share your gifts with the world',
};

export default function CreatorOnboardingPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <OnboardingHero 
          title="Creator Onboarding"
          subtitle="Share your gifts with the sanctuary community and earn residual income"
          icon={<Palette size={14} className="text-purple-400" />}
          lastUpdated="March 29, 2026"
        />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-4">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-purple-400 text-sm">You are an artist. A maker. A visionary.</span>
            </div>
            <p className="text-star-dust/70 text-lg max-w-2xl mx-auto">
              Welcome, creator! This guide walks you through becoming a creator on AUDHDITIES—someone who can list products, earn money, and build a following.
            </p>
          </div>
          
          <div className="mb-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold text-star-dust mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-400 rounded-full" />
              Before You Begin
            </h2>
            <div className="space-y-2">
              <ChecklistItem text="A registered account" completed />
              <ChecklistItem text="Verified email address" completed />
              <ChecklistItem text="Completed profile (avatar + bio)" />
            </div>
          </div>
          
          <StepCard step={1} title="Apply for Creator Status">
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Log in to your dashboard</li>
              <li>Click &ldquo;Become a Creator&rdquo; in the sidebar</li>
              <li>Fill out the application:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-star-dust">Portfolio URL</strong>: Link to your work</li>
                  <li><strong className="text-star-dust">Creative categories</strong>: Writing, art, code, music, etc.</li>
                  <li><strong className="text-star-dust">Description</strong>: Tell us about your creative journey</li>
                  <li><strong className="text-star-dust">Residual percentage</strong>: 0-50% of platform fee for contributors</li>
                  <li><strong className="text-star-dust">Covenant pledge</strong>: 0-50% of earnings for community dignity fund (optional)</li>
                </ul>
              </li>
              <li>Submit for review</li>
            </ol>
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-purple-400 text-sm flex items-start gap-2">
                  <Heart size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong className="text-star-dust">Residual percentage</strong>: This determines how much of the platform fee goes to contributors who helped create your product.</span>
                </p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm flex items-start gap-2">
                  <HandCoins size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong className="text-star-dust">Covenant pledge</strong>: A voluntary donation to the community dignity fund. Changeable anytime.</span>
                </p>
              </div>
            </div>
          </StepCard>
          
          <StepCard step={2} title="Wait for Approval">
            <p className="text-star-dust/70 mb-4">
              Applications are reviewed within 1-3 business days. You will receive an email when approved.
            </p>
            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-neurospark text-sm flex items-start gap-2">
                <Package size={16} className="flex-shrink-0 mt-0.5" />
                <span><strong className="text-star-dust">While waiting:</strong> Prepare your first product! Brainstorm ideas, gather materials, write descriptions.</span>
              </p>
            </div>
          </StepCard>
          
          <StepCard step={3} title="Set Up Payments (Stripe Connect)">
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Go to Creator Dashboard → Payments</li>
              <li>Click &ldquo;Connect Stripe Account&rdquo;</li>
              <li>Follow Stripe&apos;s onboarding (takes 5-10 minutes)</li>
              <li>Verify your identity and bank details</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <CreditCard size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-star-dust/60 text-sm">Stripe handles all complex financial compliance. We never see your banking info.</p>
            </div>
          </StepCard>
          
          <StepCard step={4} title="Create Your First Product">
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Go to Creator Dashboard → Products</li>
              <li>Click &ldquo;New Product&rdquo;</li>
              <li>Fill in:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-star-dust">Title</strong>: Clear, descriptive, captivating</li>
                  <li><strong className="text-star-dust">Description</strong>: What is it? Why buy it?</li>
                  <li><strong className="text-star-dust">Price tiers</strong>: Community (discount), Ally (standard), Corporate (premium)</li>
                  <li><strong className="text-star-dust">Residual pool</strong>: % of platform fee to contributors</li>
                  <li><strong className="text-star-dust">Media</strong>: Images, previews, downloads</li>
                </ul>
              </li>
              <li>Save as draft or publish immediately</li>
            </ol>
            <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg">
              <p className="text-star-dust/70 text-sm flex items-start gap-2">
                <TrendingUp size={16} className="text-neurospark flex-shrink-0 mt-0.5" />
                <span><strong className="text-star-dust">The Economics:</strong> Platform fee fixed at <span className="text-neurospark">10%</span>. You keep <span className="text-purple-400">90%</span> of all sales.</span>
              </p>
            </div>
          </StepCard>
          
          <StepCard step={5} title="Add Contributors (Optional)">
            <p className="text-star-dust/70 mb-4">If others helped create this product, add them to share residuals:</p>
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Edit your product</li>
              <li>Go to &ldquo;Contributors&rdquo; tab</li>
              <li>Add by username or email</li>
              <li>Assign percentage of residual pool</li>
              <li>They will be notified and must accept</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
              <Users size={20} className="text-pink-400 flex-shrink-0 mt-0.5" />
              <p className="text-star-dust/60 text-sm">Every contributor receives their share forever. The &ldquo;background actor dividend&rdquo; honors everyone who helped.</p>
            </div>
          </StepCard>
          
          <StepCard step={6} title="Publish and Promote" isLast>
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Set product to &ldquo;Published&rdquo;</li>
              <li>Share on your social channels</li>
              <li>Add to your profile gallery</li>
              <li>Consider a launch discount for early supporters</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Rocket size={20} className="text-neurospark flex-shrink-0 mt-0.5" />
              <p className="text-star-dust/60 text-sm">Your first sale is a milestone! Share it with your community and celebrate.</p>
            </div>
          </StepCard>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-star-dust mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-400 rounded-full" />
              Earnings Breakdown
            </h2>
            <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl p-6 border border-green-500/20 mb-6">
              <div className="text-center mb-4">
                <span className="text-green-400 font-mono text-2xl font-bold">Sale Price: $100</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-star-dust/60">Platform Fee (fixed at 10%)</span>
                  <span className="text-neurospark font-bold">$10</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-star-dust/60">Your Earnings</span>
                  <span className="text-purple-400 font-bold">$90</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10 ml-4">
                  <span className="text-star-dust/40">→ Immediate Payment</span>
                  <span className="text-star-dust">$72</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10 ml-4">
                  <span className="text-star-dust/40">→ Covenant Pool (20% pledge)</span>
                  <span className="text-green-400">$18</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-star-dust/60">Residual Pool (30% of fee)</span>
                  <span className="text-pink-400">$3</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-star-dust mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded-full" />
              Tips for Success
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-pink-500/10 to-transparent rounded-lg p-4 border border-pink-500/20">
                <h4 className="text-star-dust font-bold">🎨 Start with one product</h4>
                <p className="text-star-dust/60 text-sm">Learn the system, then scale.</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent rounded-lg p-4 border border-cyan-500/20">
                <h4 className="text-star-dust font-bold">💰 Price reasonably</h4>
                <p className="text-star-dust/60 text-sm">You can always raise prices later.</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg p-4 border border-purple-500/20">
                <h4 className="text-star-dust font-bold">💬 Engage with buyers</h4>
                <p className="text-star-dust/60 text-sm">Comments and DMs build community.</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded-lg p-4 border border-green-500/20">
                <h4 className="text-star-dust font-bold">🔄 Update products regularly</h4>
                <p className="text-star-dust/60 text-sm">Keep your offerings fresh.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-star-dust font-bold mb-3">Need Help?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-neurospark">Technical issues</span>
                <p className="text-star-dust/40">Open a GitHub issue</p>
              </div>
              <div>
                <span className="text-purple-400">Payment questions</span>
                <p className="text-star-dust/40">Stripe support</p>
              </div>
              <div>
                <span className="text-pink-400">Community help</span>
                <p className="text-star-dust/40">Discord (coming soon)</p>
              </div>
            </div>
          </div>
          
          <NextSteps 
            steps={[
              "Complete creator application",
              "Connect Stripe account",
              "Create first product",
              "Add first contributor",
              "Make first sale!"
            ]}
            actionText="Apply to Become a Creator"
            actionLink="/council/applications/creator"
          />
          
          <div className="mt-12 text-center">
            <div className="inline-block p-6 bg-white/5 rounded-2xl border border-white/10 max-w-2xl mx-auto">
              <Heart className="text-pink-400 mx-auto mb-3" size={28} />
              <p className="text-star-dust/70 italic">
                &ldquo;Your art is a gift. The sanctuary is here to help you share it with the world,
                honor those who helped create it, and build a community that values you.&rdquo;
              </p>
              <p className="text-neurospark text-sm mt-3">— The Quantum Weaver</p>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}