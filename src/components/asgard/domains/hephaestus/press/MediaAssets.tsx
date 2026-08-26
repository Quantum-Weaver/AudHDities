// src/components/asgard/domains/hephaestus/press/MediaAssets.tsx
// ═════════════════════════════════════════════════════════════════════════
// ═════════════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────

"use client";

import { Card } from "@/components/runes/Card";
import { ImageIcon } from "lucide-react";

export function MediaAssets() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-star-dust">Media Assets</h2>
        <p className="text-sm text-star-dust/40 mt-1">
          Images, logos, and video
        </p>
      </div>

      <Card
        variant="glass"
        data={{ id: "media-assets-empty", type: "value", title: "Media Assets", value: "" }}
        radius="lg"
        shadow="sm"
        className="p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-star-dust/5 flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5 text-star-dust/30" />
          </div>
          <div>
            <h3 className="font-semibold text-star-dust">No media assets are prepared yet</h3>
            <p className="text-sm text-star-dust/50 mt-1">
              There is no pack of approved images or video to hand you. If you
              need something specific for a piece, say what it is and it will be
              made for you.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
