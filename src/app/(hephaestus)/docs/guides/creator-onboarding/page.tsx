// app/(content)/docs/guides/creator-onboarding/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/shared/Page';
import { OnboardingHero } from '@/components/hephaestus/supporting/onboarding/OnboardingHero';
import { StepCard } from '@/components/hephaestus/supporting/onboarding/StepCard';
import { InfoTable } from '@/components/hephaestus/supporting/onboarding/InfoTable';
import { ChecklistItem } from '@/components/hephaestus/supporting/onboarding/ChecklistItem';
import { NextSteps } from '@/components/hephaestus/supporting/onboarding/NextSteps';
import { Palette, Sparkles, CreditCard, Package, Users, Rocket, TrendingUp, Heart, HandCoins } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creator Onboarding | AUDHDITIES',
  description: 'Learn how to become a creator on AUDHDITIES and share your gifts with the world',
};

export default async function CreatorOnboardingPage() {
  return (
    <Page 
      variant={1}
      environment="docs"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <OnboardingHero 
          title="Creator Onboarding"
          subtitle="Share your gifts with the sanctuary community and earn residual income"
          icon={<Palette size={14} className="text-purple-400" />}
          lastUpdated="March 29, 2026"
        />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-4">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-purple-400 text-sm">You're an artist. A maker. A visionary.</span>
            </div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Welcome, creator! This guide walks you through becoming a creator on AUDHDITIES—someone who can list products, earn money, and build a following.
            </p>
          </div>
          
          {/* Prerequisites */}
          <div className="mb-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-400 rounded-full" />
              Before You Begin
            </h2>
            <div className="space-y-2">
              <ChecklistItem text="A registered account" completed />
              <ChecklistItem text="Verified email address" completed />
              <ChecklistItem text="Completed profile (avatar + bio)" />
            </div>
          </div>
          
          {/* Step 1: Apply */}
          <StepCard step={1} title="Apply for Creator Status">
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Log in to your dashboard</li>
              <li>Click "Become a Creator" in the sidebar</li>
              <li>Fill out the application:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-white">Portfolio URL</strong>: Link to your work (website, social, gallery)</li>
                  <li><strong className="text-white">Creative categories</strong>: Writing, art, code, music, etc.</li>
                  <li><strong className="text-white">Description</strong>: Tell us about yourself and your creative journey</li>
                  <li><strong className="text-white">Residual percentage</strong>: Choose 0-50% of platform fee for contributors</li>
                  <li><strong className="text-white">Covenant pledge</strong>: Choose 0-50% of your earnings for community dignity fund (optional)</li>
                </ul>
              </li>
              <li>Submit for review</li>
            </ol>
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-purple-400 text-sm flex items-start gap-2">
                  <Heart size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Residual percentage</strong>: This determines how much of the <strong>platform fee</strong> goes to contributors who helped create your product.</span>
                </p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm flex items-start gap-2">
                  <HandCoins size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Covenant pledge</strong>: A voluntary donation to the community dignity fund—supporting all active members equally. You can change this anytime in your profile.</span>
                </p>
              </div>
            </div>
          </StepCard>
          
          {/* Step 2: Wait for Approval */}
          <StepCard step={2} title="Wait for Approval">
            <p className="text-white/70 mb-4">
              Applications are reviewed within 1-3 business days. You'll receive an email when approved.
            </p>
            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-cyan-400 text-sm flex items-start gap-2">
                <Package size={16} className="flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">While waiting:</strong> Prepare your first product! Brainstorm ideas, gather materials, write descriptions.</span>
              </p>
            </div>
          </StepCard>
          
          {/* Step 3: Stripe Connect */}
          <StepCard step={3} title="Set Up Payments (Stripe Connect)">
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Go to Creator Dashboard → Payments</li>
              <li>Click "Connect Stripe Account"</li>
              <li>Follow Stripe's onboarding (takes 5-10 minutes)</li>
              <li>Verify your identity and bank details</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <CreditCard size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">Stripe handles all the complex financial compliance. We never see your banking info.</p>
            </div>
          </StepCard>
          
          {/* Step 4: Create Product */}
          <StepCard step={4} title="Create Your First Product">
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Go to Creator Dashboard → Products</li>
              <li>Click "New Product"</li>
              <li>Fill in:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-white">Title</strong>: Clear, descriptive, captivating</li>
                  <li><strong className="text-white">Description</strong>: What is it? Why should someone buy it?</li>
                  <li><strong className="text-white">Price tiers</strong>: Community (discount), Ally (standard), Corporate (premium)</li>
                  <li><strong className="text-white">Residual pool</strong>: What % of the platform fee goes to contributors?</li>
                  <li><strong className="text-white">Media</strong>: Images, previews, downloads</li>
                </ul>
              </li>
              <li>Save as draft or publish immediately</li>
            </ol>
            <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg">
              <p className="text-white/70 text-sm flex items-start gap-2">
                <TrendingUp size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">The Economics:</strong> Platform fee is fixed at <span className="text-cyan-400">10%</span>. You keep <span className="text-purple-400">90%</span> of all sales. Residual pool comes from your chosen percentage of the platform fee—rewarding contributors forever.</span>
              </p>
            </div>
          </StepCard>
          
          {/* Step 5: Add Contributors */}
          <StepCard step={5} title="Add Contributors (Optional)">
            <p className="text-white/70 mb-4">If others helped create this product—editors, illustrators, musicians, testers—add them to share residuals:</p>
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Edit your product</li>
              <li>Go to "Contributors" tab</li>
              <li>Add by username or email</li>
              <li>Assign percentage of residual pool</li>
              <li>They'll be notified and must accept</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
              <Users size={20} className="text-pink-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">Every contributor receives their share forever. This is the "background actor dividend" — honoring everyone who helped bring your vision to life.</p>
            </div>
          </StepCard>
          
          {/* Step 6: Publish and Promote */}
          <StepCard step={6} title="Publish and Promote" isLast>
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Set product to "Published"</li>
              <li>Share on your social channels</li>
              <li>Add to your profile gallery</li>
              <li>Consider a launch discount for early supporters</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Rocket size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">Your first sale is a milestone! Share it with your community and celebrate.</p>
            </div>
          </StepCard>
          
          {/* Earnings Breakdown */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-400 rounded-full" />
              Earnings Breakdown
            </h2>
            
            <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl p-6 border border-green-500/20 mb-6">
              <div className="text-center mb-4">
                <span className="text-green-400 font-mono text-2xl font-bold">Sale Price: $100</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Platform Fee (fixed at 10%)</span>
                  <span className="text-cyan-400 font-bold">$10</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Your Earnings</span>
                  <span className="text-purple-400 font-bold">$90</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10 ml-4">
                  <span className="text-white/40">→ Immediate Payment</span>
                  <span className="text-white">$72</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10 ml-4">
                  <span className="text-white/40">→ Covenant Pool (20% pledge)</span>
                  <span className="text-green-400">$18</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Residual Pool (30% of fee)</span>
                  <span className="text-pink-400">$3</span>
                </div>
                <div className="ml-8 mt-2 space-y-1 text-xs">
                  <div className="flex justify-between items-center text-white/40">
                    <span>Contributor A (60%)</span>
                    <span>$1.80</span>
                  </div>
                  <div className="flex justify-between items-center text-white/40">
                    <span>Contributor B (40%)</span>
                    <span>$1.20</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-cyan-400 text-sm flex items-start gap-2">
                  <TrendingUp size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Platform Fee (10%)</strong> — Fixed, transparent, industry-low. Covers operations, development, and support.</span>
                </p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-purple-400 text-sm flex items-start gap-2">
                  <HandCoins size={16} className="flex-shrink-0 mt-0.5" />
                  <span><strong className="text-white">Covenant Pool</strong> — You choose 0-50% of your earnings to support the community. Equal distribution to all active members. Optional, change anytime.</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Tips for Success */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded-full" />
              Tips for Success
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-pink-500/10 to-transparent rounded-lg p-4 border border-pink-500/20">
                <h4 className="text-white font-bold">🎨 Start with one product</h4>
                <p className="text-white/60 text-sm">Learn the system, then scale.</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent rounded-lg p-4 border border-cyan-500/20">
                <h4 className="text-white font-bold">💰 Price reasonably</h4>
                <p className="text-white/60 text-sm">You can always raise prices later.</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg p-4 border border-purple-500/20">
                <h4 className="text-white font-bold">💬 Engage with buyers</h4>
                <p className="text-white/60 text-sm">Comments and DMs build community.</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded-lg p-4 border border-green-500/20">
                <h4 className="text-white font-bold">🔄 Update products regularly</h4>
                <p className="text-white/60 text-sm">Keep your offerings fresh.</p>
              </div>
              <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg p-4 border border-white/20">
                <h4 className="text-white font-bold">🤝 Add contributors generously</h4>
                <p className="text-white/60 text-sm">Every collaborator builds community. The "background actor dividend" honors everyone who helped.</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-lg p-4 border border-green-500/20">
                <h4 className="text-white font-bold">💚 Consider a covenant pledge</h4>
                <p className="text-white/60 text-sm">Even 5-10% can make a difference to community members. Set it in your profile settings.</p>
              </div>
            </div>
          </div>
          
          {/* Support */}
          <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-white font-bold mb-3">Need Help?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-cyan-400">Technical issues</span>
                <p className="text-white/40">Open a GitHub issue</p>
              </div>
              <div>
                <span className="text-purple-400">Payment questions</span>
                <p className="text-white/40">Stripe support</p>
              </div>
              <div>
                <span className="text-pink-400">Community help</span>
                <p className="text-white/40">Discord (coming soon)</p>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <NextSteps 
            steps={[
              "Complete creator application",
              "Connect Stripe account",
              "Create first product",
              "Add first contributor",
              "Make first sale! 🎉"
            ]}
            actionText="Apply to Become a Creator"
            actionLink="/creator/apply"
          />
          
          {/* Inspirational Quote */}
          <div className="mt-12 text-center">
            <div className="inline-block p-6 bg-white/5 rounded-2xl border border-white/10 max-w-2xl mx-auto">
              <Heart className="text-pink-400 mx-auto mb-3" size={28} />
              <p className="text-white/70 italic">
                "Your art is a gift. The sanctuary is here to help you share it with the world,<br />
                honor those who helped create it, and build a community that values you."
              </p>
              <p className="text-cyan-400 text-sm mt-3">— The Quantum Weaver</p>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}