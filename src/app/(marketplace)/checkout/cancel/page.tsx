// app/(marketplace)/checkout/cancel/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { XCircle, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Purchase Canceled | AUDHDITIES',
  description: 'Your purchase was canceled',
};

export default function CheckoutCancelPage() {
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
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle size={40} className="text-red-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Purchase Canceled
            </h1>
            
            <p className="text-white/60 mb-8">
              Your purchase was canceled. No charges were made to your account.
              Feel free to try again or explore other products.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/marketplace">
                <Button size="lg">
                  <ShoppingBag size={18} className="mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Need Help?
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </Page>
  );
}