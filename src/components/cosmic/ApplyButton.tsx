// components/cosmic/ApplyButton.tsx
// Button to apply selected environment

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useContinuityBeam } from "@/contexts/ContinuityBeamContext";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ApplyButtonProps {
  environmentId: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onApply?: () => void;
  className?: string;
}

export function ApplyButton({ 
  environmentId, 
  variant = 'primary',
  size = 'md',
  onApply,
  className 
}: ApplyButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { setEnvironment } = useContinuityBeam();
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    
    // Apply environment to context (immediate UI update)
    setEnvironment(environmentId as any);
    
    // Store preference in localStorage (persists across sessions)
    localStorage.setItem('preferred_environment', environmentId);
    
    // Save to user profile if logged in
    if (user) {
      const supabase = createClient();
      await supabase
        .from('profiles')
        .update({ preferred_environment: environmentId })
        .eq('id', user.id);
    }
    
    setIsApplied(true);
    setIsApplying(false);
    onApply?.();
    
    // Show success state briefly
    setTimeout(() => {
      setIsApplied(false);
    }, 2000);
  };

  return (
    <Button
      variant={isApplied ? 'success' : variant}
      size={size}
      onClick={handleApply}
      disabled={isApplying}
      className={cn("min-w-[160px]", className)}
    >
      {isApplying ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Applying...
        </>
      ) : isApplied ? (
        <>
          <CheckIcon className="h-4 w-4 mr-2" />
          Applied!
        </>
      ) : (
        <>
          <SparklesIcon className="h-4 w-4 mr-2" />
          Apply This Realm
        </>
      )}
    </Button>
  );
}