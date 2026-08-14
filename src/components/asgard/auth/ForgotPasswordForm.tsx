// app/components/asgard/auth/ForgotPasswordForm.tsx
"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/forging/Input";
import { Form, FormActions } from "@/components/forging/Form";
import { FormField } from "@/components/forging/FormField";
import { Alert } from "@/components/seidr/Alert";
import { Button } from "@/components/yggdrasil/Button";
import {
  AUTH_LABELS,
  AUTH_PLACEHOLDERS,
  AUTH_ROUTES,
} from "@/lib/constants/components/asgard/auth/auth.constants";

export default function ForgotPasswordForm() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);

    // The recovery link lands on the existing callback, which exchanges the
    // code and carries the vessel on to the reset page via ?next=.
    const redirectTo = `${window.location.origin}${AUTH_ROUTES.CALLBACK}?next=${AUTH_ROUTES.RESET_PASSWORD}`;
    const { error: resetError } = await resetPassword(data.email as string, redirectTo);

    if (resetError) {
      setError(resetError.message);
      setIsLoading(false);
      return;
    }

    setSent(true);
    setIsLoading(false);
  };

  if (sent) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-star-dust mb-2">The link is on its way</h1>
          <p className="text-star-dust/60">
            If that address has a home here, a reset link is heading to it now.
            Take your time — the door will wait.
          </p>
        </div>
        <p className="text-star-dust/40 text-sm text-center">
          <a href={AUTH_ROUTES.LOGIN} className="text-neurospark hover:underline">
            {AUTH_LABELS.BACK_TO_LOGIN}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-star-dust mb-2">Reset your password</h1>
        <p className="text-star-dust/60">
          Enter your email and we&apos;ll send you a link to set a new one.
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField label="Email" required>
          <Input
            name="email"
            type="email"
            placeholder={AUTH_PLACEHOLDERS.EMAIL}
            disabled={isLoading}
          />
        </FormField>

        <FormActions>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? AUTH_LABELS.SENDING_RESET : AUTH_LABELS.SEND_RESET_LINK}
          </Button>
        </FormActions>
      </Form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-star-dust/40 text-sm">
          <a href={AUTH_ROUTES.LOGIN} className="text-neurospark hover:underline">
            {AUTH_LABELS.BACK_TO_LOGIN}
          </a>
        </p>
      </div>
    </div>
  );
}
