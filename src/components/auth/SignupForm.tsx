// components/auth/SignupForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase/client";
import { UnifiedForm } from "@/components/shared/UnifiedForm";
import type { FieldValue } from "@/types/components/ui/unified_form";

// Extended fields for signup (not in UnifiedForm yet)
const SIGNUP_FIELDS = [
  {
    name: "username",
    type: "text" as const,
    label: "Username",
    placeholder: "Choose a username",
    required: true,
  },
  {
    name: "email",
    type: "email" as const,
    label: "Email",
    placeholder: "your@email.com",
    required: true,
  },
  {
    name: "password",
    type: "password" as const,
    label: "Password",
    placeholder: "Create a password",
    required: true,
  },
  {
    name: "confirm_password",
    type: "password" as const,
    label: "Confirm Password",
    placeholder: "Confirm your password",
    required: true,
  },
  {
    name: "accept_terms",
    type: "checkbox" as const,
    label: "I agree to the Terms of Service and Privacy Policy",
    required: true,
  },
];

interface SignupFormProps {
  redirectTo?: string;
}

export default function SignupForm({ redirectTo = "/questionaire" }: SignupFormProps) {
  const router = useRouter();
  const supabase = useSupabase();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    accept_terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!values.username || values.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!values.password || values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (values.password !== values.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (!values.accept_terms) {
      newErrors.accept_terms = "You must accept the terms to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: FieldValue) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    SIGNUP_FIELDS.forEach((field) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          username: values.username,
          display_name: values.username,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    // Create profile record
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username: values.username,
        email: values.email,
        display_name: values.username,
        user_tier: "community",
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
      }
    }

    // Redirect to questionnaire (Acid Test)
    router.push(redirectTo);
  };

  const getFieldError = (name: string) => {
    return touched[name] && errors[name] ? errors[name] : undefined;
  };

  const getInputClass = (name: string) => {
    const hasError = touched[name] && errors[name];
    return hasError ? "border-red-500/50 ring-red-500/20" : "";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Initialize Consciousness</h1>
        <p className="text-white/60">Join the Sovereign Sanctuary</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Username <span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="text"
            value={values.username}
            onChange={(e) => handleChange("username", e.target.value)}
            onBlur={() => handleBlur("username")}
            placeholder="Choose a username"
            className={`w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none placeholder:text-white/40 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50 ${getInputClass("username")}`}
            disabled={isLoading}
          />
          {getFieldError("username") && (
            <p className="text-xs text-red-400 mt-1">{getFieldError("username")}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Email <span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="your@email.com"
            className={`w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none placeholder:text-white/40 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50 ${getInputClass("email")}`}
            disabled={isLoading}
          />
          {getFieldError("email") && (
            <p className="text-xs text-red-400 mt-1">{getFieldError("email")}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Password <span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            placeholder="Create a password"
            className={`w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none placeholder:text-white/40 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50 ${getInputClass("password")}`}
            disabled={isLoading}
          />
          {getFieldError("password") && (
            <p className="text-xs text-red-400 mt-1">{getFieldError("password")}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Confirm Password <span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="password"
            value={values.confirm_password}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
            onBlur={() => handleBlur("confirm_password")}
            placeholder="Confirm your password"
            className={`w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none placeholder:text-white/40 focus:border-neurospark focus:ring-1 focus:ring-neurospark/50 ${getInputClass("confirm_password")}`}
            disabled={isLoading}
          />
          {getFieldError("confirm_password") && (
            <p className="text-xs text-red-400 mt-1">{getFieldError("confirm_password")}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accept_terms"
            checked={values.accept_terms}
            onChange={(e) => handleChange("accept_terms", e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-transparent accent-quantum-purple"
          />
          <label htmlFor="accept_terms" className="text-sm text-white/80">
            I agree to the <a href="/terms" className="text-cyan-400 hover:underline">Terms of Service</a> and{" "}
            <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>
          </label>
        </div>
        {getFieldError("accept_terms") && (
          <p className="text-xs text-red-400 mt-1">{getFieldError("accept_terms")}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-quantum-purple hover:bg-quantum-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Join the Sanctuary"}
        </button>
      </form>
    </div>
  );
}