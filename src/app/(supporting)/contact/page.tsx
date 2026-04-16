// app/(supporting)/contact/page.tsx
// The Hearth Call - Contact form, support options
// Feeling: Welcoming, responsive, helpful

'use client';

import { useState } from 'react';
import { Page } from '@/components/arrchive/layout/Page';
import { ContactForm } from '@/components/supporting/ContactForm';
import { SupportOptions } from '@/components/supporting/SupportOptions';
import { ResponseTime } from '@/components/supporting/ResponseTime';
import { LiveChatButton } from '@/components/supporting/LiveChatButton';
import { FAQSection } from '@/components/supporting/FAQSection';

export const metadata = {
  title: 'The Hearth Call | Sovereign Sanctuary',
  description: 'Get in touch with us'
};

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <Page 
      variant={2}
      environment="support"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Hearth Call
            </h1>
            <p className="text-white/60">
              We're here for you
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!formSubmitted ? (
                <ContactForm onSuccess={() => setFormSubmitted(true)} />
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
                  <div className="text-4xl mb-4">📬</div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">
                    We'll respond within 24-48 hours.
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-8">
              <SupportOptions />
              <ResponseTime />
              <LiveChatButton />
            </div>
          </div>

          <div className="mt-12">
            <FAQSection />
          </div>
        </div>
      </main>
    </Page>
  );
}