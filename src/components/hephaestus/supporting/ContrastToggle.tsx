// components/supporting/ContrastToggle.tsx
// High contrast mode toggle

"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { Contrast } from "lucide-react";

export function ContrastToggle() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const saved = localStorage.getItem("highContrast");
    if (saved === "true") {
      setHighContrast(true);
      document.documentElement.classList.add("high-contrast");
    }
  }, []);

  const handleToggle = (checked: boolean) => {
    setHighContrast(checked);
    localStorage.setItem("highContrast", String(checked));
    if (checked) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Contrast className="text-cyan-400" size={20} />
          <h2 className="text-xl font-bold text-white">High Contrast</h2>
        </div>
        <Switch checked={highContrast} onChange={handleToggle} />
      </div>
      <p className="text-sm text-white/60 mb-4">
        Increase color contrast for better visibility and readability.
      </p>
      <div className="flex gap-2 p-3 rounded-lg bg-white/5">
        <div className="w-8 h-8 rounded bg-quantum-purple flex items-center justify-center text-white text-xs">
          A
        </div>
        <div className="w-8 h-8 rounded bg-cosmic-blue flex items-center justify-center text-white text-xs">
          A
        </div>
        <div className="w-8 h-8 rounded bg-sanctuary-green flex items-center justify-center text-white text-xs">
          A
        </div>
        <div className="w-8 h-8 rounded bg-fire-base flex items-center justify-center text-white text-xs">
          A
        </div>
      </div>
    </Card>
  );
}