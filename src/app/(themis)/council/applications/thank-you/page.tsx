// src/app/(themis)/council/applications/thank-you/page.tsx
import Link from 'next/link';
import { Page } from '@/components/bifrost/Page';
import { Card } from '@/components/runes/Card';

export const metadata = {
  title: 'Application Received | The Council | Sovereign Sanctuary',
  description: 'Your application is with the Council',
};

export default function ApplicationThankYouPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-20 px-6">
        <div className="container max-w-2xl mx-auto">
          <Card
            data={{ id: 'application-received', type: 'value', title: 'Application Received', value: '' }}
            variant="sanctuary"
            radius="xl"
            shadow="md"
            className="p-10 text-center"
          >
            <div className="text-5xl mb-4">🕯️</div>
            <h1 className="text-2xl font-bold text-star-dust mb-3">Your application is with the Council</h1>
            <p className="text-star-dust/60 mb-8">
              The Council reads every application in the order it arrives. The decision and any notes will
              appear beside your application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/council/applications"
                className="inline-flex items-center justify-center px-6 py-3 bg-neurospark/20 border border-neurospark/40 text-neurospark rounded-lg font-medium hover:bg-neurospark/30 transition-colors"
              >
                See your applications
              </Link>
              <Link
                href="/vessel"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/5 border border-white/10 text-star-dust rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Return to your vessel
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </Page>
  );
}
