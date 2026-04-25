// components/cosmic/CopyCode.tsx
// Copy effect code to clipboard

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckIcon, CopyIcon } from "lucide-react";
import type { Parameters } from "./ParameterSliders";
import { QUANTUM_COLORS } from "@/lib/constants/cosmic/colors";

export interface CopyCodeProps {
  effect: string;
  parameters: Parameters;
  className?: string;
}

function generateEffectCode(effect: string, params: Parameters): string {
  const colorHex = params.color;
  
  switch (effect) {
    case 'quantum-glow':
      return `.quantum-glow {
  box-shadow: 0 0 ${20 + params.intensity * 40}px ${colorHex}40,
              0 0 ${40 + params.intensity * 60}px ${colorHex}30;
  transition: all ${0.3 / params.speed}s ease;
}

.quantum-glow:hover {
  box-shadow: 0 0 ${30 + params.intensity * 50}px ${colorHex}60,
              0 0 ${50 + params.intensity * 70}px ${colorHex}40;
}`;

    case 'fire-flicker':
      return `.fire-flicker {
  animation: fireFlicker ${0.8 / params.speed}s ease-in-out infinite;
}

@keyframes fireFlicker {
  0%, 100% { 
    text-shadow: 0 0 8px ${colorHex}70, 0 0 16px ${colorHex}50;
    opacity: ${0.7 + params.intensity * 0.3};
  }
  25% { 
    text-shadow: 0 0 12px ${colorHex}90, 0 0 24px ${colorHex}70;
    opacity: ${0.9 + params.intensity * 0.1};
  }
  75% { 
    text-shadow: 0 0 6px ${colorHex}50, 0 0 12px ${colorHex}40;
    opacity: ${0.5 + params.intensity * 0.3};
  }
}`;

    case 'cosmic-sparkle':
      return `.cosmic-sparkle {
  color: ${colorHex};
  text-shadow: 0 0 8px ${colorHex}60, 0 0 15px ${colorHex}40;
  animation: cosmicSparkle ${2.5 / params.speed}s ease-in-out infinite;
}

@keyframes cosmicSparkle {
  0%, 100% { text-shadow: 0 0 5px ${colorHex}50; }
  25% { text-shadow: 0 0 12px ${colorHex}80, 0 0 20px ${colorHex}50; }
  75% { text-shadow: 0 0 8px ${colorHex}70, 0 0 15px ${colorHex}50; }
}`;

    case 'quantum-entanglement':
      return `.quantum-entanglement {
  background: linear-gradient(135deg, ${colorHex}, ${QUANTUM_COLORS['neurospark']});
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: quantumWeave ${4 / params.speed}s ease infinite;
}

@keyframes quantumWeave {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`;

    case 'rainbow-flow':
      return `.rainbow-text {
  background: linear-gradient(90deg, 
    ${QUANTUM_COLORS['pride.red']}, 
    ${QUANTUM_COLORS['pride.orange']}, 
    ${QUANTUM_COLORS['pride.yellow']}, 
    ${QUANTUM_COLORS['pride.green']}, 
    ${QUANTUM_COLORS['pride.blue']}, 
    ${QUANTUM_COLORS['pride.purple']}
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbowFlow ${8 / params.speed}s linear infinite;
}

@keyframes rainbowFlow {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}`;

    default:
      return `/* CSS for ${effect} */
.effect-preview {
  /* Apply your effect styles here */
  transition: all ${0.3 / params.speed}s ease;
}`;
  }
}

export function CopyCode({ effect, parameters, className }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = generateEffectCode(effect, parameters);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codePreview = generateEffectCode(effect, parameters).split('\n').slice(0, 8).join('\n');

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white">Copy CSS</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
          <span className="ml-1 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
      </div>
      <pre className="text-xs text-white/60 bg-black/30 rounded-lg p-3 overflow-x-auto font-mono">
        <code>{codePreview}{codePreview.split('\n').length > 8 ? '\n  ...' : ''}</code>
      </pre>
    </Card>
  );
}