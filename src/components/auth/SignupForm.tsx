// components/auth/SignupForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCreateProfiles } from "@/hooks/generated/hestia-core/profiles";
import { ProfilesInsertSchema } from "@/lib/validators/generated/hestia-core/profiles";
import { Input, Checkbox, Form, FormField, FormActions, Alert, Button } from "@/components/ui";

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({ redirectTo = "/questionaire" }: SignupFormProps) {
  const router = useRouter();
  const { signUp } = useAuth();
  const { create: createProfile } = useCreateProfiles();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    accept_terms: false,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string | boolean) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (values.password !== values.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    if (!values.accept_terms) {
      newErrors.accept_terms = "You must accept the terms to continue";
    }
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Sign up via useAuth
    const { error: signUpError } = await signUp(values.email, values.password, {
      username: values.username,
      display_name: values.username,
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    // Profile is created automatically by the signup API route
    // Redirect to questionnaire
    router.push(redirectTo);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Initialize Consciousness</h1>
        <p className="text-white/60">Join the Sovereign Sanctuary</p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <FormField label="Username" required error={fieldErrors.username}>
          <Input
            type="text"
            value={values.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Choose a username"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Email" required error={fieldErrors.email}>
          <Input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Password" required error={fieldErrors.password}>
          <Input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Create a password (min 6 characters)"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Confirm Password" required error={fieldErrors.confirm_password}>
          <Input
            type="password"
            value={values.confirm_password}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
        </FormField>

        <FormField error={fieldErrors.accept_terms}>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={values.accept_terms}
              onChange={(e) => handleChange("accept_terms", e.target.checked)}
              disabled={isLoading}
            />
            <label className="text-sm text-white/80">
              I agree to the{" "}
              <a href="/terms" className="text-cyan-400 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>
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
        <p className="text-white/40 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Return to the Sanctuary
          </a>
        </p>
      </div>
    </div>
  );
}