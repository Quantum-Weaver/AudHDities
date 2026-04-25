// components/cosmic/SelectButton.tsx
// Button to apply selected environment (used in detail page)

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";
import { useContinuityBeam } from "@/contexts/ContinuityBeamContext";
import { CheckIcon, SparklesIcon } from "lucide-react";

export interface SelectButtonProps {
  environmentId: string;
  environmentName: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onSelect?: () => void;
  className?: string;
}

export function SelectButton({ 
  environmentId, 
  environmentName,
  variant = 'primary',
  size = 'md',
  onSelect,
  className 
}: SelectButtonProps) {
  const router = useRouter();
  const { setEnvironment } = useContinuityBeam();
  const [isSelected, setIsSelected] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const handleSelect = async () => {
    setIsApplying(true);
    
    // Apply environment to context
    setEnvironment(environmentId as any);
    
    // Store preference in localStorage
    localStorage.setItem('preferred_environment', environmentId);
    
    // Optional: Save to user profile if logged in
    // const { data: { user } } = await supabase.auth.getUser();
    // if (user) {
    //   await supabase.from('profiles').update({ preferred_environment: environmentId }).eq('id', user.id);
    // }
    
    setIsSelected(true);
    setIsApplying(false);
    onSelect?.();
    
    // Show success state briefly
    setTimeout(() => {
      setIsSelected(false);
    }, 2000);
  };

  return (
    <Button
      variant={isSelected ? 'success' : variant}
      size={size}
      onClick={handleSelect}
      disabled={isApplying}
      className={cn("min-w-[120px]", className)}
    >
      {isApplying ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : isSelected ? (
        <CheckIcon className="h-4 w-4 mr-2" />
      ) : (
        <SparklesIcon className="h-4 w-4 mr-2" />
      )}
      {isSelected ? 'Applied!' : `Select ${environmentName}`}
    </Button>
  );
}