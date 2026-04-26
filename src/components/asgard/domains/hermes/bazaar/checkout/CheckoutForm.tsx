// components/commerce/CheckoutForm.tsx
// Checkout form - payment processing
// No address storage, just transaction

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/yggdrasil/Button";
import { Card } from "@/components/runes/Card";
import { Spinner } from "@/components/yggdrasil/Spinner";
import { CheckCircle, AlertCircle } from "lucide-react";

interface CheckoutFormProps {
  sessionId?: string;
  saleId?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function CheckoutForm({ sessionId, saleId, onSuccess, onError }: CheckoutFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const statusRef = useRef(status);
  statusRef.current = status;

  // Get session ID from URL if not passed as prop
  const effectiveSessionId = sessionId || searchParams?.get("session_id");

  useEffect(() => {
    if (!effectiveSessionId) {
      setStatus("error");
      setErrorMessage("No checkout session found");
      onError?.("No checkout session found");
      return;
    }

    let interval: NodeJS.Timeout | null = null;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/checkout/session/${effectiveSessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify checkout");
        }

        if (data.payment_status === "paid") {
          setStatus("success");
          onSuccess?.();
          if (interval) clearInterval(interval);
        } else if (data.status === "expired") {
          setStatus("error");
          setErrorMessage("Checkout session expired");
          onError?.("Checkout session expired");
          if (interval) clearInterval(interval);
        } else {
          setStatus("pending");
        }
      } catch (err) {
        setStatus("error");
        const msg = err instanceof Error ? err.message : "Verification failed";
        setErrorMessage(msg);
        onError?.(msg);
        if (interval) clearInterval(interval);
      }
    };

    // Check immediately
    checkStatus();

    // Poll every 2 seconds if still pending
    interval = setInterval(() => {
      if (statusRef.current === "pending") {
        checkStatus();
      } else if (interval) {
        clearInterval(interval);
      }
    }, 2000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [effectiveSessionId]); // Only re-run if session ID changes

  if (status === "loading") {
    return (
      <Card
        data={{ id: 'checkout-verify', title: 'Verifying Payment', type: 'product' }}
        variant="default"
        radius="lg"
        shadow="md"
        padding="xl"
        className="text-center"
      >
        <Spinner className="w-8 h-8 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[var(--color-star-dust)] mb-2">Verifying Payment</h2>
        <p className="text-[var(--color-star-dust)]/60">Please wait while we confirm your transaction...</p>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card
        data={{ id: 'checkout-process', title: 'Payment Processing', type: 'product' }}
        variant="default"
        radius="lg"
        shadow="md"
        padding="xl"
        className="text-center"
      >
        <div className="w-12 h-12 rounded-full bg-[var(--color-warning)]/20 flex items-center justify-center mx-auto mb-4">
          <Spinner className="w-6 h-6 text-[var(--color-warning)]" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--color-star-dust)] mb-2">Payment Processing</h2>
        <p className="text-[var(--color-star-dust)]/60 mb-4">Your payment is being processed. This may take a moment.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Status
        </Button>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card
        data={{ id: 'checkout-error', title: 'Payment Failed', type: 'product' }}
        variant="default"
        radius="lg"
        shadow="md"
        padding="xl"
        className="text-center"
      >
        <div className="w-12 h-12 rounded-full bg-[var(--color-error)]/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-[var(--color-error)]" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--color-star-dust)] mb-2">Payment Failed</h2>
        <p className="text-[var(--color-star-dust)]/60 mb-4">{errorMessage || "Something went wrong. Please try again."}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </Card>
    );
  }

  return (
    <Card
      data={{ id: 'checkout-success', title: 'Payment Successful', type: 'product' }}
      variant="default"
      radius="lg"
      shadow="md"
      padding="xl"
      className="text-center"
    >
      <div className="w-12 h-12 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-6 h-6 text-[var(--color-success)]" />
      </div>
      <h2 className="text-xl font-semibold text-[var(--color-star-dust)] mb-2">Payment Successful!</h2>
      <p className="text-[var(--color-star-dust)]/60 mb-4">
        Your transaction has been completed successfully.
      </p>
      <div className="flex gap-3 justify-center">
        <Button onClick={() => router.push("/bazaar/creations")}>
          Continue Shopping
        </Button>
        <Button variant="outline" onClick={() => router.push("/vessel")}>
          View My Purchases
        </Button>
      </div>
    </Card>
  );
}