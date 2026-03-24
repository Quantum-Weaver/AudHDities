// app/(marketplace)/checkout/success/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Purchase Successful | AUDHDITIES',
  description: 'Thank you for your purchase',
};

export default function CheckoutSuccessPage() {
  return (
    <Page 
      variant={1}
      environment="marketplace"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <Card className="p-12">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Purchase Complete!
            </h1>
            
            <p className="text-white/60 mb-8">
              Thank you for your purchase. You'll receive a confirmation email shortly.
              Your download links are available in your dashboard.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg">
                  Go to Dashboard
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </Page>
  );
}