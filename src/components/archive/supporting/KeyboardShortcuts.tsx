// components/supporting/KeyboardShortcuts.tsx
// Keyboard shortcuts reference

"use client";

import { Card } from "@/components/runes/cards/Card";
import { Kbd, KbdGroup } from "@/components/runes/Kbd";

const shortcuts = [
  { keys: ["?"], description: "Show keyboard shortcuts" },
  { keys: ["Tab"], description: "Navigate between interactive elements" },
  { keys: ["Shift", "Tab"], description: "Navigate backwards" },
  { keys: ["Enter", "Space"], description: "Activate focused element" },
  { keys: ["Esc"], description: "Close modal / dialog / popup" },
  { keys: ["Ctrl", "K"], description: "Focus search" },
  { keys: ["Ctrl", "/"], description: "Focus command palette" },
  { keys: ["G", "H"], description: "Go to Home" },
  { keys: ["G", "V"], description: "Go to Vessel" },
  { keys: ["G", "B"], description: "Go to Bazaar" },
  { keys: ["G", "L"], description: "Go to Library" },
  { keys: ["G", "S"], description: "Go to Stage" },
  { keys: ["G", "C"], description: "Go to Council" },
  { keys: ["G", "N"], description: "Go to Notifications" },
  { keys: ["P"], description: "Profile menu" },
  { keys: ["?"], description: "Help" },
];

export function KeyboardShortcuts() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-star-dust mb-4">Keyboard Shortcuts</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
          >
            <KbdGroup>
              {shortcut.keys.map((key, i) => (
                <span key={i}>
                  <Kbd>{key}</Kbd>
                  {i < shortcut.keys.length - 1 && <span className="mx-1 text-star-dust/40">+</span>}
                </span>
              ))}
            </KbdGroup>
            <span className="text-sm text-star-dust/60">{shortcut.description}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-star-dust/40 mt-4">
        Press <Kbd>?</Kbd> at any time to see this menu.
      </p>
    </Card>
  );
}