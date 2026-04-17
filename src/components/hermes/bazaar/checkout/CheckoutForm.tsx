// components/commerce/CheckoutForm.tsx
// Checkout form - payment processing
// No address storage, just transaction

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
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

  // Get session ID from URL if not passed as prop
  const effectiveSessionId = sessionId || searchParams?.get("session_id");
  const effectiveSaleId = saleId || searchParams?.get("sale_id");

  useEffect(() => {
    if (!effectiveSessionId) {
      setStatus("error");
      setErrorMessage("No checkout session found");
      onError?.("No checkout session found");
      return;
    }

    // Check session status
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
        } else if (data.status === "expired") {
          setStatus("error");
          setErrorMessage("Checkout session expired");
          onError?.("Checkout session expired");
        } else {
          setStatus("pending");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Verification failed");
        onError?.(err instanceof Error ? err.message : "Verification failed");
      }
    };

    // Check immediately, then poll if pending
    checkStatus();

    if (status === "pending") {
      const interval = setInterval(checkStatus, 2000);
      return () => clearInterval(interval);
    }
  }, [effectiveSessionId, effectiveSaleId, onSuccess, onError, status]);

  if (status === "loading") {
    return (
      <Card className="p-8 text-center">
        <Spinner className="w-8 h-8 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Verifying Payment</h2>
        <p className="text-white/60">Please wait while we confirm your transaction...</p>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card className="p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
          <Spinner className="w-6 h-6 text-yellow-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Payment Processing</h2>
        <p className="text-white/60 mb-4">Your payment is being processed. This may take a moment.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Status
        </Button>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Payment Failed</h2>
        <p className="text-white/60 mb-4">{errorMessage || "Something went wrong. Please try again."}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-6 h-6 text-green-400" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">Payment Successful!</h2>
      <p className="text-white/60 mb-4">
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