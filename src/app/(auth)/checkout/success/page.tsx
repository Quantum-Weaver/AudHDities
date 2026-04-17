// app/(auth)/checkout/success/page.tsx
import { Suspense } from "react";
import { Page } from "@/components/layout/Page";
import { CheckoutForm } from "@/components/hermes/bazaar/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout Success | Sovereign Sanctuary",
  description: "Your purchase was successful",
};

export default function CheckoutSuccessPage() {
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
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="animate-pulse text-white/40">Loading...</div>
            </div>
          }>
            <CheckoutForm />
          </Suspense>
        </div>
      </main>
    </Page>
  );
}