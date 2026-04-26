// components/supporting/FontSizer.tsx
// Font size adjustment controls

"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Minus, Plus, Type } from "lucide-react";

export function FontSizer() {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const saved = localStorage.getItem("fontSize");
    if (saved) {
      const size = parseInt(saved);
      setFontSize(size);
      document.documentElement.style.setProperty("--font-size-base", `${size}px`);
    }
  }, []);

  const updateFontSize = (size: number) => {
    const clamped = Math.min(24, Math.max(12, size));
    setFontSize(clamped);
    localStorage.setItem("fontSize", String(clamped));
    document.documentElement.style.setProperty("--font-size-base", `${clamped}px`);
  };

  const handleSliderChange = (value: number | readonly number[]) => {
    // Handle both single number and array cases
    const newValue = Array.isArray(value) ? value[0] : value;
    updateFontSize(newValue);
  };

  const presetSizes = [
    { label: "S", value: 14 },
    { label: "M", value: 16 },
    { label: "L", value: 18 },
    { label: "XL", value: 20 },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Type className="text-cyan-400" size={20} />
        <h2 className="text-xl font-bold text-white">Font Size</h2>
      </div>
      
      <p className="text-sm text-white/60 mb-4">
        Adjust text size for comfortable reading.
      </p>

      <div className="space-y-4">
        {/* Preset buttons */}
        <div className="flex gap-2">
          {presetSizes.map((preset) => (
            <Button
              key={preset.label}
              variant={fontSize === preset.value ? "primary" : "outline"}
              size="sm"
              onClick={() => updateFontSize(preset.value)}
              className="flex-1"
            >
              {preset.label}
            </Button>
          ))}
        </div>

        {/* Slider control */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => updateFontSize(fontSize - 1)}
            disabled={fontSize <= 12}
          >
            <Minus size={14} />
          </Button>
          
          <div className="flex-1">
            <Slider
              value={[fontSize]}
              onValueChange={handleSliderChange}
              min={12}
              max={24}
              step={1}
            />
          </div>
          
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => updateFontSize(fontSize + 1)}
            disabled={fontSize >= 24}
          >
            <Plus size={14} />
          </Button>
        </div>

        {/* Preview */}
        <div className="p-3 rounded-lg bg-white/5 text-center">
          <p className="text-white/40 text-xs mb-1">Preview</p>
          <p style={{ fontSize: `${fontSize}px` }} className="text-white">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </Card>
  );
}