// app/(hephaestus)/forge/guides/merchant-onboarding/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { OnboardingHero } from '@/components/asgard/domains/hephaestus/onboarding/OnboardingHero';
import { StepCard } from '@/components/asgard/domains/hephaestus/onboarding/StepCard';
import { InfoTable } from '@/components/asgard/domains/hephaestus/onboarding/InfoTable';
import { ChecklistItem } from '@/components/asgard/domains/hephaestus/onboarding/ChecklistItem';
import { NextSteps } from '@/components/asgard/domains/hephaestus/onboarding/NextSteps';
import { Store, CreditCard, Package, Truck, BarChart3, Heart, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Merchant Onboarding | AUDHDITIES',
  description: 'Learn how to become a merchant on AUDHDITIES and start selling your products',
};

export default async function MerchantOnboardingPage() {
  return (
    <Page 
      variant={1}
      environment="forge"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <OnboardingHero 
          title="Merchant Onboarding"
          subtitle="Start selling your products to the sanctuary community"
          icon={<Store size={14} className="text-neurospark" />}
          lastUpdated="March 29, 2026"
        />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <p className="text-star-dust/70 text-lg max-w-2xl mx-auto">
              Welcome, merchant! This guide walks you through becoming a merchant on AUDHDITIES—someone who sells physical or digital goods through our marketplace.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full">
              <span className="text-neurospark text-sm">Platform fee fixed at 10%</span>
              <span className="text-star-dust/40">•</span>
              <span className="text-purple-400 text-sm">90% is the ware&apos;s profit</span>
            </div>
          </div>
          
          {/* Prerequisites */}
          <div className="mb-12 bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-star-dust mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full" />
              Prerequisites
            </h2>
            <div className="space-y-2">
              <ChecklistItem text="A registered account" completed />
              <ChecklistItem text="Verified email address" completed />
              <ChecklistItem text="Business details ready (legal name, tax info)" />
            </div>
          </div>
          
          <StepCard step={1} title="Apply for Merchant Status">
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Log in to your dashboard</li>
              <li>Click "Become a Merchant" in the sidebar</li>
              <li>Fill out the application:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-star-dust">Business name</strong>: Your public-facing name</li>
                  <li><strong className="text-star-dust">Legal business name</strong>: For tax purposes</li>
                  <li><strong className="text-star-dust">Business type</strong>: Individual, LLC, Corporation, etc.</li>
                  <li><strong className="text-star-dust">Description</strong>: What do you sell?</li>
                  <li><strong className="text-star-dust">Website/portfolio</strong>: Optional but recommended</li>
                </ul>
              </li>
              <li>Submit for review</li>
            </ol>
          </StepCard>
          
          <StepCard step={2} title="Verification Process">
            <p className="text-star-dust/70 mb-4">Merchant applications require additional verification:</p>
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Identity check (for individuals)</li>
              <li>Business registration (for companies)</li>
              <li>Tax ID verification (EIN or SSN)</li>
            </ol>
            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-neurospark text-sm">⏱️ This typically takes 2-5 business days.</p>
            </div>
          </StepCard>
          
          <StepCard step={3} title="Set Up Payments (Stripe Connect)">
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Go to Merchant Dashboard → Payments</li>
              <li>Click "Connect Stripe Account"</li>
              <li>Complete Stripe onboarding (tax info, bank details)</li>
              <li>Stripe verifies and activates your account</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <CreditCard size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-star-dust/60 text-sm">Stripe handles all payment processing securely. We never see your bank details.</p>
            </div>
          </StepCard>
          
          <StepCard step={4} title="List Your First Product">
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>Go to Merchant Dashboard → Products</li>
              <li>Click "New Product"</li>
              <li>Fill in:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-star-dust">Title</strong>: Clear product name</li>
                  <li><strong className="text-star-dust">Description</strong>: Details, specifications</li>
                  <li><strong className="text-star-dust">Price</strong>: Set your price (in USD)</li>
                  <li><strong className="text-star-dust">Inventory</strong>: Track quantity (if physical)</li>
                  <li><strong className="text-star-dust">Shipping</strong>: Dimensions, weight (if physical)</li>
                  <li><strong className="text-star-dust">Digital download</strong>: Upload file (if digital)</li>
                  <li><strong className="text-star-dust">Categories</strong>: Help buyers find you</li>
                </ul>
              </li>
              <li>Add images (high quality, multiple angles)</li>
              <li>Set as draft or publish</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Package size={20} className="text-neurospark flex-shrink-0 mt-0.5" />
              <p className="text-star-dust/60 text-sm">Pro tip: High-quality images lead to more sales. Show your product from multiple angles!</p>
            </div>
          </StepCard>
          
          <StepCard step={5} title="Manage Orders" isLast>
            <p className="text-star-dust/70 mb-4">When someone buys your product:</p>
            <ol className="list-decimal list-inside space-y-2 text-star-dust/70 ml-4">
              <li>You receive email notification</li>
              <li>Dashboard shows order details</li>
              <li>For digital: automatic delivery</li>
              <li>For physical: you fulfill and ship</li>
              <li>Mark as shipped when complete</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Truck size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-star-dust/60 text-sm">Physical products must be shipped within 3 business days. Digital products are delivered automatically.</p>
            </div>
          </StepCard>
          
          {/* Fees Section - UPDATED */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-star-dust mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full" />
              Fees & Economics
            </h2>
            
            <div className="bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 border border-white/10 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-neurospark font-bold mb-2">Platform Fee: 10%</h3>
                  <p className="text-star-dust/60 text-sm">Fixed rate (industry standard is 30-50%). 70% of it covers hosting, development and support; 30% returns to the residual pool.</p>
                </div>
                <div>
                  <h3 className="text-purple-400 font-bold mb-2">The Ware&apos;s Profit: 90%</h3>
                  <p className="text-star-dust/60 text-sm">90% of every sale is the ware&apos;s own. Your residual pledge (if any) comes out of it; what is left divides equally among the ware&apos;s contributors, you among them.</p>
                </div>
              </div>
            </div>
            
            <InfoTable 
              headers={['Fee Type', 'Amount', 'Notes']}
              rows={[
                ['Platform Fee', '10%', 'Fixed rate (industry standard is 30-50%)'],
                ['Stripe Fee', '2.9% + $0.30', 'Per transaction, paid to Stripe'],
                ['Residual Pledge', "0-50% of a ware's profit", 'Optional, default 0: pledged to the residual pool, which pays every artisan (you set it per ware)'],
                ['Covenant Pledge', '0-50% of your own share of a sale', 'Optional, default 0: pledged to the covenant pool, which pays every opted-in user (you set it in the Sanctum)'],
              ]}
              variant="pricing"
            />
            
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Heart size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-green-400 text-sm">
                  The Covenant Pool is a voluntary pledge: a slice of your own share of a sale, paid on to every opted-in user in equal shares. Entirely optional, defaulting to 0, changeable anytime — and never taken from a pool payout.
                </p>
              </div>
            </div>
          </div>
          
          {/* Merchant Dashboard */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-star-dust mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-400 rounded-full" />
              Merchant Dashboard
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <BarChart3 size={20} className="text-neurospark mb-2" />
                <h4 className="text-star-dust font-bold">Sales Overview</h4>
                <p className="text-star-dust/60 text-sm">Sales today/week/month</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Package size={20} className="text-purple-400 mb-2" />
                <h4 className="text-star-dust font-bold">Pending Orders</h4>
                <p className="text-star-dust/60 text-sm">Orders waiting for fulfillment</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Truck size={20} className="text-pink-400 mb-2" />
                <h4 className="text-star-dust font-bold">Inventory Alerts</h4>
                <p className="text-star-dust/60 text-sm">Low stock notifications</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <CreditCard size={20} className="text-green-400 mb-2" />
                <h4 className="text-star-dust font-bold">Payout History</h4>
                <p className="text-star-dust/60 text-sm">Track your earnings</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Heart size={20} className="text-pink-400 mb-2" />
                <h4 className="text-star-dust font-bold">Covenant Pledge</h4>
                <p className="text-star-dust/60 text-sm">Set your voluntary community contribution</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <TrendingUp size={20} className="text-purple-400 mb-2" />
                <h4 className="text-star-dust font-bold">Residual Settings</h4>
                <p className="text-star-dust/60 text-sm">Set each ware&apos;s residual pledge</p>
              </div>
            </div>
          </div>
          
          {/* Best Practices */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-star-dust mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded-full" />
              Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-star-dust font-bold">📸 High-quality images</h4>
                <p className="text-star-dust/60 text-sm">Make more sales with clear, attractive photos</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-star-dust font-bold">📝 Clear descriptions</h4>
                <p className="text-star-dust/60 text-sm">Reduce returns with detailed specifications</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-star-dust font-bold">🚚 Fast shipping</h4>
                <p className="text-star-dust/60 text-sm">Build reputation with quick fulfillment</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-star-dust font-bold">💬 Respond to messages</h4>
                <p className="text-star-dust/60 text-sm">Happy customers come back</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-star-dust font-bold">❤️ Consider covenant pledge</h4>
                <p className="text-star-dust/60 text-sm">Support community dignity—voluntary and appreciated</p>
              </div>
            </div>
          </div>
          
          {/* Digital vs Physical */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-star-dust mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-400 rounded-full" />
              Digital vs Physical
            </h2>
            <InfoTable 
              headers={['Aspect', 'Digital', 'Physical']}
              rows={[
                ['Delivery', 'Automatic', 'You ship'],
                ['Inventory', 'Unlimited', 'Track carefully'],
                ['Returns', 'Rare', 'Handle individually'],
                ['Fees', 'Same (10%)', 'Same (10%)'],
                ['Best for', 'Courses, templates, art', 'Books, merch, supplies'],
              ]}
              variant="comparison"
            />
          </div>
          
          {/* Support */}
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
                <span className="text-pink-400">Shipping help</span>
                <p className="text-star-dust/40">Community forums</p>
              </div>
            </div>
          </div>
          
          <NextSteps 
            steps={[
              "Complete merchant application",
              "Pass verification",
              "Connect Stripe",
              "List first product",
              "Make first sale! 🎉",
              "Optional: Set covenant pledge in profile",
              "Optional: Set each ware's residual pledge"
            ]}
            actionText="Apply to Become a Merchant"
            actionLink="/council/applications/vendor"
          />
        </div>
      </main>
    </Page>
  );
}