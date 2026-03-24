//NEW//
// src/app/(dashboard)/creator/apply/page.tsx

import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import CreatorApplicationForm from '@/components/apply/CreatorApplicationForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, Palette } from 'lucide-react';
import { CollapsibleSplitView } from '@/components/ui/CollapsibleSplitView';
import path from 'path';
import fs from 'fs/promises';

export const metadata: Metadata = {
  title: 'Apply to Become a Creator | AUDHDITIES',
  description: 'Share your gifts with the sanctuary',
};

export default async function CreatorApplyPage() {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Check if user already has a pending application
  const { data: existingApplication } = await supabase
    .from('applications')
    .select('status')
    .eq('user_id', user.id)
    .eq('application_type', 'creator')
    .maybeSingle();

  // If they already have an application, show status
  if (existingApplication) {
    return (
      <AuthGuard>
        <main className="min-h-screen py-20 px-6">
          <div className="container max-w-3xl mx-auto">
            <Card className="p-8 text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Application Already Submitted</h1>
              
              {existingApplication.status === 'pending' && (
                <>
                  <p className="text-white/70 mb-4">
                    Your creator application is currently under review. We'll notify you once a decision has been made.
                  </p>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                    <p className="text-yellow-400">Status: Pending Review</p>
                  </div>
                </>
              )}
              
              {existingApplication.status === 'verified' && (
                <>
                  <p className="text-white/70 mb-4">
                    You are already a verified creator! Visit your creator dashboard to manage your products.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                    <p className="text-green-400">Status: Verified Creator</p>
                  </div>
                </>
              )}
              
              {existingApplication.status === 'rejected' && (
                <>
                  <p className="text-white/70 mb-4">
                    Your previous application was not approved at this time. You may reapply with additional information.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                    <p className="text-red-400">Status: Not Approved</p>
                  </div>
                </>
              )}
              
              <div className="flex gap-4 justify-center">
                <a
                  href="/dashboard"
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  Return to Dashboard
                </a>
                {existingApplication.status === 'rejected' && (
                  <a
                    href="/creator/apply?reset=true"
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
                  >
                    Apply Again
                  </a>
                )}
              </div>
            </Card>
          </div>
        </main>
      </AuthGuard>
    );
  }

  // Read the onboarding markdown file
  let onboardingContent = '';
  try {
    const filePath = path.join(process.cwd(), 'docs', 'guides', 'creator-onboarding.md');
    onboardingContent = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading onboarding doc:', error);
    onboardingContent = '# Creator Onboarding\n\nWelcome to the creator application process. Please fill out the form below to begin your journey.';
  }

  return (
    <AuthGuard>
      <main className="min-h-screen py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Become a Creator
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Share your gifts with the sanctuary and earn residuals for life
            </p>
          </div>

          {/* Collapsible Split View */}
          <CollapsibleSplitView
            leftLabel="Creator Guide"
            rightLabel="Application Form"
            leftPanel={
			  <Card className="p-6 h-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
				<div className="flex items-center gap-3 mb-4">
				  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
					<BookOpen size={20} className="text-purple-400" />
				  </div>
				  <h2 className="text-xl font-bold text-white">Your Journey as a Creator</h2>
				</div>
				
				<div className="space-y-4 text-white/70">
				  <p className="text-sm">Becoming a creator means joining a community of artists, makers, and visionaries who share their gifts with the world while earning residual income forever.</p>
				  
				  <div className="bg-white/5 rounded-lg p-4">
					<h3 className="text-cyan-400 font-medium mb-2">What you'll need:</h3>
					<ul className="space-y-1 text-sm">
					  <li>✓ A portfolio or examples of your work</li>
					  <li>✓ Your creative story (we want to hear it!)</li>
					  <li>✓ Ideas for your first product</li>
					</ul>
				  </div>
				  
				  <div className="bg-white/5 rounded-lg p-4">
					<h3 className="text-purple-400 font-medium mb-2">What you'll receive:</h3>
					<ul className="space-y-1 text-sm">
					  <li>✨ 70% of all sales (or more, you choose)</li>
					  <li>✨ Forever residuals for your contributors</li>
					  <li>✨ A gallery to showcase your work</li>
					  <li>✨ Community of fellow creators</li>
					</ul>
				  </div>
				</div>
				
				<Link href="/docs/guides/creator-onboarding">
				  <Button 
					variant="outline" 
					className="w-full mt-6 group"
				  >
					<span>Read the Full Creator Guide</span>
					<ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
				  </Button>
				</Link>
			  </Card>	  
		   }			   
            rightPanel={
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Sparkles size={20} className="text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Application Form</h2>
                </div>
                
                <CreatorApplicationForm />
              </Card>
            }
          />

          {/* Help Text */}
          <p className="text-center text-sm text-white/40 mt-8">
            All information is stored securely and will only be used to evaluate your application.
            <br />
            By submitting, you agree to our{' '}
            <a href="/docs/terms" className="text-cyan-400 hover:underline">Terms of Service</a>.
          </p>
        </div>
      </main>
    </AuthGuard>
  );
}

