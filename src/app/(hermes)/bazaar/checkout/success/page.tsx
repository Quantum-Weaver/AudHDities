// app/(auth)/checkout/success/page.tsx
import { Suspense } from "react";
import { Page } from "@/components/bifrost/Page";
import { CheckoutForm } from "@/components/asgard/domains/hermes/checkout/CheckoutForm";

export const metadata = {
  title: "Taken Into Your Keeping | The Exchange | Sovereign Sanctuary",
  description: "Your exchange is complete",
};

export default function CheckoutSuccessPage() {
  return (
    <Page 
      showForeground={false}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="animate-pulse text-star-dust/40">Loading...</div>
            </div>
          }>
            <CheckoutForm />
          </Suspense>
        </div>
      </main>
    </Page>
  );
}