// app/(auth)/checkout/cancel/page.tsx
import Link from "next/link";
import { Page } from "@/components/bifrost/Page";
import { Card } from "@/components/runes/Card";
import { Button } from "@/components/yggdrasil/Button";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Exchange Set Aside | The Exchange | Sovereign Sanctuary",
  description: "Your exchange was set aside",
};

export default function CheckoutCancelPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
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
            <h2 className="text-xl font-semibold text-star-dust mb-2">Exchange Set Aside</h2>
            <p className="text-star-dust/60 mb-1">
              Your exchange was set aside. No charges have been made.
            </p>
            <p className="text-star-dust/40 text-sm italic mb-6">Gweld ti&apos;n fuan — the Bazaar keeps no ledger of this.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/bazaar">
                <Button>Return to the Bazaar</Button>
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