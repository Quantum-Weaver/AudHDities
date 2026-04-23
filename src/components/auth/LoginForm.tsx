// components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input, Form, FormField, FormActions, Alert, Button } from "@/components/ui";

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = "/dashboard" }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  const redirect = searchParams.get("redirect") || redirectTo;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await signIn(values.email, values.password);

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
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
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
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