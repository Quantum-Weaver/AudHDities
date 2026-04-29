// app/(auth)/checkout/cancel/page.tsx
import Link from "next/link";
import { Page } from "@/components/bifrost/Page";
import { Card } from "@/components/runes/Card";
import { Button } from "@/components/yggdrasil/Button";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Checkout Cancelled | Sovereign Sanctuary",
  description: "Your purchase was cancelled",
};

export default function CheckoutCancelPage() {
  return (
    <Page 
      variant={1}
      environment="home"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <Card 
            data={{ id: 'checkout-cancel', type: 'value', title: 'Self-Perpetuating', value: '' }}
            variant="glass"
            radius="lg"
            shadow="md"
            className="p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Checkout Cancelled</h2>
            <p className="text-white/60 mb-6">
              Your purchase was cancelled. No charges have been made.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/bazaar">
                <Button>Continue Shopping</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Return Home</Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </Page>
  );
}