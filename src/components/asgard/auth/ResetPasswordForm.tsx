// app/components/asgard/auth/ResetPasswordForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function ResetPasswordForm() {
  const router = useRouter();
  const { updatePassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Record<string, any>) => {
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError("The passwords do not match — try them again, no hurry.");
      return;
    }

    setIsLoading(true);
    const { error: updateError } = await updatePassword(data.password as string);

    if (updateError) {
      setError(updateError.message);
      setIsLoading(false);
      return;
    }

    router.push(AUTH_ROUTES.DASHBOARD);
    router.refresh();
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-star-dust mb-2">Set a new password</h1>
        <p className="text-star-dust/60">Choose a new password for your vessel.</p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField label="New password" required>
          <Input
            name="password"
            type="password"
            placeholder={AUTH_PLACEHOLDERS.NEW_PASSWORD}
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Confirm password" required>
          <Input
            name="confirmPassword"
            type="password"
            placeholder={AUTH_PLACEHOLDERS.CONFIRM_PASSWORD}
            disabled={isLoading}
          />
        </FormField>

        <FormActions>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? AUTH_LABELS.SETTING_PASSWORD : AUTH_LABELS.SET_NEW_PASSWORD}
          </Button>
        </FormActions>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          <a href={AUTH_ROUTES.LOGIN} className="text-neurospark hover:underline">
            {AUTH_LABELS.BACK_TO_LOGIN}
          </a>
        </p>
      </div>
    </div>
  );
}
