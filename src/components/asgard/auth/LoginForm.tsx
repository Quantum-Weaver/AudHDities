// app/components/asgard/auth/LoginForm.tsx
"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/forging/Input";
import { Form, FormActions } from "@/components/forging/Form";
import { FormField } from "@/components/forging/FormField";
import { Alert } from "@/components/seidr/Alert";
import { Button } from "@/components/yggdrasil/Button";
import {
  AUTH_ERRORS,
  AUTH_ERROR_PARAM,
  AUTH_LABELS,
  AUTH_MESSAGES,
  AUTH_PLACEHOLDERS,
  AUTH_REDIRECT_PARAM,
  AUTH_ROUTES,
} from "@/lib/constants/components/asgard/auth/auth.constants";
import {
  authHeadingVariants,
  authLinkVariants,
  authMutedTextVariants,
  authSubtextVariants,
} from "@/lib/constants/components/asgard/auth/auth.variants";

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = AUTH_ROUTES.DASHBOARD }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signInWithLink } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const redirect = searchParams.get(AUTH_REDIRECT_PARAM) || redirectTo;
  const arrivalError = searchParams.get(AUTH_ERROR_PARAM);

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

  const handleMagicLink = async () => {
    if (!email) {
      emailRef.current?.focus();
      return;
    }

    setIsSendingLink(true);
    setError(null);

    const linkTarget = `${window.location.origin}${AUTH_ROUTES.CALLBACK}?next=${AUTH_ROUTES.DASHBOARD}`;
    await signInWithLink(email, linkTarget);

    setIsSendingLink(false);
    setLinkSent(true);
  };

  if (linkSent) {
    return (
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className={authHeadingVariants()}>{AUTH_LABELS.MAGIC_LINK_SENT_HEADING}</h1>
          <p className={authSubtextVariants()}>{AUTH_LABELS.MAGIC_LINK_SENT_BODY}</p>
        </div>

        <p className={`${authMutedTextVariants()} text-center mb-6`}>
          {AUTH_LABELS.DIDNT_ARRIVE}
        </p>

        <p className="text-center text-sm">
          <button
            type="button"
            onClick={() => setLinkSent(false)}
            className={authLinkVariants()}
          >
            {AUTH_LABELS.PASSWORD_INSTEAD}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className={authHeadingVariants()}>{AUTH_LABELS.LOGIN_HEADING}</h1>
        <p className={authSubtextVariants()}>{AUTH_LABELS.LOGIN_SUBHEADING}</p>
      </div>

      {arrivalError === AUTH_ERRORS.CALLBACK_FAILED && (
        <Alert
          variant="error"
          className="mb-6"
          title={AUTH_MESSAGES.CALLBACK_FAILED.title}
        >
          <p>{AUTH_MESSAGES.CALLBACK_FAILED.body}</p>
          <p className="mt-3 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => emailRef.current?.focus()}
              className={authLinkVariants()}
            >
              {AUTH_MESSAGES.CALLBACK_FAILED.newLink}
            </button>
            <a href={AUTH_ROUTES.FORGOT_PASSWORD} className={authLinkVariants()}>
              {AUTH_MESSAGES.CALLBACK_FAILED.newPassword}
            </a>
          </p>
        </Alert>
      )}

      {arrivalError === AUTH_ERRORS.RECOVERY_MISSING && (
        <Alert variant="info" className="mb-6">
          {AUTH_MESSAGES.RECOVERY_MISSING.body}
        </Alert>
      )}

      {error && (
        <Alert variant="error" className="mb-6">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField label="Email" required>
          <Input
            ref={emailRef}
            name="email"
            type="email"
            placeholder={AUTH_PLACEHOLDERS.EMAIL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSendingLink}
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            name="password"
            type="password"
            placeholder={AUTH_PLACEHOLDERS.PASSWORD}
            disabled={isLoading || isSendingLink}
          />
        </FormField>

        <FormActions>
          <Button type="submit" disabled={isLoading || isSendingLink} className="w-full">
            {isLoading ? AUTH_LABELS.ENTERING : AUTH_LABELS.ENTER_SANCTUARY}
          </Button>
        </FormActions>
      </Form>

      <div className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-star-dust/15" />
        <span className="text-sm text-star-dust/70">{AUTH_LABELS.OR}</span>
        <span className="h-px flex-1 bg-star-dust/15" />
      </div>

      <div className="mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleMagicLink}
          disabled={isLoading || isSendingLink}
          className="w-full"
        >
          {isSendingLink ? AUTH_LABELS.MAGIC_LINK_SENDING : AUTH_LABELS.MAGIC_LINK}
        </Button>
        <p className={`${authMutedTextVariants()} mt-3 text-center`}>
          {AUTH_LABELS.MAGIC_LINK_EXPLAINER}
        </p>
      </div>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm">
          <a href={AUTH_ROUTES.FORGOT_PASSWORD} className={authLinkVariants()}>
            {AUTH_LABELS.FORGOT_PASSWORD}
          </a>
        </p>
        <p className={authMutedTextVariants()}>
          {AUTH_LABELS.NEW_TO_SANCTUARY}{" "}
          <a href={AUTH_ROUTES.SIGNUP} className={authLinkVariants()}>
            {AUTH_LABELS.COME_IN}
          </a>
        </p>
      </div>
    </div>
  );
}
