// app/components/asgard/auth/SignupForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/forging/Input";
import { Checkbox } from "@/components/forging/Checkbox";
import { Form, FormActions } from "@/components/forging/Form";
import { FormField } from "@/components/forging/FormField";
import { Alert } from "@/components/seidr/Alert";
import { Button } from "@/components/yggdrasil/Button";
import { pwnedCount, PWNED_MESSAGE } from "@/lib/auth/pwned";

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({ redirectTo = "/questionaire" }: SignupFormProps) {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const email = data.email as string;
    const password = data.password as string;
    const username = data.username as string;
    const confirmPassword = data.confirm_password as string;
    const acceptTerms = data.accept_terms === "on";

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (password !== confirmPassword) {
      newErrors.confirm_password = "Passwords do not match";
    }
    if (!acceptTerms) {
      newErrors.accept_terms = "You must accept the terms to continue";
    }
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Leaked-password protection, the house's own hand (Run 08, Movement
    // III): k-anonymous HIBP range check — the password never leaves this
    // device; fails open if HIBP is unreachable. See lib/auth/pwned.ts.
    const breaches = await pwnedCount(password);
    if (breaches !== null && breaches > 0) {
      setFieldErrors({ password: PWNED_MESSAGE });
      setIsLoading(false);
      return;
    }

    // Sign up via useAuth
    const { error: signUpError } = await signUp(email, password, {
      username,
      display_name: username,
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    router.push(redirectTo);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-star-dust mb-2">Initialize Consciousness</h1>
        <p className="text-star-dust/60">Join the Sovereign Sanctuary</p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField label="Username" required error={fieldErrors.username}>
          <Input
            name="username"
            type="text"
            placeholder="Choose a username"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Email" required error={fieldErrors.email}>
          <Input
            name="email"
            type="email"
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Password" required error={fieldErrors.password}>
          <Input
            name="password"
            type="password"
            placeholder="Create a password (min 6 characters)"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Confirm Password" required error={fieldErrors.confirm_password}>
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm your password"
            disabled={isLoading}
          />
        </FormField>

        <FormField error={fieldErrors.accept_terms}>
          <div className="flex items-center gap-2">
            <Checkbox
              id="accept-terms"
              name="accept_terms"
              disabled={isLoading}
            />
            <label htmlFor="accept-terms" className="text-sm text-star-dust/80 cursor-pointer select-none">
              I agree to the{" "}
              <a href="/terms" className="text-neurospark hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="/privacy" className="text-neurospark hover:underline">Privacy Policy</a>
            </label>
          </div>
        </FormField>

        <FormActions>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating Account..." : "Join the Sanctuary"}
          </Button>
        </FormActions>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-star-dust/40 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-neurospark hover:underline">
            Return to the Sanctuary
          </a>
        </p>
      </div>
    </div>
  );
}