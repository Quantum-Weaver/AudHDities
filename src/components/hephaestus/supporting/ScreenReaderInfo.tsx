// components/supporting/ScreenReaderInfo.tsx
// Screen reader support information

"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const screenReaders = [
  { name: "NVDA", support: "full", platform: "Windows" },
  { name: "JAWS", support: "full", platform: "Windows" },
  { name: "VoiceOver", support: "full", platform: "macOS / iOS" },
  { name: "TalkBack", support: "full", platform: "Android" },
  { name: "Narrator", support: "partial", platform: "Windows" },
  { name: "Orca", support: "partial", platform: "Linux" },
];

export function ScreenReaderInfo() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-white mb-4">Screen Reader Support</h2>
      <p className="text-sm text-white/60 mb-4">
        The Sanctuary is tested with the following screen readers:
      </p>
      <div className="space-y-3">
        {screenReaders.map((sr) => (
          <div
            key={sr.name}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5"
          >
            <div>
              <span className="font-medium text-white">{sr.name}</span>
              <span className="text-xs text-white/40 ml-2">{sr.platform}</span>
            </div>
            <Badge
              variant={sr.support === "full" ? "success" : "warning"}
              size="sm"
            >
              {sr.support === "full" ? "Full Support" : "Partial Support"}
            </Badge>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
        <p className="text-xs text-cyan-400">
          💡 Tip: Use semantic headings (H1-H6) to navigate. All interactive elements have descriptive ARIA labels.
        </p>
      </div>
    </Card>
  );
}