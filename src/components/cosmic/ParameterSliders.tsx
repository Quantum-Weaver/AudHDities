// components/cosmic/ParameterSliders.tsx
// Parameter controls for effect customization

"use client";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/Slider";
import { QUANTUM_COLORS } from "@/lib/constants/cosmic/colors";

export interface Parameters {
  intensity: number;
  speed: number;
  color: string;
}

export interface ParameterSlidersProps {
  parameters: Parameters;
  onChange: (params: Parameters) => void;
  className?: string;
}

// Preset colors from cosmic system
const colorPresets = [
  { name: 'Quantum', value: QUANTUM_COLORS['quantum.purple'] },
  { name: 'Cosmic', value: QUANTUM_COLORS['cosmic.blue'] },
  { name: 'Fire', value: QUANTUM_COLORS['fire.base'] },
  { name: 'Sanctuary', value: QUANTUM_COLORS['sanctuary.green'] },
  { name: 'Hearth', value: QUANTUM_COLORS['hearth.gold'] },
  { name: 'Neurospark', value: QUANTUM_COLORS['neurospark'] },
  { name: 'Mystical', value: QUANTUM_COLORS['mood.mystical'] },
  { name: 'Creative', value: QUANTUM_COLORS['mood.creative'] },
];

export function ParameterSliders({ parameters, onChange, className }: ParameterSlidersProps) {
  // FIXED: Handle Slider's onValueChange signature (number | readonly number[])
  const handleIntensityChange = (value: number | readonly number[]) => {
    const intensityValue = Array.isArray(value) ? value[0] : value;
    onChange({ ...parameters, intensity: intensityValue / 100 });
  };

  // FIXED: Handle Slider's onValueChange signature (number | readonly number[])
  const handleSpeedChange = (value: number | readonly number[]) => {
    const speedValue = Array.isArray(value) ? value[0] : value;
    onChange({ ...parameters, speed: speedValue });
  };

  const handleColorChange = (color: string) => {
    onChange({ ...parameters, color });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Intensity Slider */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-white/60">Intensity</label>
          <span className="text-sm text-white/40">{Math.round(parameters.intensity * 100)}%</span>
        </div>
        <Slider
          value={[parameters.intensity * 100]}
          onValueChange={handleIntensityChange}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Speed Slider */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-white/60">Speed</label>
          <span className="text-sm text-white/40">{parameters.speed.toFixed(1)}x</span>
        </div>
        <Slider
          value={[parameters.speed]}
          onValueChange={handleSpeedChange}
          min={0.5}
          max={2}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Color Presets */}
      <div>
        <label className="text-sm text-white/60 mb-2 block">Color</label>
        <div className="flex flex-wrap gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handleColorChange(preset.value)}
              className={cn(
                "w-8 h-8 rounded-full transition-all duration-200",
                parameters.color === preset.value && "ring-2 ring-white ring-offset-2 ring-offset-deepSpace"
              )}
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}