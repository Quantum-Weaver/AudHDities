// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabase } from "@/lib/supabase/client";
import { UnifiedForm } from "@/components/shared/UnifiedForm";
import type { FieldValue } from "@/types/components/ui/unified_form";

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = "/dashboard" }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useSupabase();
  const [error, setError] = useState<string | null>(null);

  const redirect = searchParams.get("redirect") || redirectTo;

  const handleSubmit = async (values: Record<string, FieldValue>) => {
    setError(null);
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email as string,
      password: values.password as string,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // Handle "remember me" - session duration
    if (values.remember_me) {
      // Supabase sessions default to long-lived, this is handled server-side
      // The checkbox is for UI/UX only
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
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}

      <UnifiedForm variant="login" onSubmit={handleSubmit} />

      <div className="mt-6 text-center">
        <p className="text-white/40 text-sm">
          <a href="/forgot-password" className="text-cyan-400 hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
}