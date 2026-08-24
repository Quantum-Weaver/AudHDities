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
import {
  AUTH_LABELS,
  AUTH_PLACEHOLDERS,
  AUTH_ROUTES,
} from "@/lib/constants/components/asgard/auth/auth.constants";
import {
  authHeadingVariants,
  authLabelTextVariants,
  authLinkVariants,
  authMutedTextVariants,
  authSubtextVariants,
} from "@/lib/constants/components/asgard/auth/auth.variants";

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({ redirectTo = AUTH_ROUTES.QUESTIONNAIRE }: SignupFormProps) {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [offered, setOffered] = useState(false);

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

    // KP ⚛ 2026-08-24, answer 1: "need a felt 'not now'". The Acid Test is
    // offered here and answered here; it is never routed into unasked.
    setIsLoading(false);
    setOffered(true);
  };

  if (offered) {
    return (
      <div className="w-full text-center">
        <h2 className="text-xl font-bold text-star-dust mb-2">
          {AUTH_LABELS.ACID_OFFER_HEADING}
        </h2>
        <p className={`${authSubtextVariants()} mb-6`}>
          {AUTH_LABELS.ACID_OFFER_BODY}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => router.push(redirectTo)} className="w-full">
            {AUTH_LABELS.ACID_OFFER_TAKE}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(AUTH_ROUTES.DASHBOARD)}
            className="w-full"
          >
            {AUTH_LABELS.ACID_OFFER_NOT_NOW}
          </Button>
        </div>

        <p className={`${authMutedTextVariants()} mt-4`}>
          {AUTH_LABELS.ACID_OFFER_FOOTNOTE}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className={authHeadingVariants()}>{AUTH_LABELS.SIGNUP_HEADING}</h1>
        <p className={authSubtextVariants()}>{AUTH_LABELS.SIGNUP_SUBHEADING}</p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField label="Username" required error={fieldErrors.username}>
          <Input
            name="username"
            type="text"
            placeholder={AUTH_PLACEHOLDERS.USERNAME}
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Email" required error={fieldErrors.email}>
          <Input
            name="email"
            type="email"
            placeholder={AUTH_PLACEHOLDERS.EMAIL}
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Password" required error={fieldErrors.password}>
          <Input
            name="password"
            type="password"
            placeholder={AUTH_PLACEHOLDERS.CREATE_PASSWORD}
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Confirm Password" required error={fieldErrors.confirm_password}>
          <Input
            name="confirm_password"
            type="password"
            placeholder={AUTH_PLACEHOLDERS.CONFIRM_PASSWORD}
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
            <label htmlFor="accept-terms" className={`${authLabelTextVariants()} cursor-pointer select-none`}>
              {AUTH_LABELS.ACCEPT_TERMS}{" "}
              <a href={AUTH_ROUTES.TERMS} className={authLinkVariants()}>
                {AUTH_LABELS.TERMS_OF_SERVICE}
              </a>
              {" "}{AUTH_LABELS.AND}{" "}
              <a href={AUTH_ROUTES.PRIVACY} className={authLinkVariants()}>
                {AUTH_LABELS.PRIVACY_POLICY}
              </a>
            </label>
          </div>
        </FormField>

        <FormActions>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? AUTH_LABELS.OPENING_DOOR : AUTH_LABELS.JOIN_SANCTUARY}
          </Button>
        </FormActions>
      </Form>

      <div className="mt-6 text-center">
        <p className={authMutedTextVariants()}>
          {AUTH_LABELS.BEEN_HERE_BEFORE}{" "}
          <a href={AUTH_ROUTES.LOGIN} className={authLinkVariants()}>
            {AUTH_LABELS.RETURN_SANCTUARY}
          </a>
        </p>
      </div>
    </div>
  );
}
