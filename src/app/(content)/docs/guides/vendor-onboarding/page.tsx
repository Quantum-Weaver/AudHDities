// app/(content)/docs/guides/vendor-onboarding/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/layout/Page';
import { OnboardingHero } from '@/components/onboarding/OnboardingHero';
import { StepCard } from '@/components/onboarding/StepCard';
import { InfoTable } from '@/components/onboarding/InfoTable';
import { ChecklistItem } from '@/components/onboarding/ChecklistItem';
import { NextSteps } from '@/components/onboarding/NextSteps';
import { Store, CreditCard, Package, Truck, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vendor Onboarding | AUDHDITIES',
  description: 'Learn how to become a vendor on AUDHDITIES and start selling your products',
};

export default async function VendorOnboardingPage() {
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
          title="Vendor Onboarding"
          subtitle="Start selling your products to the sanctuary community"
          icon={<Store size={14} className="text-cyan-400" />}
          lastUpdated="March 15, 2026"
        />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20">
          
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Welcome, vendor! This guide walks you through becoming a vendor on AUDHDITIES—someone who sells physical or digital goods through our marketplace.
            </p>
          </div>
          
          {/* Prerequisites */}
          <div className="mb-12 bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full" />
              Prerequisites
            </h2>
            <div className="space-y-2">
              <ChecklistItem text="A registered account" completed />
              <ChecklistItem text="Verified email address" completed />
              <ChecklistItem text="Business details ready (legal name, tax info)" />
            </div>
          </div>
          
          {/* Step 1: Apply */}
          <StepCard step={1} title="Apply for Vendor Status">
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Log in to your dashboard</li>
              <li>Click "Become a Vendor" in the sidebar</li>
              <li>Fill out the application:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-white">Business name</strong>: Your public-facing name</li>
                  <li><strong className="text-white">Legal business name</strong>: For tax purposes</li>
                  <li><strong className="text-white">Business type</strong>: Individual, LLC, Corporation, etc.</li>
                  <li><strong className="text-white">Description</strong>: What do you sell?</li>
                  <li><strong className="text-white">Website/portfolio</strong>: Optional but recommended</li>
                </ul>
              </li>
              <li>Submit for review</li>
            </ol>
          </StepCard>
          
          {/* Step 2: Verification */}
          <StepCard step={2} title="Verification Process">
            <p className="text-white/70 mb-4">Vendor applications require additional verification:</p>
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Identity check (for individuals)</li>
              <li>Business registration (for companies)</li>
              <li>Tax ID verification (EIN or SSN)</li>
            </ol>
            <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-cyan-400 text-sm">⏱️ This typically takes 2-5 business days.</p>
            </div>
          </StepCard>
          
          {/* Step 3: Stripe Connect */}
          <StepCard step={3} title="Set Up Payments (Stripe Connect)">
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Go to Vendor Dashboard → Payments</li>
              <li>Click "Connect Stripe Account"</li>
              <li>Complete Stripe onboarding (tax info, bank details)</li>
              <li>Stripe verifies and activates your account</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <CreditCard size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">Stripe handles all payment processing securely. We never see your bank details.</p>
            </div>
          </StepCard>
          
          {/* Step 4: List Product */}
          <StepCard step={4} title="List Your First Product">
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>Go to Vendor Dashboard → Products</li>
              <li>Click "New Product"</li>
              <li>Fill in:
                <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                  <li><strong className="text-white">Title</strong>: Clear product name</li>
                  <li><strong className="text-white">Description</strong>: Details, specifications</li>
                  <li><strong className="text-white">Price</strong>: Set your price (in USD)</li>
                  <li><strong className="text-white">Inventory</strong>: Track quantity (if physical)</li>
                  <li><strong className="text-white">Shipping</strong>: Dimensions, weight (if physical)</li>
                  <li><strong className="text-white">Digital download</strong>: Upload file (if digital)</li>
                  <li><strong className="text-white">Categories</strong>: Help buyers find you</li>
                </ul>
              </li>
              <li>Add images (high quality, multiple angles)</li>
              <li>Set as draft or publish</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Package size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">Pro tip: High-quality images lead to more sales. Show your product from multiple angles!</p>
            </div>
          </StepCard>
          
          {/* Step 5: Manage Orders */}
          <StepCard step={5} title="Manage Orders" isLast>
            <p className="text-white/70 mb-4">When someone buys your product:</p>
            <ol className="list-decimal list-inside space-y-2 text-white/70 ml-4">
              <li>You receive email notification</li>
              <li>Dashboard shows order details</li>
              <li>For digital: automatic delivery</li>
              <li>For physical: you fulfill and ship</li>
              <li>Mark as shipped when complete</li>
            </ol>
            <div className="mt-4 flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <Truck size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm">Physical products must be shipped within 3 business days. Digital products are delivered automatically.</p>
            </div>
          </StepCard>
          
          {/* Fees Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full" />
              Fees
            </h2>
            <InfoTable 
              headers={['Fee Type', 'Amount', 'Notes']}
              rows={[
                ['Platform fee', '5-10%', 'Based on volume'],
                ['Stripe fee', '2.9% + $0.30', 'Per transaction'],
                ['Payout fee', '$0.25', 'Weekly transfers'],
              ]}
              variant="pricing"
            />
          </div>
          
          {/* Vendor Dashboard */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-400 rounded-full" />
              Vendor Dashboard
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <BarChart3 size={20} className="text-cyan-400 mb-2" />
                <h4 className="text-white font-bold">Sales Overview</h4>
                <p className="text-white/60 text-sm">Sales today/week/month</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Package size={20} className="text-purple-400 mb-2" />
                <h4 className="text-white font-bold">Pending Orders</h4>
                <p className="text-white/60 text-sm">Orders waiting for fulfillment</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Truck size={20} className="text-pink-400 mb-2" />
                <h4 className="text-white font-bold">Inventory Alerts</h4>
                <p className="text-white/60 text-sm">Low stock notifications</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <CreditCard size={20} className="text-green-400 mb-2" />
                <h4 className="text-white font-bold">Payout History</h4>
                <p className="text-white/60 text-sm">Track your earnings</p>
              </div>
            </div>
          </div>
          
          {/* Best Practices */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-400 rounded-full" />
              Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-bold">📸 High-quality images</h4>
                <p className="text-white/60 text-sm">Make more sales with clear, attractive photos</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-bold">📝 Clear descriptions</h4>
                <p className="text-white/60 text-sm">Reduce returns with detailed specifications</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-bold">🚚 Fast shipping</h4>
                <p className="text-white/60 text-sm">Build reputation with quick fulfillment</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-bold">💬 Respond to messages</h4>
                <p className="text-white/60 text-sm">Happy customers come back</p>
              </div>
            </div>
          </div>
          
          {/* Digital vs Physical */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-400 rounded-full" />
              Digital vs Physical
            </h2>
            <InfoTable 
              headers={['Aspect', 'Digital', 'Physical']}
              rows={[
                ['Delivery', 'Automatic', 'You ship'],
                ['Inventory', 'Unlimited', 'Track carefully'],
                ['Returns', 'Rare', 'Handle individually'],
                ['Fees', 'Same', 'Same'],
                ['Best for', 'Courses, templates, art', 'Books, merch, supplies'],
              ]}
              variant="comparison"
            />
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
                <span className="text-pink-400">Shipping help</span>
                <p className="text-white/40">Community forums</p>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <NextSteps 
            steps={[
              "Complete vendor application",
              "Pass verification",
              "Connect Stripe",
              "List first product",
              "Make first sale! 🎉"
            ]}
            actionText="Apply to Become a Vendor"
            actionLink="/vendor/apply"
          />
        </div>
      </main>
    </Page>
  );
}