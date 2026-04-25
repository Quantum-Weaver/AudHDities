// app/components/asgard/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/forging/Input";
import { Form, FormActions } from "@/components/forging/Form";
import { FormField } from "@/components/forging/FormField";
import { Alert } from "@/components/seidr/Alert";
import { Button } from "@/components/yggdrasil/Button";

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = "/dashboard" }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const redirect = searchParams.get("redirect") || redirectTo;

  const handleSubmit = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await signIn(data.email as string, data.password as string);

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Return to the Sanctuary</h1>
        <p className="text-white/60">Enter your credentials to continue</p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField label="Email" required>
          <Input
            name="email"
            type="email"
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </FormField>

        <FormActions>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Entering..." : "Enter the Sanctuary"}
          </Button>
        </FormActions>
      </Form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-white/40 text-sm">
          <a href="/forgot-password" className="text-cyan-400 hover:underline">
            Forgot your password?
          </a>
        </p>
        <p className="text-white/40 text-sm">
          New to the Sanctuary?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Initialize Consciousness
          </a>
        </p>
      </div>
    </div>
  );
}